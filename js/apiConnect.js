

/*function names for call_api
getIngredients:search api for recipes given a list of ingredients. Takes in list.
youtubeLink:search an asmr video for the recipe selected
getDetail:get detail of a recipe gen its recipeid
*/
function call_api(input,functionName) {
    // Step 1
    var request = new XMLHttpRequest(); // Prep to make an HTTP request

    // Step 2
    request.onreadystatechange = function() {
        if( this.readyState == 4 && this.status == 200 ) {

            actionFunction(this,functionName);
            


        }
    }
    // Step 3
    url=urlFunction(input,functionName);
    request.open("GET", url, true);
    // Step 4
    request.send();
}


function urlFunction(input,functionName) {
    if (functionName=="getIngredients"){
        var base="https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=10&apiKey=";
        var spoonAPI = 'c168142caa444879a3b6d6892ed09067'
        var ingredients='';
        var diet='';
        var intolerances='';
        var cuisines=''
        if (input[0].length >0){
            var ingredient;
            console.log(input)
            for (ingredient in input[0]){
                if (ingredient==0){
                    ingredients='&includeIngredients='+input[0][ingredient];
                }
                else {
                    ingredients=ingredients +","+ input[0][ingredient];
                }
            }}

        if (input[1].length >0){
            diet="&diet="+input[1];
            }

        if (input[2].length >0){
            var intolerance;
            for (intolerance in input[2]){
                if (intolerance==0){
                    intolerances='&intolerances='+input[2][intolerance];
                }
                else {
                    intolerances=intolerances +","+ input[2][intolerance];
                }
            }}
    
        if (input[3].length >0){
            var cuisine;
            for (cuisine in input[3]){
                if (cuisine==0){
                    cuisines='&cuisine='+input[3][cuisine];
                }
                else {
                    cuisines=cuisines +","+ input[3][cuisine];
                }
            }}

        return (base+spoonAPI+ingredients+diet+intolerances+cuisines)
    }

    else if (functionName=="youtubeLink"){
        var base="https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=asmr+chicken+rice";
        var end="&key=";
        var recipe=input.split(" ");
        var word;
        for (word of recipe){
            base=base + "+" + word;
        }
    
        return base+end+youtubeAPI
    }

    else if (functionName=="getDetail"){
        var base="https://api.spoonacular.com/recipes/";
        var end="/information?includeNutrition=true&apiKey=";
        return base+input+end+spoonAPI
    }
}


function actionFunction(xml,functionName){
    if (functionName=="getIngredients"){
        var parseJSON = JSON.parse(xml.responseText);
        document.getElementById('card-columns').innerHTML='';
        var base='';
        var info = parseJSON.results;
        console.log(info);
        var recipe;
        for (recipe of info){
            console.log(recipe);
            var card= `
                <div class="card" style=" background-color: white">
                <img class="card-img-top" src="${recipe.image}" alt="Card image cap">
                <div class="card-body">
                <h5 class="card-title d-flex justify-content-center border border-dark">${recipe.title}</h5>
                
                <div class= "d-flex justify-content-center">
                    <div class="card-text" style="display: inline;margin-right: 10px;">${recipe.readyInMinutes} min</div>
                    <i class="fas fa-stopwatch" style="display: inline;"></i>
                </div>
        
                <div class= "d-flex justify-content-center">
                    <div class="card-text" style="display: inline; margin-right: 10px;">${recipe.spoonacularScore} / 100</div>
                    <i class="fas fa-star" style="display: inline;"></i>
                </div>
        
                <div class= "d-flex justify-content-center">
                    <div class="card-text" style="display: inline;margin-right: 10px;">${recipe.missedIngredientCount} missing ingredients</div>
                    <i class="far fa-question-circle" style="display: inline;"></i>
                </div> 
                </div>
            </div>
            `;
            base+=card;
            document.getElementById('card-columns').innerHTML=base;
        }
        


    }

    else if (functionName=="youtubeLink"){
        var response_json = JSON.parse(this.responseText);
    }

    else if (functionName=="getSummary"){
        var response_json = JSON.parse(this.responseText);
    }

    else if (functionName=="getDetail"){
        var response_json = JSON.parse(this.responseText);
    }

}
