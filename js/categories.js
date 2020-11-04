const categories = {
    dairylist : ["butter","cheese","cream","milk","yogurt"],
    meatlist : ["beef","chicken","duck","mutton","lamb","pork","sausage","turkey","venison"],
    veglist : ["broccoli","cabbage","capsicum","carrot","celery","garlic","kale","lettuce","mushroom","onion","potato","spinach"],
    seafoodlist : ["catfish","clam","cod","crab","lobster","salmon","scallop","shrimp","tuna"],
    grainlist : ["barley","bread","oat","pasta","rice","wheat"],
    fruitlist : ["apple","banana","blueberry","coconut","date","fig","grape","lemon","mango","orange","peach","pineapple","strawberry","tomato"]
}


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
                    <input type="checkbox" id= "${ingredient}_checkbox">
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

function test(){
    console.log("aaa")
}