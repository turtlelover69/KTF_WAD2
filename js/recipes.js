const categories = {
    calorieList:{list:["50 - 200", "201 - 400", "401 - 600", "601 - 800"],name:"Calories",imageurl:"images/calorie.jpg",color: "Yellow"},
    TimingList:{list:["Under 15 minutes", "Under 30 minutes", "Under 1 hour", "Under 2 hours", "Unlimited time"],name:"Preparation Time",imageurl:"images/time.jpg",color: "Red"},
    dietList: {list:["gluten free","ketogenic","vegetarian","lacto-vegetarian","ovo-vegetarian","vegan","pescetarian","paleo","primal","whole30"],name:"Diets",imageurl:"images/diet.jpg",color:"orange"},
    intolerancesList: {list:["dairy","egg","gluten","grain","peanut","seafood","sesame","shellfish","soy","sulfite","tree nut","wheat"],name:"Allergies", imageurl: "images/intolerances.jpg",color: "pink"},
    cuisinesList: {list:["african","american","british","cajun","caribbean","chinese","eastern european","european","french","german","greek","indian","irish","italian","japanese","jewish","korean","latin american","mediterranean","mexican","middle eastern","nordic","southern","spanish","thai","vietnamese"],name: "Cuisines", imageurl: "images/cuisines.jpg",color:"gold"}
}



//Initialize temporary storage for selected tags
sessionStorage.setItem("recipe_storage", JSON.stringify(
    {   
        query: '',
        diet:[],
        intolerance:[],
        cuisine:[],
        time:[],
        mincalories:[],
        maxcalories:[],
        order: []
    }));

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
            if(type == 'Allergies'){
                var checkbox_str = selection + '_intolerance';
            }
            else if(type == 'Diets'){
                var checkbox_str = selection + '_diet';
            }
            else if(type == 'Cuisines'){
                var checkbox_str = selection + '_cuisine';
            }
            else if(type == 'Calories'){
                var checkbox_str = selection + '_calories';
            }
            else if(type == 'Preparation Time'){
                if(selection=='Under 15 minutes'){
                    time_selection = '15';
                }
                else if(selection=='Under 30 minutes'){
                    time_selection = '30';
                }
                else if(selection=='Under 1 hour'){
                    time_selection = '60';
                }
                else if(selection=='Under 2 hours'){
                    time_selection = '120';
                }
                else{
                    time_selection = 'unlimited';
                }
                var checkbox_str = time_selection + '_time';
            }
            if(values.name=='Calories' || values.name=='Preparation Time'){
                string += `
                <a class="dropdown-item" href="#" onclick="switch_radio('${checkbox_str}_radio')">
                    <input type="radio" id= "${checkbox_str}_radio" value='${checkbox_str}' name='${values.name}' onclick="">
                    ${selection}
                </a>
            `;
            }
            else{
                string += `
                <a class="dropdown-item" href="#" onclick="switch_checkbox('${checkbox_str}_checkbox')">
                    <input type="checkbox" id= "${checkbox_str}_checkbox" value='${checkbox_str}' name='${values.name}' onclick="populate_checkbox('${checkbox_str}')">
                    ${selection}
                </a>
            `;
            }

        }
        string += `
            </div>
        </li>
        
        `;
        document.getElementById('navbar').innerHTML = string;
    }
}



// Enable the entire section of the clickable category to check the radio
function switch_radio(radio){
    if(document.getElementById(radio).checked){
        console.log(document.getElementById(radio).checked)
        document.getElementById(radio).checked = false;
    }
    else{
        console.log(document.getElementById(radio).checked)
        document.getElementById(radio).checked = true;
    }
    populate_radio(document.getElementById(radio).value);
}


// Enable the entire section of the clickable category to check the checkbox
function switch_checkbox(checkbox){
    if(document.getElementById(checkbox).checked){
        document.getElementById(checkbox).checked = false;
    }
    else{
        document.getElementById(checkbox).checked = true;
    }
    populate_checkbox(document.getElementById(checkbox).value);
}



// If it is checked, populate the selected ingredients at the checkbox, or remove when it is unchecked.
// item_ingredient, item_intolerance, item_cuisine
function populate_checkbox(selected_item){
    console.log(selected_item)
    item_list = selected_item.split('_');
    var item = item_list[0];
    var type = item_list[1];
    if(document.getElementById(`${selected_item}_checkbox`).checked){
        var search_tag = `
        <div class='search-tag d-inline mb-2 mr-2 p-1' id='${item}_${type}'>
            <span>${item}</span>
            <span class="x text-white" onclick="remove_tag('${item}_${type}')">x</span>
        </div>
        `;

        document.getElementById('search_tags').innerHTML += search_tag;
    }
    else{
        remove_tag(selected_item);
    }

}

