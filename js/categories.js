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


//This function dynamically populate all the categories(meats,vegetables,etc) and also include checkbox
function populate_categories()
{
    var string
    // pls include checkboxes for this dropdown too
    for(const [key,values] of Object.entries(categories)){
        string += `

        <li class="nav-item dropdown col border border-dark" style = "background-image: url(${values.imageurl})">
            <a class="nav-link dropdown-toggle d-flex justify-content-center" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
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
                <a class="dropdown-item" href="#">
                    <input type="checkbox" id= "${selection}_checkbox" onclick="populate_checkbox('${checkbox_str}')">
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

// If it is checked, populate the selected ingredients at the checkbox, or remove when it is unchecked.
// item_ingredient, item_intolerance, item_cuisine
function populate_checkbox(selected_item){
    item_list = selected_item.split('_');
    var item = item_list[0];
    var type = item_list[1];
    if(document.getElementById(`${item}_checkbox`).checked){
        var search_tag = `
        <div class='search-tag' id='${item}_${type}'>
            <h4>${item} </h4>
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
function populate_searchbox(selected_ingredient){
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
        all_current_tags[tag_type].push(tag_name);
    }
    console.log(all_current_tags)
    call_api(all_current_tags,'getIngredients');
};
    // Create an observer instance linked to the callback function
const observer = new MutationObserver(current_tag_nodes);
    // Start observing the target node for configured mutations
observer.observe(targetNode, config);
//[END] Using mutation observer to gather all the ingredients and send to spoontaculous API
