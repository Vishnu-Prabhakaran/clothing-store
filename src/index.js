import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./redux/store";

import "./index.css";
import App from "./App";

// Apollo
import { ApolloProvider } from "react-apollo";
// Connect client to graphQl
import { createHttpLink } from "apollo-link-http";
// Cache the data that fetches
import { InMemoryCache } from "apollo-cache-inmemory";
// Apollo library
import { ApolloClient, gql } from "apollo-boost";
// Resolvers
import { resolvers, typeDefs } from "./graphql/resolvers";

// Create the connection link
const httpLink = createHttpLink({
  uri: "https://crwn-clothing.com"
});

// Cache - local storage
const cache = new InMemoryCache();

// Client
const client = new ApolloClient({
  link: httpLink,
  cache,
  resolvers,
  typeDefs
});

// As soon as the client loads the index jas first we need to instantiate the writeData
client.writeData({
  data: {
    // Default values of state
    cartHidden: true,
    cartItems: [],
    itemCount: 0
  }
});

// Request from GraphQl
client
  .query({
    query: gql`
      {
        getCollectionsByTitle(title: "hats") {
          id
          transitionDelay: items {
            id
            name
            price
            imageUrl
          }
        }
      }
    `
  })
  .then(res => console.log(res));

ReactDOM.render(
  // Apollo
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
