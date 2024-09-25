import { useContext } from 'react'
import logoImg from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../store/CartContext'
import UserProgressContext from '../store/UserProgressContext'

const Header = () => {
  const cartContext=useContext(CartContext)
  const userProgressContext=useContext(UserProgressContext)

  function handleShowCart(){
    userProgressContext.showCart()
  }

  const totalCartItems=cartContext.items.reduce((acc,curr)=>{
    return acc+curr.quantity
  },0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restraurant"/>
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  )
}

export default Header
