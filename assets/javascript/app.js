// Initialize Firebase
var config = {
  apiKey: "AIzaSyAuT5dcM5ONqs-s91Q7WoDPh251EGdAxGU",
  authDomain: "project1-25f92.firebaseapp.com",
  databaseURL: "https://project1-25f92.firebaseio.com",
  projectId: "project1-25f92",
  storageBucket: "project1-25f92.appspot.com",
  messagingSenderId: "289958381373"
};
firebase.initializeApp(config);

console.log("it works");

//https://developer.edamam.com/edamam-docs-recipe-api
//APP ID = 6025a697
//APP Key = 11d67226f6f5e59a6706570b9578fece

//https://sandbox-api.brewerydb.com/v2/ API key b77b0aed77b08ea4a53b9e27b3103a48


// Global Variables
var searchTerm;
var database = firebase.database();
var foodResponse;
var beerResponse;
var beerUrl = "http://api.brewerydb.com/v2//beer/random/?key=b77b0aed77b08ea4a53b9e27b3103a48";



$("#signIn").on("click", function (event) {
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
    // ...
  });
});

$("#signUp").on("click", function (event) {
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
    // ...
  });
});


var title;
var ingredients;
var link;

function cloneFromFirebase(title, ingredients, link, image, key) {
  // Create card div
  var clone = $("<div>");
  // Assign class of card
  clone.addClass("card").attr("data-link", link);
  // Create image div
  var cloneImgDiv = $("<div>");
  cloneImgDiv.addClass("image");
  // Create img
  var cloneImg = $("<img>");
  cloneImg.attr("src", image);
  // Place img in it's div
  cloneImgDiv.append(cloneImg);

  // Create content div
  var cloneContent = $("<div>");
  cloneContent.addClass("content");

  // Create header
  var cloneHeaderDiv = $("<div>");
  cloneHeaderDiv.addClass("header");
  cloneHeaderDiv.text(title);
  cloneContent.append(cloneHeaderDiv);

  // Extra Content Div
  var cloneExtraContent = $("<div>");
  cloneExtraContent.addClass("extra content");

  // Button Div
  var cloneButtonDiv = $("<div>");
  cloneButtonDiv.addClass("ui two buttons");

  // Link to recipe
  var linkDiv = $("<div>");
  linkDiv.addClass("ui basic green button");
  var linkTag = $("<a>");
  linkTag.attr("href", link);
  linkTag.attr("target", "_blank");
  linkTag.text("Go to recipe");
  linkDiv.append(linkTag);

  // Create Delete Btn
  var deleteBtn = $("<div>");
  deleteBtn.attr("dataKey", "snapshot.key");
  deleteBtn.attr("id", "delete")

  deleteBtn.addClass("ui basic red button");
  deleteBtn.text("Delete");
  deleteBtn.attr("data-key", key);
  cloneButtonDiv.append(linkDiv, deleteBtn);
  cloneExtraContent.append(cloneButtonDiv);

  // Append elements to clone
  $(clone).append(cloneImgDiv);
  $(clone).append(cloneContent);
  $(clone).append(cloneExtraContent);

  $(".recipe-row").append(clone);

  console.log(ingredients, "working");

  //For loop to print out each ingredient
  for (var i = 0; i < ingredients.length; i++) {

    //Creates a variable list item
    var ingredientLi = ingredients[i];

    console.log(ingredientLi, "working");
    var listItem = $("<li>");
    listItem.addClass(key)
    //Sets the text of the list item to the ingredient 
    listItem.text(ingredientLi);

    //Appends the variable to the div
    $("#ingredientsDiv").append(listItem);
  }

}

//On click of delete btn remove the piece from firebase and the DOM
$(document).on("click", "#delete", function () {
  var keyId = ($(this).attr("data-key"));
  firebase.database().ref().child(keyId).remove();
  console.log("working");
  $(this).parents(".card").remove();
  $('li.' + keyId).remove();
  //console.log("working");

})

//On delete of child run function
database.ref().on("child_removed", function (snapshot) {


}), function (errorObject) {
  console.log("error")
}


//When a child is added run the following funciton
database.ref().on("child_added", function (snapshot) {

  //Assign the snapshot pieces to variables
  title = snapshot.val().title;
  ingredients = snapshot.val().ingredients;
  link = snapshot.val().link;
  image = snapshot.val().image;
  key = snapshot.key;

  console.log(link);

  cloneFromFirebase(title, ingredients, link, image, key);


}), function (errorObject) {
  console.log("error")
}





