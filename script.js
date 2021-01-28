
let allRecipes = [];
let recipesDetails={};
let searchBtn = document.getElementById("searchBtn");
let searchInput = document.getElementById("searchInput");
let recipesRow = document.getElementById("recipesRow");
let recipeDetailsRow = document.getElementById("recipeDetailsRow")


async function getRecipes(info) {
    let recipes = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${info}`)
    recipes = await recipes.json()
    allRecipes = recipes.recipes
    displayRecipes()
    console.log(allRecipes)
}
searchBtn.addEventListener("click", function () {
    getRecipes(searchInput.value)
});

function displayRecipes() {
    let cartoona = ``
    for (let i = 0; i < allRecipes.length; i++) {
        let myId="'" + allRecipes[i].recipe_id + "'" ;
        cartoona +=
     `
     <div class="col-md-4">
     <div class="recipe"onclick="getRecipesDetails(${myId})">
     <img src="${allRecipes[i].image_url}" class="w-100">
     <h5 class="color-mine font-weight-bolder py-2">${allRecipes[i].title}</h5>
     <p>${allRecipes[i].publisher}</p>
     </div>
     </div>
     `

    }
    recipesRow.innerHTML = cartoona
};
async function getRecipesDetails(id)

{
  let recipes= await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
  recipesDetails= await recipes.json()
  recipesDetails = recipesDetails.recipe;
  displayRecipesDetails() ;
  
  
}


function displayRecipesDetails() 
{
    let cartoona = `<div class=" recipeDetailsitem"> 
                   <h1>${recipesDetails.title}</h1>
                   <img src="${recipesDetails.image_url}"  class=" w-100">
                   <ul class="fa-ul py-3">`
                   for (let x of recipesDetails.ingredients) 
                   {
                     cartoona+=  `<li class="d-flex py-1 align-items-center font-weight-bolder">
                     <span class="fa-li"><i class="fas fa-utensil-spoon"></i></span>${x}
                     </li>`
                   }
                   
                   
                  cartoona+= `</ul>
                   </div>
                   `
                   recipeDetailsRow.innerHTML=cartoona;
}
