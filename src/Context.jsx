
import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'

const AppContext = React.createContext()

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'
  
const getFavoritesFromLocalStorage = () => {
  let favorites = localStorage.getItem('favorites');
  if (favorites) {
    favorites = JSON.parse(localStorage.getItem('favorites'))
  }
  else {
    favorites = []
  }
  return favorites
}

const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false);
  const [searchTerm,setSearchTerm] = useState('');
  const [showModal,setShowModal]  = useState(false)
  const [selectedMeal,setSelectedMeal] = useState(null)
  const [favourite,setFavourite] = useState(getFavoritesFromLocalStorage ());
  

  const addToFavourite = (idMeal) => {
    const meal = meals.find((meal) => meal.idMeal === idMeal);
    const alreadyFavorite = favourite.find((meal) => meal.idMeal === idMeal);
    if (alreadyFavorite) return
    const updatedFavorites = [...favourite, meal]
    setFavourite(updatedFavorites)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
  }

   const removeFromFavourite = (idMeal) => {
    const updatedFavorites = favorite.filter((meal) => meal.idMeal !== idMeal);
    setFavourite(updatedFavorites)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
  }
   

  const fetchMeals = async (url) => {
    setLoading(true)
    try {
      const { data } = await axios.get(url)
      if (data.meals)
        setMeals(data.meals)
      else
        setMeals([])
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  const fetchRandomMeal = ()=>{
    fetchMeals(randomMealUrl)
  }
  const closeModal = ()=>{
    setShowModal(false);
  }
  const selectMeal = (idMeal,favouriteMeal) =>{
    let meal;
    meal = meals.find((meal) => meal.idMeal === idMeal)
    setSelectedMeal(meal)
    setShowModal(true)
  }

  useEffect(()=>{
    fetchMeals(allMealsUrl)
  },[])
  
  useEffect(() => {
    if(!searchTerm) return
    fetchMeals(`${allMealsUrl}${searchTerm}`)
  }, [searchTerm])

  return (
    <AppContext.Provider value={{ loading, meals,setSearchTerm,fetchRandomMeal,showModal,selectedMeal,selectMeal,closeModal,addToFavourite,removeFromFavourite,favourite}}>
      {children}
    </AppContext.Provider>
  )
}

const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider, useGlobalContext }