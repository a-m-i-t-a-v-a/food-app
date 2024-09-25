import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../utils/formatting';
import Input from './UI/Input';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';

const Checkout = () => {
  const cartContext=useContext(CartContext);
  const userProgressContext=useContext(UserProgressContext)
  const cartTotal=cartContext.items.reduce((acc,curr)=>acc+curr.quantity*curr.price,0);

  function handleClose(){
    userProgressContext.hideCheckout()
  }

  function handleSubmit(e){
    e.preventDefault();
    const fd=new FormData(e.target);
    console.log(`Formdata object : ${fd}`)
    const customerData=Object.fromEntries(fd.entries());
    console.log(`Customer data : ${customerData}`)
  }

  return (
    <Modal open={userProgressContext.progress==='checkout'} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="full-name"/>
        <Input label="E-Mail Address" type="email" id="email"/>
        <Input label="Street" type="text" id="street"/>
        <div className='control-row'>
            <Input label="Postal Code" type="text" id="postal-code"/>
            <Input label="City" type="text" id="city"/>
        </div>
        <p className='modal-actions'>
            <Button type="button" onClick={handleClose} textOnly>Close</Button>
            <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  )
}

export default Checkout
