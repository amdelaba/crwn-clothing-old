import React from 'react';

import { ReactComponent as Logo } from '../../assets/crown.svg'

import { auth } from '../../firebase/firebase.utils'

import { connect } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect'
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';

import { signOutStart } from "../../redux/user/user.actions";

const Header = ({ currentUser, hidden, signOutStart }) => (

  <HeaderContainer>

    <LogoContainer to="/">
      <Logo className='logo' />
    </LogoContainer>

    <OptionsContainer>
      <OptionLink to='/shop'>
        SHOP
      </OptionLink>
      <OptionLink to='/shop'>
        CONTACT
      </OptionLink>

      { 
        currentUser ?
          <OptionLink as='div' onClick={signOutStart}>
            SIGN OUT
          </OptionLink>
        : 
          <OptionLink className='option' to='/signin'> 
            SIGN IN
          </OptionLink>
      }
    
      <CartIcon />

    </OptionsContainer>

    { hidden ? null : <CartDropdown/> }

  </HeaderContainer>
);

// createStructuredSelector automatically passes top level state into all selectors
const mapStatetoProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
})

// connect is a HOC that allows a component to have access to redux
export default connect(mapStatetoProps, mapDispatchToProps)(Header);