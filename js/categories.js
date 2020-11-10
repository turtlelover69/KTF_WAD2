const categories = {
    meatlist : {list:["beef","chicken","duck","mutton","lamb","pork","sausage","turkey","venison"],name: "Meat", imageurl: "images/meat.jpg",color :"red"  },
    seafoodlist : {list:["catfish","clam","cod","crab","lobster","salmon","scallop","shrimp","tuna"],name: "Seafood",imageurl: "images/seafood.jpg",color:"lightblue"},
    veglist : {list:["broccoli","cabbage","capsicum","carrot","celery","garlic","kale","lettuce","mushroom","onion","potato","spinach"],name: "Vegetables",imageurl:"images/vegetables.jpg",color: "lightgreen"},
    dairylist : {list:["butter","cheese","cream","milk","yogurt"],name:"Dairy",imageurl:"images/dairy.jpg",color: "beige"},
    grainlist : {list:["barley","bread","oat","pasta","rice","wheat"],name:"Grains",imageurl:"images/grains.jpg",color:"yellow"},
    dietList: {list:["gluten free","ketogenic","vegetarian","lacto-vegetarian","ovo-vegetarian","vegan","pescetarian","paleo","primal","whole30"],name:"Diets",imageurl:"images/diet.jpg",color:"orange"},
    intolerancesList: {list:["dairy","egg","gluten","grain","peanut","seafood","sesame","shellfish","soy","sulfite","tree nut","wheat"],name:"Allergies", imageurl: "images/intolerances.jpg",color: "pink"},
    cuisinesList: {list:["african","american","british","cajun","caribbean","chinese","eastern european","european","french","german","greek","indian","irish","italian","japanese","jewish","korean","latin american","mediterranean","mexican","middle eastern","nordic","southern","spanish","thai","vietnamese"],name: "Cuisines", imageurl: "images/cuisines.jpg",color:"grey"} 
}

//Initialize temporary storage for selected tags
sessionStorage.setItem("storage", JSON.stringify(
    {ingredient:[],
    diet:[],
    intolerance:[],
    cuisine:[]}));

//This function dynamically populate all the categories(meats,vegetables,etc) and also include checkbox
function populate_categories()
{
    var string = "";
    // pls include checkboxes for this dropdown too
    for(const [key,values] of Object.entries(categories)){
        string += `

        <li class="nav-item dropdown col border border-dark" style = "background-image: url(${values.imageurl})">
            <a class="nav-link dropdown-toggle d-flex justify-content-center" href="#" role="button" aria-haspopup="false" aria-expanded="true" >
                <mark class = "border border-dark" style="background-color:${values.color}">${values.name}</mark>
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown" id="${key}" style="background-color:${values.color}">
            `;
        
        var type = values.name;
        for(var selection of values.list){
            var checkbox_str = selection + '_ingredient';
            if(type == 'Allergies'){
                var checkbox_str = selection + '_intolerance';
            }
            else if(type == 'Diets'){
                var checkbox_str = selection + '_diet';
            }
            else if(type == 'Cuisines'){
                var checkbox_str = selection + '_cuisine';
            }
            string += `
                <a class="dropdown-item" href="#" onclick="switch_checkbox('${selection}_checkbox')">
                    <input type="checkbox" id= "${selection}_checkbox" name='${checkbox_str}' onclick="populate_checkbox('${checkbox_str}')">
                    ${selection}
                </a>
            `;
        }
        string += `
            </div>
        </li>
    
        `;
        document.getElementById('navbar').innerHTML = string;
    }
}

// Enable the entire section of the clickable category to check the checkbox
function switch_checkbox(checkbox){
    if(document.getElementById(checkbox).checked){
        document.getElementById(checkbox).checked = false;
    }
    else{
        document.getElementById(checkbox).checked = true;
    }
    populate_checkbox(document.getElementById(checkbox).name);
}



// If it is checked, populate the selected ingredients at the checkbox, or remove when it is unchecked.
// item_ingredient, item_intolerance, item_cuisine
function populate_checkbox(selected_item){
    item_list = selected_item.split('_');
    var item = item_list[0];
    var type = item_list[1];
    if(document.getElementById(`${item}_checkbox`).checked){
        var search_tag = `
        <div class='search-tag' id='${item}_${type}'>
            <h6 >${item} </h6>
            <button onclick="remove_tag('${item}_${type}')">X</button>
        </div>
        `;

        document.getElementById('search_tags').innerHTML += search_tag;
    }
    else{
        remove_tag(selected_item);
    }
}


