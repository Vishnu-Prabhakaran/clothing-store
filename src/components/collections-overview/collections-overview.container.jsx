import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import CollectionsOverview from "../collections-overview/collections-overview.component";
import Spinner from "../spinner/spinner.component";

// Request from graphQl
const GET_COLLECTIONS = gql`
  {
    collections {
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

const CollectionsOverviewContainer = () => (
  <Query query={GET_COLLECTIONS}>
    {// Returns a function with properties
    ({ loading, error, data }) => {
      // If loading is true return the spinner
      //console.log({loading});
      console.log({ error });
      //console.log({data});
      if (loading) return <Spinner />;
      // data is the name of the datakey for graphQl, the object is stored under 'data'
      return <CollectionsOverview collections={data.collections} />;
    }}
  </Query>
);

export default CollectionsOverviewContainer;
