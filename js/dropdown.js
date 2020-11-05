// use twitter typeahead

// function extractFromJson(){
//     "use strict"

//     var myInit = {
//         method: 'GET',
//         headers: {
//             'Content-Type':'application/json'
//         },
//         mode: 'cors',
//         cache: 'default' 
//     };

//     let myRequest = new Request('JSON/ingredients.json',myInit)

//     fetch('JSON/ingredients.json')
//         .then(function(resp){
//             return resp.json();
//         })
//         .then(function(data){
//             console.log(data)
//         });
// }

// extractFromJson()

var countries = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.whitespace,
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  // url points to a json file that contains an array of country names, see
  // https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json
  prefetch: 'JSON/ingredients.json'
});

// passing in `null` for the `options` arguments will result in the default
// options being used
$('#search_box .typeahead').typeahead(null, {
  name: 'countries',
  source: countries
});