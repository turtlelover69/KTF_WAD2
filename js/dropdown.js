// use twitter typeahead

var ingredient_suggestion = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.whitespace,
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  // url points to a json file that contains an array of country names, see
  prefetch: 'JSON/ingredients.json'
});

// passing in `null` for the `options` arguments will result in the default
// options being used
$('#search_box .typeahead').typeahead(null, {
  name: 'ingredient_suggestion',
  source: ingredient_suggestion
});