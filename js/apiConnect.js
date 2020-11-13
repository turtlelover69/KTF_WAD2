
const youtubeAPI='';
const spoonAPI='08ee0751e64c407890629b7b864c7ee2';


/*function names for call_api
getIngredients:search api for recipes given a list of ingredients. Takes in list.
youtubeLink:search an asmr video for the recipe selected
getDetail:get detail of a recipe gen its recipeid
*/
function call_api(input,functionName) {
    // Step 1
    console.log(input);
    var request = new XMLHttpRequest(); // Prep to make an HTTP request

    // Step 2
    request.onreadystatechange = function() {
        if( this.readyState == 4 && this.status == 200 ) {
            actionFunction(this, functionName);
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
        var temporary_storage = JSON.parse(sessionStorage.getItem("storage"));
        var base="https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=10&apiKey=";
        var ingredients='';
        var diet='';
        var intolerances='';
        var cuisines=''
        if (input.ingredient.length>0){
            var ingredient;
            for (var index = 0; index<input.ingredient.length; index++){
                if (index==0){
                    ingredients='&includeIngredients='+input.ingredient[index];
                }
                else {
                    ingredients += ","+ input.ingredient[index];
                }
            }}

        if (input.diet.length>0){
            diet="&diet="+input.diet;
            }

        if (input.intolerance.length>0){
            var intolerance;
            for (var index = 0; index<input.intolerance.length; index++){
                if (index==0){
                    intolerances='&intolerances='+input.intolerance[index];
                }
                else {
                    intolerances += "," + input.intolerance[index];
                }
            }}
    
        if (input.cuisine.length >0){
            var cuisine;
            for (var index = 0; index<input.cuisine.length; index++){
                if (index==0){
                    cuisines='&cuisine='+input.cuisine[index];
                }
                else {
                    cuisines += ","+ input.cuisine[index];
                }
            }}
        var final_url = base+spoonAPI+ingredients+diet+intolerances+cuisines;
        console.log(final_url)
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