//Populate radio buttons. This function is quite complicated as there are loops needed to iterate all current tags. 
//Check if radio button tag (time,calories) exist. If yes, remove that tag and append the new tag at the end of the queue.
function populate_radio(selected_item){

    var item = selected_item.split('_')[0];
    var type = selected_item.split('_')[1];
    var all_current_tags = document.getElementsByClassName('search-tag');
    var string = '';
    if(document.getElementById(`${selected_item}_radio`).checked){
        for(var current_tag of all_current_tags){
            if((current_tag.id).split('_')[1]==type){
                string += '';
            }
            else{
                var current_item = current_tag['id'].split('_')[0];
                var current_type = current_tag['id'].split('_')[1];
                string += `
                <div class='search-tag d-inline mb-2 mr-2 p-1' id='${current_item}_${current_type}'>
                    ${current_tag.innerHTML}
                </div>`;
            }
        }
        if(type == 'time'){
            var word = 'min'
        }
        else{
            var word = 'calories'
        }
        string += `
        <div class='search-tag d-inline mb-2 mr-2 p-1' id='${item}_${type}'>
            <span>${item} ${word}</span>
            <span class="x text-white" onclick="remove_tag('${item}_${type}')">x</span>
        </div>`;
        document.getElementById('search_tags').innerHTML = string;
    }
    else{
        remove_tag(selected_item)
    }


}


// Retrieve value from search box
function populate_searchbox(){
    // Remember to validate the input!!!

    var selected_recipe = document.getElementById('query_input').value
    var search_tag = `
        <div class='search-tag d-inline mb-2 mr-2 p-1' id='${selected_recipe}_query'>
            <span>Name: ${selected_recipe}</span>
            <span class="x text-white" onclick="remove_tag('${selected_recipe}_query')">x</span>
        </div>
    `;
    document.getElementById('query_input').value = '';
    document.getElementById('search_tags').innerHTML += search_tag;
}



// Remove selected tag
function remove_tag(selected_tag){
    document.getElementById(selected_tag).remove();
    var splitted_tag = selected_tag.split('_');
    var tag_name = splitted_tag[0];
    var tag_type = splitted_tag[1];
    console.log(tag_name)
    if(tag_type == 'calories' || tag_type=='time'){
        var uncheck_ele = `${tag_name}_${tag_type}_radio`;
    }
    else{
        var uncheck_ele = `${tag_name}_${tag_type}_checkbox`;
    }
    document.getElementById(uncheck_ele).checked= false;
}

// Remove all selected ingredient tags
// function remove_all_tags(){
//     document.getElementById('search_tags').innerHTML = '';
// }



