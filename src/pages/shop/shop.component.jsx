import React from 'react';
import { Route } from 'react-router-dom'
import { connect } from "react-redux";

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { updateCollections } from '../../redux/shop/shop.actions'

import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
class ShopPage extends React.Component {

  unsubscribeFromSnapShot = null;

  componentDidMount() {

    const { updateCollections } = this.props; 
    const collectionRef = firestore.collection('collections')  

    // whenever collectionRef updates or runs for the first
    // this collection ref will sends us the snapshopt representing  collections array at the time 
    // this component renders
    this.unsubscribeFromSnapShot = collectionRef.onSnapshot( async snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap)
    });
  }

  render()  {
    const { match } = this.props;
    return(
      <div className='shop-page'>
      <Route exact path={`${match.path}`} component={CollectionsOverview}/>
      <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
    </div>
    );
  }


};

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => 
    dispatch(updateCollections(collectionsMap))
});


export default connect(null, mapDispatchToProps)(ShopPage);