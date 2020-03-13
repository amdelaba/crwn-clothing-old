import React from 'react';
import './cart-dropdown.styles.scss'
import CustomButton from '../custom-button/custom-button.component'
import { connect } from 'react-redux';
import cartReducer from '../../redux/cart/cart.reducer';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router-dom'
import { toggleCartHidden } from '../../redux/cart/cart.actions'

const CartDropdown = ({ cartItems, history, toggleCartHidden }) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
    {
      cartItems.length ? 
      (
        cartItems.map(item => (
          <CartItem key={item.id} item={item}/> 
        ))
      ) : (
        <span className='empty-message'>Your cart is empty</span>
      )
      
    }
    </div>
    <CustomButton onClick={ ()=> {
      history.push('./checkout');
      toggleCartHidden();
    }}>GO TO CHECKOUT</CustomButton>
  </div>
);

const mapStateToProps = createStructuredSelector ({
  cartItems: selectCartItems
});

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
})

// Order of HOC matters (it evaluates from inside out)
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartDropdown));