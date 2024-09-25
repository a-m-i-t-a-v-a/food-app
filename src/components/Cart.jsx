import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../utils/formatting';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';
import CartItem from './CartItem';

const Cart = () => {
  const cartContext=useContext(CartContext);
  const userProgressContext=useContext(UserProgressContext);

  const cartTotal=cartContext.items.reduce((acc,curr)=>acc+curr.price*curr.quantity,0)

  function handleCloseCart(){
    userProgressContext.hideCart()
  }

  function handleToCheckout(){
    userProgressContext.showCheckout()
  }

  return (
    <Modal 
      className='cart' 
      open={userProgressContext.progress==='cart'} 
      onClose={userProgressContext.progress==='cart' ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartContext?.items.map((item)=>
          <CartItem 
            key={item.id} 
            name={item.name} 
            price={currencyFormatter.format(item.price)} 
            quantity={item.quantity} 
            onIncrease={()=>cartContext.addItem(item)}
            onDecrease={()=>cartContext.removeItem(item.id)}
          />
        )}
      </ul>
      <p>Total amount : {currencyFormatter.format(cartTotal)}</p>
      <p className='modal-actions'>
        <Button textOnly onClick={handleCloseCart}>Close</Button>
        {cartContext?.items.length>0 && <Button onClick={handleToCheckout}>Go to checkout</Button>}
      </p>
    </Modal>
  )
}

export default Cart
