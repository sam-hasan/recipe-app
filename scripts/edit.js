const recipes = getSavedRecipes();

const recipeId = location.hash.substring(1);
const recipe = recipes.find((recipe) => {
    return recipe.id === recipeId;
});

renderIngredients(recipe);

document.querySelector('#recipe-name').value = recipe.name;
document.querySelector('#recipe-steps').value = recipe.steps;

document.querySelector('#recipe-name').addEventListener('input', (e) => {
    recipe.name = e.target.value;
    saveRecipes(recipes);
});

document.querySelector('#recipe-steps').addEventListener('input', (e) => {
    recipe.steps = e.target.value;
    saveRecipes(recipes);
});

document.querySelector('#remove-recipe').addEventListener('click', (e) => {
    removeRecipe(recipe.id);
    saveRecipes(recipes);
    location.assign('/index.html');
});

document.querySelector('#add-ingredients').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.elements.text.value.trim();
    if (input.length > 0) {
        createIngredient(input, recipeId);
        saveRecipes(recipes);
        renderIngredients(recipe);
    }
    e.target.elements.text.value = '';
});
