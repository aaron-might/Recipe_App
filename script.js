// write a function that get random meal
function getRandomMeal(){
fetch('www.themealdb.com/api/json/v1/1/random.php');


}
// write a function that get meal by id 
function getMealById(id){

fetch('www.themealdb.com/api/json/v1/1/lookup.php?i='+id);
}
//write a function that get search meal by search
function getMealsBySearch(term)
fetch('www.themealdb.com/api/json/v1/1/search.php?s='+term)