// Retrieve value from search box
function populate_searchbox(){
    // Remember to validate the input!!!
    var selected_ingredient = document.getElementById('ingredient_input').value
    var search_tag = `
        <div class='search-tag' id='${selected_ingredient}_ingredient'>
            <h4>${selected_ingredient}</h4>
            <button onclick="remove_tag('${selected_ingredient}_ingredient')">X</button>
        </div>
        `;
    document.getElementById('search_tags').innerHTML += search_tag;
}



// Remove selected ingredient tag
function remove_tag(selected_ingredient){
    document.getElementById(`${selected_ingredient}`).remove();
    var splitted_tag = selected_ingredient.split('_')
    var tag_name = splitted_tag[0]
    var uncheck_ele = `${tag_name}_checkbox`;
    document.getElementById(uncheck_ele).checked= false;
}

// Remove all selected ingredient tags
function remove_all_tags(){
    document.getElementById('search_tags').innerHTML = '';
}

// Supposed to populate the card results, currently in apiConnect.js
// function populate_result(retrieved_tag){
//     result = retrieved_tag.results
//     console.log(result)
// }


// Retrieve the API call and populate the cards in index.html
//getIngredients,youtubeLink,getSummary,getDetail
function actionFunction(xml,functionName){
    if (functionName=="getIngredients"){
        var parseJSON = JSON.parse(xml.responseText);
        document.getElementById('card-columns').innerHTML='';
        var base='';
        var recipe;
        var info = parseJSON.results;
        var temporary_storage = JSON.parse(sessionStorage.getItem("storage"));
        if(temporary_storage.ingredient.length>1 && info.length==0){
            no_result_page()
        }

        for(recipe of info){
            var card= `
                <div class="card col" style=" background-color: white">
                    <img class="card-img-top " src="${recipe.image}" alt="Card image cap">
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

//Page to display when there is no result
function no_result_page(){
    //Create a button that says "YES TAKE ME BACK!"
    var return_template = `
    <div id='error_page' style='text-align:center'>
        <h1>Oops, there is no search result! Do you want to revert your changes?</h1>
        <br>
        <button type="button" class="btn btn-warning btn-outline-dark font-weight-bold btn-lg" onclick="no_result_action()">Yes! Take me back!!!</button>
    </div>
    `;

    document.getElementById('error-msg').innerHTML = return_template;

}

function no_result_action(){
    //Once clicked, call the temporary stack and pop the latest element
    var temporary_storage = JSON.parse(sessionStorage.getItem("storage"));
    var removed_tag = temporary_storage.ingredient.pop();
    document.getElementById('error-msg').innerHTML = '';
    remove_tag(`${removed_tag}_ingredient`);
    //Then call the api again with the existing stack
    sessionStorage.setItem("storage",JSON.stringify(temporary_storage));
    call_api(temporary_storage,"getIngredients");
    //Also remember to delete the apprioriate tag and uncheck the correct checkbox

}

//[START] Using mutation observer to gather all the ingredients and send to spoontaculous API
const targetNode = document.getElementById('search_tags');
    // Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };
    // Callback function to execute when mutations are observed
const current_tag_nodes = function(mutationsList, observer) {
    var tag_nodes = document.getElementsByClassName('search-tag');
    var all_current_tags = {
        ingredient:[],
        diet:[],
        intolerance:[],
        cuisine:[]
    }
    for(tag_node of tag_nodes){
        var splitted_tag = tag_node.id.split('_');
        var tag_name = splitted_tag[0];
        var tag_type = splitted_tag[1];
        //Push into temporary storage to simulate stack operation later on
        var temporary_storage = JSON.parse(sessionStorage.getItem("storage"));
        all_current_tags[tag_type].push(tag_name);
        temporary_storage[tag_type].push(tag_name);
        sessionStorage.setItem("storage", JSON.stringify(temporary_storage));
    }
    console.log(all_current_tags)


    //If there is no return, clear the card columns
    if(all_current_tags.ingredient.length==0 && all_current_tags.diet.length==0 && all_current_tags.intolerance.length==0 && all_current_tags.cuisine.length==0){
        console.log('No recipes atm');
        document.getElementById("card-columns").innerHTML='';
    }
    
    else{
        call_api(all_current_tags,'getIngredients');
    }

};
    // Create an observer instance linked to the callback function
const observer = new MutationObserver(current_tag_nodes);
    // Start observing the target node for configured mutations
observer.observe(targetNode, config);
//[END] Using mutation observer to gather all the ingredients and send to spoontaculous API

