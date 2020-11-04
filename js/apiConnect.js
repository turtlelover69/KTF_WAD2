/*function names
getIngredients:search api for recipes given a list of ingredients. Takes in list.
youtubeLink:search an asmr video for the recipe selected
getSummary:get the summary of a recipe given its id
getDetail:get detail of a recipe gen its id
*/
var youtubeAPI='';
var spoonAPI='';




function call_api(input,functionName) {
    // Step 1
    var request = new XMLHttpRequest(); // Prep to make an HTTP request

    // Step 2
    request.onreadystatechange = function() {

        if( this.readyState == 4 && this.status == 200 ) {
        actionFunction(input,functionName);            

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


        var ingredients='';
        var diet='';
        var intolerances='';
        var cuisines=''

        if (input[0].length >0){
            var ingredient;
            for (ingredient in input[0]){
                if (ingredient==0){
                    ingredients='&includeIngredients='+input[0][ingredient];
                }
                else {
                    ingredients=ingredients +","+ input[0][ingredient];
                }
            }}

        if (input[1].length >0){
            diet="&diet"+input[1];
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

     
        return (base+spoonAPI+ingredients+diet+intolerances+cuisines)}

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

    else if (functionName=="getSummary"){
        var base="https://api.spoonacular.com/recipes/";
        var end="/information?includeNutrition=false&apiKey=";
        return base+input+end+spoonAPI
    }


    else if (functionName=="getDetail"){
        var base="https://api.spoonacular.com/recipes/";
        var end="/information?includeNutrition=false&apiKey=";
        return base+input+end+spoonAPI
    }




    }


function actionFunction(input,functionName){
    if (functionName=="getIngredients"){
        var response_json = JSON.parse(this.responseText);

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
