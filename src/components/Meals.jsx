import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import MealItem from './MealItem'

const Meals = () => {
  const [meals,setMeals]=useState([])
  const [error,setError]=useState('')
  
  async function fetchMeals(){
    try{
        const response=await fetch('http://localhost:3000/meals')
        const data=await response.json()

        setMeals(data)
    }catch(err){
        setError(err) 
    }
  }

  useEffect(()=>{
    fetchMeals()
  },[])

  return (
    <ul id="meals">
      {meals?.map((meal)=>(
        <MealItem meals={meal} key={meal.id}/>
      ))}
    </ul>
  )
}

export default Meals
