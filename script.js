const mealsEl = document.getElementById('meals');
const favoriteContainer = document.getElementById('fav-meals');

// const mealPopup = document.getElementById('meal-popup')
// const popupCloseBtn = document.getElementById('close-popup')

// const mealInfo = document.getElementById('meal-info')


const searchTerm = document.getElementById('search-term');
const searchBtn = document.getElementById('search');

getRandomMeal();
fetchFavMeals();
// write a  function that get random meal;

async function getRandomMeal() {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');

    const respData = await resp.json();
    const randomMeal = respData.meals[0];

    // console.log(RandomMeal);
    addMeal(randomMeal, true);
}
// write a function that get meal by id 
async function getMealById(id) {

    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id
    );
    const respData = await resp.json();
    const meal = respData.meals[0];
    return meal;
}
//write a function that get search meal by search
async function getMealsBySearch(term) {

    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term
    );

    const respData = await resp.json();
    const meals = respData.meals; //

    // console.log(meals)
    return meals;
}

function addMeal(mealData, random = false) {
    console.log(mealData);
    const meal = document.createElement('div');
    meal.classList.add('meal');

    meal.innerHTML = `
                <div class="meal-header">
                ${random ? `
                <span class="random"> Random Recipe </span>` : ''}
                    <img src="${mealData.strMealThumb}" 
                    alt="${mealData.strMeal}"
                </div>
                <div class="meal-body">
                    <h4>${mealData.strMeal}</h4>
                    <button class="fav-btn active" onclick= "" >
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
        `;
    const btn = meal.querySelector('.meal-body .fav-btn');
    btn.addEventListener('click', () => {
        if (btn.classList.contains('active')) {
            removeMealLS(mealData.idMeal)
            btn.classList.remove('active');
        } else {
            addMealLS(mealData.idMeal)
            btn.classList.add('active');
        }
        //clean the container
        favoriteContainer.innerHTML = "";
        fetchFavMeals();
        // btn.classList.toggle('active');
    });

    meal.addEventListener('click', () =>{
        showMealInfo(mealData);
    })


    mealsEl.appendChild(meal)
}

function addMealLS(mealId) {
    const mealIds = getMealsLS();
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}
function removeMealLS(mealId) {
    const mealIds = getMealsLS();
    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter((id) => id !== mealId))
    );

}
function getMealsLS() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));

    return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
    favoriteContainer.innerHTML = "";

    const mealIds = getMealsLS();

    // const meals = [];
    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i];
        meal = await getMealById(mealId);
        addMealFav(meal);
    }

    // console.log(meals);

    //add them to the screen
}

function addMealFav(mealData) {
    // console.log(mealData);
    const favMeal = document.createElement('li');
    // meal.classList.add('meal');

    favMeal.innerHTML = `
    <img 
    src="${mealData.strMealThumb}" 
    alt="${mealData.strMeal}"
    /><span>${mealData.strMeal}</span>
    <button class ="clear">
    <i class="fas fa-window-close"></i>
    </button>
    `;
    const btn = favMeal.querySelector('.clear');
    btn.addEventListener('click', () => {
        removeMealLS(mealData.idMeal);
        fetchFavMeals();
    })

    favoriteContainer.appendChild(favMeal)
}

// function showMealInfo(mealData) {
// //    clean it up
// mealInfoEl.innerHTML ='';
   
//     //update the Meal info
// const mealEl = document.createElement('div');
// mealEl.innerHTML =`
//     <h1>${mealData.strMeal}</h1>
//     <img 
//         src="${mealData.strMealThumb}" 
//         alt=""
//     />

//     <p>${mealData.strInstructions}</p>
// `
// mealInfoEl.appendChild(mealEl);
// //show the popup
// mealPopup.classList.remove('hidden');
    
// }

searchBtn.addEventListener('click', async () => {
    //clean container
    mealsEl.innerHTML = '';
    const search = searchTerm.value;
    // console.log (await getMealsBySearch(search));

    const meals = await getMealsBySearch(search)

    if (meals) {
        meals.forEach((meal) => {
            addMeal(meal);
        });
    }
});

// popupCloseBtn.addEventListener('click', () =>{
//     mealPopup.classList.add('hidden');
// })