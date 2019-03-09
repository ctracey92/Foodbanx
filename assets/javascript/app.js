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

var searchTerm;
var foodResponse;

$("#submitBttn").on("click", function(event) {
  event.preventDefault();
  $("<h1>TEST</h1>").append("#card-box");

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

    for (var i = 0; i < 4; i++) {
      // Create card div
      var newCard = $("<div>");
      // Assign class of card
      newCard.addClass("card");
      // Create image div
      var newImgDiv = $("<div>");
      newImgDiv.addClass("image");
      // Create img
      var newImg = $("<img>");
      // Place img in it's div
      newImgDiv.append(newImg);
      // Create content div
      var contentDiv = $("<div>");
      contentDiv.addClass("content");
      // Create header
      var headerDiv = $("<div>");
      headerDiv.addClass("header");
      // Create meta div
      var metaDiv = $("<div>");
      metaDiv.addClass("meta");
      $(newCard).prepend(newImgDiv);
      $(newCard).append(headerDiv);
      $(newCard).append(metaDiv);
      $("#card-box").append(newCard);
    }
  });
});

// var beerUrl = "http://api.brewerydb.com/v2//beer/random/?key=b77b0aed77b08ea4a53b9e27b3103a48";
