import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";

const ACCESS_TOKEN_STORAGE_KEY = "token";
const REFRESH_TOKEN_STORAGE_KEY = "refreshToken";

const httpLink = new HttpLink({
  uri: "http://localhost:3001/graphql",
  fetch: async (uri, options) => {
    const response = await fetch(uri, options);

    if (typeof window !== "undefined") {
      const refreshedAccessToken = response.headers.get("x-access-token");
      if (refreshedAccessToken) {
        localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, refreshedAccessToken);
      }
    }

    return response;
  },
});

const authLink = new SetContextLink(({ headers }, _) => {
  const accessToken =
    typeof window !== "undefined"
      ? localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)
      : null;
  const refreshToken =
    typeof window !== "undefined"
      ? localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY)
      : null;

  return {
    headers: {
      ...headers,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...(refreshToken ? { "x-refresh-token": `Bearer ${refreshToken}` } : {}),
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
