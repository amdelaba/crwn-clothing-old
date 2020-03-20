import React from 'react';
import { Route } from 'react-router-dom'
import { connect } from "react-redux";

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { updateCollections } from '../../redux/shop/shop.actions'
import WithSpinner  from '../../components/with-spinner/with-spinner.component'

import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

    // constructor done implicitly by react if you only need state
  state = {
    loading: true
  };

  // unsubscribeFromSnapShot = null;

  componentDidMount()  {

    const { updateCollections } = this.props; 
    const collectionRef = firestore.collection('collections')  

    collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });

    // OR async/await
    // (and add async to componentDidMount declaration )
    // const snapshot = await collectionRef.get();
    // const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    // updateCollections(collectionsMap);
    // this.setState({ loading: false });

    // OR With Subscriptions
    // whenever collectionRef updates or runs for the first
    // this collection ref will sends us the snapshopt representing  collections array at the time 
    // this component renders
    // this.unsubscribeFromSnapShot = collectionRef.onSnapshot( async snapshot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });
    
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }


};

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => 
    dispatch(updateCollections(collectionsMap))
});


export default connect(null, mapDispatchToProps)(ShopPage);