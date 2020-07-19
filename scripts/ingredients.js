//create ingredients
const createIngredient = (input, id) => {
    recipes
        .find((recipe) => recipe.id === id)
        .ingredients.push({
            text: input,
            have: false,
        });
};

//delete ingredient
const removeIngredient = (ingredient) => {
    const found = recipe.ingredients.findIndex((el) => {
        return el.text === ingredient.text;
    });
    if (found > -1) {
        recipe.ingredients.splice(found, 1);
    }
};

//render ingredients to the screen
const renderIngredients = (recipe) => {
    document.querySelector('#ingredients-container__block').innerHTML = '';

    recipe.ingredients.forEach((ingredient) => {
        document.querySelector('#ingredients-container__block').appendChild(generateIngredientsDOM(ingredient));
    });
};

//generate the ingredients structure
const generateIngredientsDOM = (ingredient) => {
    const ingredientEl = document.createElement('label');
    const containerEl = document.createElement('div');
    const textEl = document.createElement('span');
    const deleteEl = document.createElement('button');
    const checkboxEl = document.createElement('input');

    //setup the checkbox
    checkboxEl.setAttribute('type', 'checkbox');
    checkboxEl.className = 'ingredients-container__checkbox';
    checkboxEl.checked = ingredient.have;
    checkboxEl.addEventListener('change', (e) => {
        ingredient.have = e.target.checked;
        saveRecipes(recipes);
        renderIngredients(recipe);
    });
    containerEl.className = 'ingredients-container__box';
    containerEl.appendChild(checkboxEl);

    //setup the text part
    textEl.textContent = ingredient.text;
    textEl.className = 'ingredients-container__text';
    containerEl.appendChild(textEl);
    ingredientEl.className = 'ingredients-container__label';
    ingredientEl.appendChild(containerEl);

    //setup the delete button
    deleteEl.textContent = 'remove';
    deleteEl.className = 'ingredients-container__delete';
    containerEl.appendChild(deleteEl);
    deleteEl.addEventListener('click', (e) => {
        removeIngredient(ingredient);
        saveRecipes(recipes);
        renderIngredients(recipe);
    });

    return ingredientEl;
};
