import React from 'react';
import { Link } from 'react-router-dom';

import './header.styles.scss';

import { ReactComponent as Logo } from '../../assets/crown.svg'

import { auth } from '../../firebase/firebase.utils'

import { connect } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

const Header = ({ currentUser, hidden }) => (

  <div className='header'>

    <Link className='logo-container' to="/">
      <Logo className='logo' />
    </Link>

    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/shop'>
        CONTACT
      </Link>

      { 
        currentUser ?
          <div className='option' onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        : 
          <Link className='option' to='/signin'> 
            SIGN IN
          </Link>
      }
    
      <CartIcon />

    </div>

    { hidden ? null : <CartDropdown/> }

  </div>
);

// state is rootReducer
const mapStatetoProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  currentUser,
  hidden
})

// connect is a HOC that allows a component to have access to redux
export default connect(mapStatetoProps)(Header);