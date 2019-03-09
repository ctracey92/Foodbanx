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

//TheBeerSpot.com API key 7de5276cb58f68445b979e8499975c00

//https://sandbox-api.brewerydb.com/v2/ API key b77b0aed77b08ea4a53b9e27b3103a48
  

// Global Variables
var searchTerm;
var database = firebase.database();


$("#submitBttn").on("click", function(){

    event.preventDefault();
    searchTerm = $("#foodInput").val().trim();

    console.log(searchTerm); 
})

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



// var foodUrl = "http://www.recipepuppy.com/api/?q=" + searchTerm + "&p=3";

// var beerUrl = "http://api.brewerydb.com/v2//beer/random/?key=b77b0aed77b08ea4a53b9e27b3103a48";





