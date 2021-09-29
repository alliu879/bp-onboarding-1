import './App.css';
import React, {useEffect, useState} from "react";
import Recipe from './Recipe';

const App = () => {
  const APP_ID = "6ada44de";
  const APP_KEYS = "aa6e76fa436b639ff52a308980944f24";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect( () => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    try {
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEYS}&from=0&to=3&calories=591-722&health=alcohol-free`);
      const data = await response.json();
      setRecipes(data.hits);
      console.log(data.hits);
    } catch(e) {
      setRecipes([]);
      console.log(e);
    }
    
  };

  const updateSearch = e => {
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
        {recipes.map(recipe =>(
          <Recipe 
            key={recipe.recipe.label}
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories} 
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients} />
        ))}
      </div>
      
    </div>
  )
}

export default App;
