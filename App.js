import 'graphql' // 0.11.7

import 'redux' // 3.7.2

import React, { Component } from 'react'

import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo' // 1.4.16
import { SubscriptionClient } from 'subscriptions-transport-ws' // 0.8.3

import PageHome             from './page/PageHome'


var printer_1 = require("graphql/language/printer"); // 0.11.7
function addGraphQLSubscriptions(networkInterface, wsClient) {
    return Object.assign(networkInterface, {
        subscribe: function (request, handler) {
            return wsClient.subscribe({
                query: printer_1.print(request.query),
                variables: request.variables,
            }, handler);
        },
        unsubscribe: function (id) {
            wsClient.unsubscribe(id);
        },
    });
}


const GRAPHQL_SUBSCRIPTIONS = `wss://subscriptions.graph.cool/v1/cj3yjum7tf3kw0124mvtm4n82`
const GRAPHQL_ENPOINT = `https://api.graph.cool/simple/v1/cj3yjum7tf3kw0124mvtm4n82`

export default class App extends Component {
  createClient() {
    try {
      const wsClient = new SubscriptionClient(GRAPHQL_SUBSCRIPTIONS, {
        reconnect: true,
        timeout: 20000,
      })
      
      const networkInterface = createNetworkInterface({
        uri: GRAPHQL_ENPOINT,
      })
  
      const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
        networkInterface,
        wsClient,
      )
      
      return new ApolloClient({
        networkInterface: networkInterfaceWithSubscriptions,
      })
    } catch (e) {
      console.log(`ERROR INIT CLIENT`, e)
    }
  }  
  
  render() {
    return (
      <ApolloProvider client={ this.createClient() }>
        <PageHome />
      </ApolloProvider>
    )
  }
}
