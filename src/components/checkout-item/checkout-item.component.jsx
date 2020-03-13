import React from 'react';

import './checkout-item.styles.scss';

import { clearItem, increaseItem, decreaseItem } from "../../redux/cart/cart.actions";
import { connect } from 'react-redux';


const CheckoutItem = ({ cartItem, clearItem, increaseItem, decreaseItem }) => {
  
  const { name, imageUrl, price, quantity } = cartItem;
 
  return (  
    <div className='checkout-item'>
      <div className='image-container'>
        <img src={imageUrl} alt='item'/>
      </div>
      <span className='name'>{name}</span>
      <span className='price'>{price}</span>
      <span className='quantity'>
        <div className='arrow' onClick={()=>decreaseItem(cartItem)}>&#10094;</div>
        <span className='value'> {quantity} </span>
        <div className='arrow' onClick={()=>increaseItem(cartItem)}>&#10095;</div>
      </span>
      <div className='remove-button' onClick={() => clearItem(cartItem)}>&#10005;</div>
    </div>
  );

};

const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItem(item)),
  increaseItem: item => dispatch(increaseItem(item)),
  decreaseItem: item => dispatch(decreaseItem(item)),
})

export default connect(null, mapDispatchToProps)(CheckoutItem);