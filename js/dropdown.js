// use twitter typeahead

function extractFromJson(){
    "use strict"

    var myInit = {
        method: 'GET',
        headers: {
            'Content-Type':'application/json'
        },
        mode: 'cors',
        cache: 'default' 
    };

    let myRequest = new Request('JSON/ingredients.json',myInit)

    fetch('JSON/ingredients.json')
        .then(function(resp){
            return resp.json();
        })
        .then(function(data){
            console.log(data)
        });
}
