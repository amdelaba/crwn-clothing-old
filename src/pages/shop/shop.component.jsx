import React, { useEffect } from 'react';
import { Route } from 'react-router-dom'
import { connect } from "react-redux";

import CollectionPageContainer from '../collection/collection.container';
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import { fetchCollectionsStart } from '../../redux/shop/shop.actions'

const ShopPage = ({ fetchCollectionsStart, match }) => {
  
  // Replaced by Redux Async function: fetchCollectionsStart
  // const { updateCollections } = this.props; 
  // const collectionRef = firestore.collection('collections')  
  // collectionRef.get().then(snapshot => {
  //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //   updateCollections(collectionsMap);
  //   this.setState({ loading: false });
  // });

  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart] );

  return (
    <div className='shop-page'>
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionPageContainer}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);