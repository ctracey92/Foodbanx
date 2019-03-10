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

$("#submitBttn").on("click", function(event) {
  event.preventDefault();

  $("#foodInput").val("");

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
    url: proxyURL + foodUrl,
    method: "GET"
  }).then(function(response) {
    console.log(response);

  $.ajax({
    url: proxyURL + beerUrl,
    method: "GET"
  })
  .then(function(resp){
    console.log(resp)
    var beerResponse = resp.data;
  })
           

  
    
    for (var i = 0; i < 4; i++) {

      //Response Variables
      var spacer = "&#124;"
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
      newCard.addClass("card");
      // Create image div
      var newImgDiv = $("<div>");
      newImgDiv.addClass("image");
      // Create img
      var newImg = $("<img>");
      newImg.attr("src" , imgSrc);
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

      var ingredientsList = $("<div>");
      ingredientsList.addClass("description");
      ingredientsList.text("Ingredients: " + ingredients);

      var link = $("<a>");
      link.attr("href" , recipeLink);
      link.attr("target", "_blank")
      link.text("Click Here for Recipe");


      $(newCard).prepend(newImgDiv);
      $(newCard).append(headerDiv);
      $(newCard).append(metaDiv);
      $(newCard).append(ingredientsList);
      $(newCard).append(link);
      $("#card-box").append(newCard);
    }
  });
});

//write search to FireBase
$("#submitBttn").on("click", function(){

  event.preventDefault();
  searchTerm = $("#foodInput").val().trim();
  function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref().set({
      Search: searchTerm,
     
    });
  }
  writeUserData();
})




