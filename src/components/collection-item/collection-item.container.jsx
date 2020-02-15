import React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import CollectionItem from "./collection-item.component";

const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($item: Item!) {
    addItemToCart(item: $item) @client
  }
`;

// props from the collection preview component including the item
// addItem is a function that gets the item and it calls addItemtoCart which is our mutation
// and pass in an object which is our variables = the item
const CollectionItemContainer = props => (
  <Mutation mutation={ADD_ITEM_TO_CART}>
    {addItemToCart => (
      <CollectionItem
        {...props}
        addItem={item => addItemToCart({ variables: { item } })}
      />
    )}
  </Mutation>
);

export default CollectionItemContainer;