// Submit serach term
$("#submitBttn").on("click", function (event) {
  event.preventDefault();

  $("#card-box").empty();

  searchTerm = $("#foodInput")
    .val()
    .trim();
  console.log(searchTerm);
  var foodUrl =
    "https://api.edamam.com/search?q=" +
    searchTerm +
    "&app_id=6025a697&app_key=11d67226f6f5e59a6706570b9578fece";
  var proxyURL = "https://cors-anywhere.herokuapp.com/";
  console.log(foodUrl);
  $.ajax({
    // url: proxyURL + foodUrl,
    url: foodUrl,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    $.ajax({
      url: proxyURL + beerUrl,
      method: "GET"
    })
      .then(function (resp) {
        console.log(resp)
        var beerResponse = resp.data;

        var beerStyle = beerResponse.style.name;
        var beerDescription = beerResponse.style.description;

        function beer() {
          var beerDiv = $("<div>");
          var bStyle = $("<p>");
          bStyle.text(beerStyle);

          var bDescription = $("<p>");
          bDescription.text(beerDescription);

          $(beerDiv).append(bStyle, bDescription);
          $("#testingBeerDiv").append(beerDiv)
        }
        beer();
      })




    for (var i = 0; i < 9; i++) {

      //Response Variables
      var spacer = "&#124;" + "&nbsp";
      var results = response.hits;
      var imgSrc = results[i].recipe.image;
      var portion = results[i].recipe.yield;
      var recipeTitle = results[i].recipe.label;
      var recipeLink = results[i].recipe.url;
      var prepTime = results[i].recipe.totalTime;
      var ingredients = results[i].recipe.ingredientLines;
      // Create card div
      var newCard = $("<div>");
      // Assign class of card
      newCard.addClass("card").attr("data-link", recipeLink);
      // Create image div
      var newImgDiv = $("<div>");
      newImgDiv.addClass("image");
      // Create img
      var newImg = $("<img>");
      newImg.attr("src", imgSrc);
      // Place img in it's div
      newImgDiv.append(newImg);

      // Create content div
      var contentDiv = $("<div>");
      contentDiv.addClass("content");

      // Create header
      var headerDiv = $("<div>");
      headerDiv.addClass("header");
      headerDiv.text(recipeTitle);

      // Create meta div
      var metaDiv = $("<div>");
      metaDiv.addClass("meta");
      var prepText = $("<a>");
      prepText.text("Total Time: " + prepTime);
      var portionSize = $("<a>");
      portionSize.text("Portions: " + portion);
      metaDiv.append(prepText, spacer, portionSize);

      // Create ingredients div
      var ingredientsList = $("<div>");
      ingredientsList.addClass("description");
      ingredientsList.text("Ingredients: " + ingredients);

      // Append all content data into content div
      $(contentDiv).append(headerDiv, metaDiv, ingredientsList);



      // Button Div
      var extraContent = $("<div>");
      extraContent.addClass("extra content");

      // Link to recipe
      var link = $("<a>");
      link.attr("href", recipeLink);
      link.attr("target", "_blank")
      link.text("Go to recipe");

      // Create spans
      var btnSpanLeft = $("<span>");
      btnSpanLeft.addClass("left floated");
      var btnSpanRight = $("<span>");
      btnSpanRight.addClass("right floated");

      // Create buttons
      var buttonLeft = $("<button>");
      var buttonRight = $("<button>");
      buttonRight.addClass("ui primary button btn-right");
      buttonLeft.addClass("ui primary button btn-left");
      buttonLeft.data("recipeObj", results[i]);

      // Button Data
      buttonRight.append(link);
      buttonLeft.text("Add to week");

      // Append buttons to spans
      btnSpanLeft.append(buttonLeft);
      btnSpanRight.append(buttonRight);

      // Append spans to extra content
      $(extraContent).append(btnSpanLeft, btnSpanRight);



      $(newCard).append(contentDiv);
      $(newCard).prepend(newImgDiv);
      $(newCard).append(extraContent);
      $("#card-box").append(newCard);
    }
  });
  $("#foodInput").val("");
});


function dataToFirebase(title, ingredients, link, image) {
  title = obj.recipeObj.recipe.label;
  ingredients = obj.recipeObj.recipe.ingredientLines;
  link = obj.recipeObj.recipe.url;
  image = obj.recipeObj.recipe.image;

  console.log(title);
  console.log(ingredients);
  console.log(link);
  console.log(image);

  database.ref().push({
    title: title,
    ingredients: ingredients,
    link: link,
    image: image
  });


}





// Save selected cards to next box
$(document).on("click", ".btn-left", function () {
  // -----------------------
  // DOM PUSH
  // console.log("clicked");

  // var clone = $(this).parents(".card").clone();
  // clone.remove(".ui.primary.button.btn-left");
  // $(".recipe-row").append(clone);
  // -----------------------

  obj = $(this).data();

  dataToFirebase();


});





