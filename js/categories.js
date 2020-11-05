const categories = {
    meatlist : ["beef","chicken","duck","mutton","lamb","pork","sausage","turkey","venison"],
    seafoodlist : ["catfish","clam","cod","crab","lobster","salmon","scallop","shrimp","tuna"],
    veglist : ["broccoli","cabbage","capsicum","carrot","celery","garlic","kale","lettuce","mushroom","onion","potato","spinach"],
    dairylist : ["butter","cheese","cream","milk","yogurt"],
    grainlist : ["barley","bread","oat","pasta","rice","wheat"],
    dietList: ["Gluten Free","Ketogenic","Vegetarian","Lacto-Vegetarian","Ovo-Vegetarian","Vegan","Pescetarian","Paleo","Primal","Whole30"],
    intolerancesList: ["Dairy","Egg","Gluten","Grain","Peanut","Seafood","Sesame","Shellfish","Soy","Sulfite","Tree Nut","Wheat"],
    cuisinesList: ["African","American","British","Cajun","Caribbean","Chinese","Eastern European","European","French","German","Greek","Indian","Irish","Italian","Japanese","Jewish","Korean","Latin American","Mediterranean","Mexican","Middle Eastern","Nordic","Southern","Spanish","Thai","Vietnamese"]
}


//This function dynamically populate all the categories(meats,vegetables,etc) and also include checkbox
function populate_categories()
{
    var string
    // pls include checkboxes for this dropdown too
    for(const [key,ingredients] of Object.entries(categories)){
        string += `

        <li class="nav-item dropdown col bg-primary border border-dark">
            <a class="nav-link dropdown-toggle d-flex justify-content-center" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                ${key}
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown" id="${key}">`;
        for(var ingredient of ingredients){
            string += `
                <a class="dropdown-item" href="#">
                    <input type="checkbox" id= "${ingredient}_checkbox" onclick="populate_checkbox('${ingredient}')">
                    ${ingredient}
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

// If it is checked, populate the selected ingredients at the checkbox, or remove when it is unchecked.
function populate_checkbox(selected_ingredient){
    if(document.getElementById(`${selected_ingredient}_checkbox`).checked){
        var search_tag = `
        <div class='search-tag' id='${selected_ingredient}_tag'>
            <h4>${selected_ingredient}  </h4>
            <button onclick="remove_tag('${selected_ingredient}')">X</button>
        </div>
        `;
        document.getElementById('search_tags').innerHTML += search_tag;
    }
    else{
        remove_tag(selected_ingredient);
    }
}

// Retrieve value from search box
function populate_searchbox(selected_ingredient){
    // Remember to validate the input!!!
    var selected_ingredient = document.getElementById('ingredient_input').value
    var search_tag = `
        <div class='search-tag' id='${selected_ingredient}_tag'>
            <h4>${selected_ingredient}</h4>
            <button onclick="remove_tag('${selected_ingredient}')">X</button>
        </div>
        `;
    document.getElementById('search_tags').innerHTML += search_tag;


}

// Remove selected ingredient tag
function remove_tag(selected_ingredient){
    document.getElementById(`${selected_ingredient}_tag`).remove();
    var uncheck_ele = `${selected_ingredient}_checkbox`;
    document.getElementById(uncheck_ele).checked= false;
}

// Remove all selected ingredient tags
function remove_all_tags(){
    document.getElementById('search_tags').innerHTML = '';
}


function populate_result(retrieved_tag){
    result = retrieved_tag.results
    console.log(result)
}

//[START] Using mutation observer to gather all the ingredients and send to spoontaculous API
const targetNode = document.getElementById('search_tags');
    // Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };
    // Callback function to execute when mutations are observed
const current_tag_nodes = function(mutationsList, observer) {
    var ingredient_nodes = document.getElementsByClassName('search-tag');
    var all_current_ingredients = []
    for(ingredient_node of ingredient_nodes){
        all_current_ingredients.push(ingredient_node.id.slice(0,-4));
    }
    call_api([all_current_ingredients,[],[],[]],'getIngredients');
};
    // Create an observer instance linked to the callback function
const observer = new MutationObserver(current_tag_nodes);
    // Start observing the target node for configured mutations
observer.observe(targetNode, config);
//[END] Using mutation observer to gather all the ingredients and send to spoontaculous API
