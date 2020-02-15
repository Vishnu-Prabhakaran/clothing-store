import { gql } from "apollo-boost";

// Define Schema that local storage is going to use
// Add new Mutations
// Type mutations need to be capitalised 'ToggleCartHidden'
export const typeDefs = gql`
  extend type Mutation {
    ToggleCartHidden: Boolean!
  }
`;

// Read the value first before changing
// To specify that this is on the client side we use @client
// @client looks for the value in local cache
const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

export const resolvers = {
  // Function return 4 arguments
  // Underscore is how they defined in apollo docs, as they are not meant to be modified
  // _root - holds the top level objects of the type
  // _args - all the arguments that we have access to (variables)
  // _context - appolo client has access to (cache and client itself)
  //_info - information about the query or the mutation
  Mutation: {
    // toggleCartHidden : (_root,_args,_context,_info) =>
    // we only need to use _args and cache
    toggleCartHidden: (_root, _args, { cache }) => {
      const { cartHidden } = cache.readQuery({
        query: GET_CART_HIDDEN
        // variables: {}
      });
      // Update the value
      cache.writeQuery({
        query: GET_CART_HIDDEN,
        // Write opposite value of the cartHidden
        data: { cartHidden: !cartHidden }
      });
      // Finally we return the orginal cache value that we have reversed
      return !cartHidden;
    }
  }
};