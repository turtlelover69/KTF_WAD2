function call_api(input){
    var base_url = "http://localhost/newfood.json";


    // Step 1
    var request = new XMLHttpRequest();

    // Step 2
    // Register function
    request.onreadystatechange = function() {
        // Step 5
        if( request.readyState == 4 && request.status == 200 ) {
            // Response is ready
            //console.log(request.responseText);

            // Convert API response to JavaScript JSON object
            var json_obj = JSON.parse(request.responseText);
            extract_ingredients(json_obj.records);
        }
    }

    // Step 3
    request.open("GET", base_url, true); // Async

    // Step 4
    request.send();
}

function extract_ingredients(json_obj){
    var all_ingredients_list = [];
    for(var recipe_obj of json_obj){
        var ingredients = recipe_obj.ingredients;
        ingredients = ingredients.split(',');
        for(var ingredient of ingredients){
            if(!all_ingredients_list.includes(ingredient)){
                all_ingredients_list.push(ingredient);
            }
        }
    }

    

}