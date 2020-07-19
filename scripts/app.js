let recipes = getSavedRecipes();

const filters = {
    searchText: '',
};

renderRecipes(recipes, filters);

document.querySelector('#add-recipe').addEventListener('click', (e) => {
    e.preventDefault();
    const id = uuidv4();
    recipes.push({
        id: id,
        name: '',
        steps: '',
        ingredients: [],
    });
    saveRecipes(recipes);
    location.assign(`/edit.html#${id}`);
});

document.querySelector('#search-recipes').addEventListener('input', (e) => {
    filters.searchText = e.target.value.trim();
    renderRecipes(recipes, filters); //tookHelp
});
