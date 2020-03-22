import React from 'react';
import { Route } from 'react-router-dom'
import { connect } from "react-redux";

import CollectionPageContainer from '../collection/collection.container';
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import { fetchCollectionsStart } from '../../redux/shop/shop.actions'

class ShopPage extends React.Component {

  componentDidMount()  {

    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();

    // Replaced by Redux Async functions
    // const { updateCollections } = this.props; 
    // const collectionRef = firestore.collection('collections')  
    // collectionRef.get().then(snapshot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });
    
  }

  render() {
    const { match } = this.props;
    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
          // render={props => (<CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />)}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }

};


const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});


export default connect(null, mapDispatchToProps)(ShopPage);