// Retrieve the API call and populate the cards in index.html
//getIngredients,youtubeLink,getSummary,getDetail
function actionFunction(xml,functionName){
    if (functionName=="getRecipe"){
        var parseJSON = JSON.parse(xml.responseText);
        console.log(parseJSON)
        document.getElementById('card-columns').innerHTML='';
        var base='';
        var recipe;
        var info = parseJSON.results;
        // console.log(info)
        var temporary_storage = JSON.parse(sessionStorage.getItem("recipe_storage"));
        // console.log(temporary_storage)
        if((temporary_storage.query.length>1 || temporary_storage.diet.length>1 || 
        temporary_storage.intolerance.length>1 || temporary_storage.cuisine.length>1 || temporary_storage.time.length>1 || temporary_storage.mincalories.length>1 || temporary_storage.mincalories.length>1)
        && info.length==0){
            no_result_page()
        }
        else{
            document.getElementById('error-msg').innerHTML = '';
        }

        for(recipe of info){
            var card= `
                <div class="card col" style=" background-color: white" onclick="recipeSet(${recipe.id});window.open('recipe.html', '_blank');">
                    <img class="card-img-top " src="${recipe.image}" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title d-flex justify-content-center border border-dark p-1">${recipe.title}</h5>
                
                            <div class= "d-flex justify-content-center">
                                <div class="card-text" style="display: inline;margin-right: 10px;">${recipe.readyInMinutes} min</div>
                                <i class="fas fa-stopwatch" style="display: inline;"></i>
                            </div>
                    
                            <div class= "d-flex justify-content-center">
                                <div class="card-text" style="display: inline; margin-right: 10px;">${recipe.spoonacularScore} / 100</div>
                                <i class="fas fa-star" style="display: inline;"></i>
                            </div>
                        </div>
                </div>
            `;
            base+=card;
            document.getElementById('card-columns').innerHTML=base;
        }
    }

    else if (functionName=="youtubeLink"){
        var parseJSON = JSON.parse(xml.responseText);
        var videos='';
        var item;
        
        for (item of parseJSON.items){
            videos+=
            `<div  style = "background-color:white"onclick='window.open("https://www.youtube.com/watch?v=${item.id.videoId}", "_blank")'>
            <img src="${item.snippet.thumbnails.high.url}" class="img-fluid" alt="">
            ${item.snippet.title}
          </div>`
        } 

        document.getElementById('recipeVideo').innerHTML=videos;

    }

    else if (functionName=="getRandom"){
        var parseJSON = JSON.parse(xml.responseText);
        let old=document.getElementById("carousellocation").innerHTML;
        document.getElementById("carousellocation").innerHTML=old +
        `
        <div class="carousel-item active">
        <img class="d-block w-100" src="${parseJSON.recipes[0].image}" onClick="recipeSet(${parseJSON.recipes[0].id})">
        <div class="carousel-caption d-none d-md-block">
        <h3 style = "border-style:solid; border-color:black; background-color:pink; color: black; font-family: 'Itim', cursive;" >${parseJSON.recipes[0].title}</h3>
        </div>
        </div>`;
    }

    else if (functionName=="getSummary"){
        var parseJSON = JSON.parse(xml.responseText);
    }

    else if (functionName=="getDetail"){
        var parseJSON = JSON.parse(xml.responseText);
        document.getElementById("recipeImage").setAttribute("src",parseJSON.image);
        document.getElementById("recipeTitle").innerText= parseJSON.title;

        let dietpill="";
        let diets=parseJSON.diets;
        let diet;
        for (diet of diets){
            dietpill+=`<span class="badge badge-pill badge-info">${diet}</span>`;
        };
        document.getElementById("recipeDiet").innerHTML=dietpill;

        document.getElementById("recipeSummary").innerHTML= parseJSON.summary;
        var img_human = '';
        var num_of_servings = parseJSON.servings;
        var clock_pic = `<i class="fas fa-stopwatch" style="display: inline;"></i>`;

        for(var i=0; i<num_of_servings; i++){
            img_human += `
            <img src='images/peopleicon.png' width='30' height='20'>`;
        }
        // console.log(img_human)
        document.getElementById("recipeServing").innerHTML= `Serves ${num_of_servings} adults ${img_human}<br>Cooks in ${parseJSON.readyInMinutes} minutes ${clock_pic} </br>`;

        var nutritionBox={};
        for (var x of Object.entries(parseJSON.nutrition.nutrients)){
            var amount =  x[1].amount
            var unit = x[1].unit
            nutritionBox[x[1].title]= {units: amount + unit , percent: x[1].percentOfDailyNeeds};
        }

        document.getElementById("nutriunit").innerHTML=`
        <td>${nutritionBox.Calories.units}</td>
        <td>${nutritionBox.Fat.units}</td>
        <td>${nutritionBox.Sugar.units}</td>
        <td>${nutritionBox.Sodium.units}</td>
        <td>${nutritionBox.Protein.units}</td>
        <td>${nutritionBox.Carbohydrates.units}</td>`;

        document.getElementById("nutripercent").innerHTML=`
        <td>${nutritionBox.Calories.percent}</td>
        <td>${nutritionBox.Fat.percent}</td>
        <td>${nutritionBox.Sugar.percent}</td>
        <td>${nutritionBox.Sodium.percent}</td>
        <td>${nutritionBox.Protein.percent}</td>
        <td>${nutritionBox.Carbohydrates.percent}</td>`;
        

        let ingredient;
        let ingredientList="";
        for (ingredient of parseJSON.extendedIngredients){
            ingredientList+=`<li>${ingredient.name}: ${ingredient.amount} ${ingredient.unit}</li>`;
        };

        document.getElementById("recipeIngredients").innerHTML=ingredientList;

        let instruction;
        let instructions="";
        for (instruction of parseJSON.analyzedInstructions[0].steps){
            instructions+=`<li>${instruction.step}</li>`;
        };
        
        document.getElementById("recipeInstructions").innerHTML=instructions;

        let youtubetitle='';
        var charset=/^[a-zA-Z ]+$/;
        for (var i = 0; i < parseJSON.title.length; i++) {

            if ((/^[a-zA-Z ]+$/).test(parseJSON.title[i])){
                youtubetitle=youtubetitle+parseJSON.title[i];
            };
            }
        console.log(youtubetitle);
        call_api(youtubetitle,"youtubeLink");

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
    var temporary_storage = JSON.parse(sessionStorage.getItem("recipe_storage"));
    var temp_array = temporary_storage.order;
    console.log(temporary_storage)
    var removed_tag = temp_array.pop();
    // console.log(removed_tag)
    document.getElementById('error-msg').innerHTML = '';
    remove_tag(removed_tag);
    var temporary_storage = {
        query: '',
        diet:[],
        intolerance:[],
        cuisine:[],
        time:[],
        mincalories:[],
        maxcalories:[],
        order: []
    };
    for(var current_tag of temp_array){
        var splitted_tag = current_tag.split('_');
        var tag_name = splitted_tag[0];
        var tag_type = splitted_tag[1];
        if(tag_type=='query'){
            temporary_storage[tag_type] = tag_name
        }
        else{
            temporary_storage[tag_type].push(tag_name);
        }
    }
    console.log(temporary_storage)
    //Then call the api again with the existing stack
    sessionStorage.setItem("recipe_storage",JSON.stringify(temporary_storage));
    call_api(temporary_storage,"getRecipe");
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
        query: '',
        diet:[],
        intolerance:[],
        cuisine:[],
        time:[],
        mincalories:[],
        maxcalories:[],
        order: []
    }
    var temporary_storage = JSON.parse(sessionStorage.getItem("recipe_storage"));
    temporary_storage = {
        query: '',
        diet:[],
        intolerance:[],
        cuisine:[],
        time:[],
        mincalories:[],
        maxcalories:[],
        order: []
    };

    for(tag_node of tag_nodes){
        var splitted_tag = tag_node.id.split('_');
        var tag_name = splitted_tag[0];
        var tag_type = splitted_tag[1];
        //Push into temporary storage to simulate stack operation later on
        if(tag_type=='query'){
            all_current_tags[tag_type] = tag_name
            temporary_storage[tag_type] = tag_name;
            temporary_storage['order'].push(tag_name+'_'+tag_type)
        }
        else if(tag_type=='calories'){
            var splitted_calories = tag_name.split(' - ');
            var min_calories = splitted_calories[0];
            var max_calories = splitted_calories[1];
            all_current_tags['mincalories'].push(min_calories);
            all_current_tags['maxcalories'].push(max_calories);
            temporary_storage['mincalories'].push(min_calories);
            temporary_storage['maxcalories'].push(max_calories);
            temporary_storage['order'].push(tag_name+'_'+tag_type);
        }

        else{
            all_current_tags[tag_type].push(tag_name);
            temporary_storage[tag_type].push(tag_name);
            temporary_storage['order'].push(tag_name+'_'+tag_type);
        }


    }
    console.log(temporary_storage)
    sessionStorage.setItem("recipe_storage", JSON.stringify(temporary_storage));
    // console.log(all_current_tags)


    //If there is no return, clear the card columns
    if(all_current_tags.query.length==0 && all_current_tags.diet.length==0 && all_current_tags.intolerance.length==0 && all_current_tags.cuisine.length==0 && all_current_tags.time.length==0 && all_current_tags.mincalories.length==0 && all_current_tags.maxcalories.length==0){
        // console.log('No recipes atm');
        document.getElementById("card-columns").innerHTML='';
    }
    
    else{
        call_api(all_current_tags,'getRecipe');
    }

};
    // Create an observer instance linked to the callback function
const observer = new MutationObserver(current_tag_nodes);
    // Start observing the target node for configured mutations
observer.observe(targetNode, config);
//[END] Using mutation observer to gather all the ingredients and send to spoontaculous API

//add recipeID to session memory to be later retrieved on new page
//takes in recipe id from API, set key to recipeID, value to recipe id 
function recipeSet(id){
    sessionStorage.setItem("recipeID", id);
    window.open("recipe.html", "_blank");
};


//Populate carousel
function populate_carousel(){
    let recipe;
    let carouselcontent=document.getElementById("carousellocation").innerHTML;

    for (recipe of carouseldata){
        carouselcontent=carouselcontent+
        `<div class="carousel-item">
        <img class="d-block w-100" src="${recipe.image}" onclick="recipeSet(${recipe.id})">
        <div class="carousel-caption d-none d-md-block">
          <h3 style = "border-style:solid; border-color:black;background-color:pink; color: black; font-family:itim', cursive;" >${recipe.title}</h3>
        </div>
      </div>`;
    }
    document.getElementById("carousellocation").innerHTML=carouselcontent;
}

