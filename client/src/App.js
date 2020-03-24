import React, { useEffect} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import HomePage from './pages/homepage/homepage.component';   
import ShopPage from './pages/shop/shop.component';   
import Header from './components/header/header.component';   
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { checkUserSession } from './redux/user/user.actions'

import { selectCurrentUser } from './redux/user/user.selectors'
import { createStructuredSelector} from 'reselect'
import CheckoutPage from './pages/checkout/checkout.component';

import { selectCollectionsForPreview } from './redux/shop/shop.selectors'

const App = ({ checkUserSession, currentUser }) => {

  // //Code used to add shop collections to firebase DB
  // //originally inside componentDidMount()
  // const {collectionsArray} = this.props;
  // addCollectionAndDocuments('collections', 
  //   collectionsArray.map(({ title, items }) => ({ title, items })));
  
  // Replaces componentDidMount
  // Add checkUserSession to dependency array to guaranteed 
  // only runs once on mount (can only do since checkUserSession was passed as props)
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);
  
  return (
    <div>
      <Header />
      <Switch>  
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} /> 
        <Route exact path='/checkout' component={CheckoutPage} /> 

        <Route 
          exact 
          path='/signin' 
          render={() =>
              currentUser ? 
              (<Redirect to='/'/>) : 
              (<SignInAndSignUpPage/>
          )}
          /> 

      </Switch>
    </div>
  );
}

//gives us access to this.props.currentUser from redux
const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview // used to add shop data to db
})

//gives us access to this.props.setCurrentUser function  from redux
const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
