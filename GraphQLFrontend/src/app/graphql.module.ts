import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import {
  ApolloClientOptions,
  InMemoryCache,
  createHttpLink,
  split,
} from '@apollo/client/core';
import { createClient } from 'graphql-ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { environment } from 'src/environments/environment';

const httpLink = createHttpLink({ uri: environment.backendApiUrl });
const wsLink = new GraphQLWsLink(createClient({ url: environment.backendWSUrl }));

// split WS activities to the WS-Url
const splitLink = split(
  ({ query }: any) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

export function createApollo(): ApolloClientOptions<any> {
  return {
    link: splitLink,
    cache: new InMemoryCache(),
  } as ApolloClientOptions<any>;
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [],
    },
  ],
})
export class GraphQLModule { }
