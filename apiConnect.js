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
        var base="https://api.spoonacular.com/recipes/findByIngredients?ingredients=";
        var end='&number=10&apiKey=';
        var ingredient;
        for (ingredient of input){
            if (ingredient==input[0]){
                base=base+ingredient;
            }
            else {
                base=base +",+"+ ingredient;
            }
        }
        return (base+end+spoonAPI)}

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