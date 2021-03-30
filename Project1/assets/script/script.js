var buttonValue = document.querySelector("#mexicoBtn")
// United States
// France
// Italy
// Indian
// China
// Japan
// Greece
var onClickCuisineMexico = function (event) {
    event.preventDefault();

    var mexicanButtonValue = buttonValue.value;

    if (mexicanButtonValue) {
        getCuisinaCountry(mexicanButtonValue);
    }
};

var getCuisinaCountry = function (cuisine) {

    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=" + cuisine)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("NETWORK RESPONSE NOT OK");
            }
        })
        .then(function (data) {
            console.log(data);
            displayCuisineRecipes(data);
        })
        .catch((error) => {
            console.error("FETCH ERROR:", error);
        });


    function displayCuisineRecipes(data) {
        let newArr = [];
        for (let i = 0; i < data.meals.length - 2; i++) {
            newArr.push(data.meals[i]);


            const recipeName = data.meals[i].strMeal
            const recipeNamePlacement = document.getElementById("list")
            const createListElements = document.createElement("li")
            createListElements.innerHTML = recipeName
            createListElements.setAttribute("class", "recipe")
            createListElements.setAttribute("data-id", data.meals[i].idMeal)
            createListElements.setAttribute("onclick", "test(this)")
            recipeNamePlacement.appendChild(createListElements);

        }
    }
}

function test(c) {
    console.log(c)
    const cuisineNumber = c.getAttribute("data-id")
    const createRecipeSection = document.createElement("li")
    const getRecipeInformation = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + cuisineNumber
    fetch(getRecipeInformation)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("NETWORK RESPONSE NOT OK");
            }
        })
        .then(function (data) {
            console.log(data);
            const instructionsRecipe = data.meals[0].strInstructions
            createRecipeSection.innerHTML = instructionsRecipe
            const createInstructions = document.getElementById("instructions")
            createInstructions.appendChild(createRecipeSection)
        })

};
// function displayRecipeInfo(data) {
//     const cuisineNumber = data.meals[0].idMeal
//     const createRecipeSection = document.createElement("li")
//     const getRecipeInformation = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + cuisineNumber
//     fetch(getRecipeInformation)
//         .then((response) => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 throw new Error("NETWORK RESPONSE NOT OK");
//             }
//         })
//         .then(function (data) {
//             console.log(data);
//             const instructionsRecipe = data.meals[0].strInstructions
//             createRecipeSection.innerHTML = instructionsRecipe
//             const createInstructions = document.getElementById("instructions")
//             createInstructions.appendChild(createRecipeSection)
//         })
// }
buttonValue.addEventListener("click", onClickCuisineMexico)


