import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import CollectionPage from "./collection.component";
import Spinner from "../../components/spinner/spinner.component";

// // // Actual query schema in apollo server // // // // // // // // // // // // // // // // // // /
// // // ! means must/ mandatory                                                                   //
// type Query {                                                                                    //
//     collections: [Collection!]!                                                                 //
//     collection(id: ID!): Collection                                                             //
//     getCollectionsByTitle(title: String): Collection                                            //
//   }                                                                                             //
// // // // // // // // // // // // // // // // // // // // // // // // // // // // //  //  //  // //

// **Define the query and the type it is expecting**
// Make Query with the query from the apollo server getCollectionsByTitle($title: String!) is same as the query defined in the server
// query returns the object as $title
// $title is the way to pass parameters for the query
const GET_COLLECTION_BY_TITLE = gql`
  query getCollectionsByTitle($title: String!) {
    getCollectionsByTitle(title: $title) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionPageContainer = ({ match }) => (
  <Query
    query={GET_COLLECTION_BY_TITLE}
    variables={{ title: match.params.collectionId }}
  >
    {// destructure the data as it is returning data.getCollectionsByTitle
    ({ loading, data }) => {
      if (loading) return <Spinner />;
      const { getCollectionsByTitle } = data;
      return <CollectionPage collection={getCollectionsByTitle} />;
    }}
  </Query>
);

export default CollectionPageContainer;
