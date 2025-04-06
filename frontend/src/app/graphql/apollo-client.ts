import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
  }).request,
});
