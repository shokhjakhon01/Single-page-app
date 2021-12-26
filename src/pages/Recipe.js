/* eslint-disable array-callback-return */
import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getMealById } from '../api';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
function Recipe() {
  const {id} = useParams()
  const {goBack} = useHistory()
  const [recipe, setRecipe] = useState([])
  const [showRecipe, setShowRecipe] = useState(false)

  const handleRecipeShow = ()=>{
    setShowRecipe(!showRecipe)
  }

  useEffect(()=>{
    getMealById(id).then(data=> setRecipe(data.meals[0]))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <button className='btn' onClick={goBack}>Go back</button>
      {!recipe.idMeal ? <Loader/> : (
        <div className='recipe'>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <h1>{recipe.strMeal}</h1>
          <h6>Category: {recipe.strCategory}</h6>
          {recipe.strArea ? <h6>Area: {recipe.strArea}</h6> : null}
          <p>{recipe.strInstructions}</p>
          <button className='btn' onClick={handleRecipeShow} >Sow Recipe</button>
          {showRecipe ? (
          <table className='centred'>
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Measure</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(recipe).map(key => {
                if(key.includes('Ingredient') && recipe[key]){
                  return (
                    <tr>
                      <td>{recipe[key]}</td>
                      <td>{recipe[`strMeasure${key.slice(13)}`]}</td>
                    </tr>
                  )
                }
              })}
            </tbody>
          </table>
          ) : null}
         
          {recipe.strYoutube ? (
            <div className='row'>
              <h5>Vedio Recipe</h5>
              <iframe src={`https://www.youtube.com/embed/${recipe.strYoutube.slice(-11)}`} allowFullScreen title={id} />
            </div>
          ): null}
        </div>
      )}
    </>
  );
}

export default Recipe;