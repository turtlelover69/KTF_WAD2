function passrecipe(){
    var recipe = document.getElementById("recipeID").value;
    const xhr = new XMLHttpRequest();
    xhr.onload = function(){
        console.log(recipe + "Succesful")

    }
    xhr.open('POST','dashboard/recipeToSQL.php')
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send("recipe=" + recipe);
}