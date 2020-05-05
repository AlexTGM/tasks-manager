import { GraphQLSchema } from 'graphql';

import {
  makeRemoteExecutableSchema,
  introspectSchema,
} from 'graphql-tools';

import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from "apollo-link-ws";
import { setContext } from "apollo-link-context";
import { getMainDefinition } from 'apollo-utilities';

const WebSocket = require('ws');

import fetch from 'cross-fetch';

export async function createConnectionAsync(host): Promise<GraphQLSchema> {
  const wsLink = new ApolloLink(operation => {
    const context = operation.getContext().graphqlContext
    
    return new WebSocketLink({
      uri: `ws://${host}/graphql`,
      options: {
        reconnect: true,
        connectionParams: {
          headers: {
          }
        },
      },
      webSocketImpl: WebSocket
    }).request(operation)
  })
  
  const httpLink = setContext((_graphqlRequest, { graphqlContext }) => {
    return {
      headers: {
      },
    }
  }).concat(new HttpLink({ uri: `http://${host}/graphql`, fetch }))
  
  const link = split(
    operation => {
      const definition = getMainDefinition(operation.query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink,
    httpLink,
  )
  
  const schema = await introspectSchema(link);

  return makeRemoteExecutableSchema({
    schema,
    link,
  });
}