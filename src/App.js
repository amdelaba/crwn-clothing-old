import React from 'react';
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

class App extends React.Component {

  componentDidMount() {
    
    const { checkUserSession } = this.props;
    checkUserSession();
    
    // // Uncomment to re-add shop collections to firebase DB
    // const {collectionsArray} = this.props;
    // addCollectionAndDocuments('collections', 
    //   collectionsArray.map(({ title, items }) => ({ title, items })));

    // const {setCurrentUser} = this.props;
    // // onAuthStateChanged returns unsubscribe function
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if(userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);
    //     userRef.onSnapshot(snapshot => {
    //       setCurrentUser({
    //         currentUser: {
    //           id: snapshot.id,
    //           ...snapshot.data()
    //         }
    //       });
    //     });
    //   }
    //   setCurrentUser(userAuth);
    // });
  }

  render(){ 
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
               this.props.currentUser ? 
               (<Redirect to='/'/>) : 
               (<SignInAndSignUpPage/>
            )}
           /> 

        </Switch>
      </div>
    );
  }
}

//gives us access to this.props.currentUser from redux
const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
})

//gives us access to this.props.setCurrentUser function  from redux
const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
