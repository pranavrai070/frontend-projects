import React, { useContext,useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isSubmitting,setIsSubmitting]=useState(false);
  const [didSubmit,setDidSubmit]=useState(false);
  const [isCheckout,setIsCheckOut]=useState(false);

  const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler=()=>{
    setIsCheckOut(true);
  }

  const submitOrderHandler= async(userData)=>{
      setIsSubmitting(true);
     await fetch('https://pizzaapp-29e8e-default-rtdb.firebaseio.com/orders.json',{
        method:'POST',
        body: JSON.stringify({
          user:userData,
          orderedItems:cartCtx.items 
        })
      });
      setIsSubmitting(false);
      setDidSubmit(true);
      cartCtx.clearCart();

  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const actionModal=
    <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>
      Close
    </button>
    {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
  </div>
  
  
 const cartModalContent=(
   <React.Fragment>
  {cartItems}
  <div className={classes.total}>
    <span>Total Amount</span>
    <span>{totalAmount}</span>
  </div>
  {isCheckout &&<Checkout onSubmit={submitOrderHandler}  onCancel={props.onClose}/>}
 {!isCheckout && actionModal}
 </React.Fragment>
 );

  const isSubmittingModalContent=<p>Sending the Data...</p>;

  const didSubmitModelContent=(
    <React.Fragment>
    <p>Successfully Submitted!</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </div>
    </React.Fragment>
  );
  

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit&& cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {didSubmit && didSubmitModelContent}
    </Modal>
  );
};

export default Cart;
