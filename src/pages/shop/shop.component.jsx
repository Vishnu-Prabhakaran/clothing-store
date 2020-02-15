import React from 'react';
import { Route } from 'react-router-dom';
// instead of changing 'CollectionsOverview' name to 'CollectionsOverviewContainer', "deafault as" keep the alias for CollectionsOverviewContainer as CollectionsOverview.
import {default as CollectionsOverview} from '../../components/collections-overview/collections-overview.container';
import CollectionPage from '../collection/collection.component';

const ShopPage = ({ match }) => (
  <div className='shop-page'>
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
  </div>
);

export default ShopPage;
