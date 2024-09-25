import { useContext } from "react"
import { currencyFormatter } from "../utils/formatting"
import Button from "./UI/Button"
import CartContext from "../store/CartContext"

const MealItem = ({meals}) => {
  const cartContext=useContext(CartContext);

  function handleMealToCart(){
    cartContext.addItem(meals)
  }
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meals.image}`} alt={meals.name}/>
        <div>
            <h1>{meals.name}</h1>
            <h3 className="meal-item-price">{currencyFormatter.format(meals.price)}</h3>
            <p className="meal-item-description">{meals.description}</p>
        </div>
        <p className="meal-item-actions">
            <Button onClick={handleMealToCart}>Add to cart</Button>
        </p>
      </article>
    </li>
  )
}

export default MealItem
