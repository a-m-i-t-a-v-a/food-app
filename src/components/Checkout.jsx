import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../utils/formatting';
import Input from './UI/Input';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';
import useHttp from '../hooks/useHttp';
import Error from './Error';

const requestConfig={
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    }
}

const Checkout = () => {
  const cartContext=useContext(CartContext);
  const userProgressContext=useContext(UserProgressContext)
  const cartTotal=cartContext.items.reduce((acc,curr)=>acc+curr.quantity*curr.price,0);

  const {data,isLoading:isSending,error,sendRequest,clearData}=useHttp('http://localhost:3000/orders',requestConfig)

  function handleClose(){
    userProgressContext.hideCheckout()
  }

  function handleFinish(){
    userProgressContext.hideCheckout();
    cartContext.clearCart();
    clearData();
  }

  function handleSubmit(e){
    e.preventDefault();
    const fd=new FormData(e.target);
    const customerData=Object.fromEntries(fd.entries());

    sendRequest(
        JSON.stringify({
            order:{
                items:cartContext.items,
                customer:customerData
            }
        })
    )
  }

  let actions=(
    <>
       <Button type="button" onClick={handleClose} textOnly>Close</Button>
       <Button>Submit Order</Button> 
    </>
  )

  if(isSending){
    actions=<span>Sending order data...</span>
  }

  if(data && !error){
    return (
        <Modal open={userProgressContext.progress==='checkout'} onClose={handleClose}>
            <h2>Success</h2>
            <p>Your order was submitted successfully.</p>
            <p>Your meal will be delivered shortly</p>
            <p className='modal-actions'>
                <Button onClick={handleFinish}>Ok</Button>
            </p>
        </Modal>
    )
  }

  return (
    <Modal open={userProgressContext.progress==='checkout'} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name"/>
        <Input label="E-Mail Address" type="email" id="email"/>
        <Input label="Street" type="text" id="street"/>
        <div className='control-row'>
            <Input label="Postal Code" type="text" id="postal-code"/>
            <Input label="City" type="text" id="city"/>
        </div>
        {error && <Error title="Failed to submit order" message={error}/>}
        <p className='modal-actions'>{actions}</p>
      </form>
    </Modal>
  )
}

export default Checkout
