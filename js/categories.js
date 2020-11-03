
const categories = {
    dairylist : ["butter","cheese","cream","milk","yogurt"],
    meatlist : ["beef","chicken","duck","mutton","lamb","pork","sausage","turkey","venison"],
    veglist : ["broccoli","cabbage","capsicum","carrot","celery","garlic","kale","lettuce","mushroom","onion","potato","spinach"],
    seafoodlist : ["catfish","clam","cod","crab","lobster","salmon","scallop","shrimp","tuna"],
    grainlist : ["barley","bread","oat","pasta","rice","wheat"],
    fruitlist : ["apple","banana","blueberry","coconut","date","fig","grape","lemon","mango","orange","peach","pineapple","strawberry","tomato"]
}

function populate_categories(value){
    var string = `
    `;
    for(var ingredient in categories.value){
        // pls include checkboxes for this dropdown too
        string += `
        <a class="dropdown-item" href="#">${ingredient}</a>
        `;
    }
    document.getElementById(value).innerHTML = ``;
}