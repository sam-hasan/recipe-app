//get saved recipes
const getSavedRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes');
    return recipesJSON ? JSON.parse(recipesJSON) : [];
};

//save the recipes to localStorage
const saveRecipes = (recipes) => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
};

//remove a recipe
const removeRecipe = (id) => {
    const recipeFound = recipes.findIndex((recipe) => {
        return id === recipe.id;
    });
    if (recipeFound > -1) {
        recipes.splice(recipeFound, 1);
    }
};

const ingredientSummary = (recipe) => {
    const doesHave = recipe.ingredients.filter((el) => {
        return el.have;
    });

    if (doesHave.length <= 0) {
        return `You have none of the ingredients`;
    } else if (doesHave.length > 0 && doesHave.length < recipe.ingredients.length) {
        return `You have some of the ingredients`;
    } else {
        return `You have all the ingredients`;
    }
};

//generates the DOM structure
const generateRecipeDOM = (recipe) => {
    const recipeElement = document.createElement('div');

    const recipeLink = document.createElement('a');
    recipeLink.className = 'recipe-link';

    const ingredientEl = document.createElement('p');
    ingredientEl.textContent = ingredientSummary(recipe);
    ingredientEl.className = 'recipe-text';
    recipeLink.setAttribute('href', `/edit.html#${recipe.id}`);

    if (recipe.name.length > 0) {
        recipeLink.textContent = recipe.name;
    } else {
        recipeLink.textContent = `untitled`;
    }
    recipeElement.className = 'foo';
    recipeElement.appendChild(recipeLink);
    recipeElement.appendChild(ingredientEl);
    return recipeElement;
};

//render the recipes to screen
const renderRecipes = (recipes, filters) => {
    const filterRecipes = recipes.filter((recipe) => {
        return recipe.name.toLowerCase().includes(filters.searchText.toLowerCase());
    });

    document.querySelector('#recipes').innerHTML = '';
    const emptyMessage = document.createElement('p');

    if (filterRecipes.length > 0) {
        filterRecipes.forEach((recipe) => {
            document.querySelector('#recipes').appendChild(generateRecipeDOM(recipe));
        });
    } else if (recipes.length <= 0) {
        emptyMessage.textContent = 'No recipes to show';
        document.querySelector('#recipes').appendChild(emptyMessage);
    } else if (filterRecipes.length <= 0) {
        emptyMessage.textContent = `We didn't find any results`;
        document.querySelector('#recipes').appendChild(emptyMessage);
    }
};
