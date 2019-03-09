console.log("it works");

//https://developer.edamam.com/edamam-docs-recipe-api 
//APP ID = 6025a697
//APP Key = 11d67226f6f5e59a6706570b9578fece

//https://sandbox-api.brewerydb.com/v2/ API key b77b0aed77b08ea4a53b9e27b3103a48


var searchTerm;
var foodResponse;

$("#submitBttn").on("click", function(event){

    event.preventDefault();
    searchTerm = $("#foodInput").val().trim();
    console.log(searchTerm); 
    var foodUrl = "https://api.edamam.com/search?q=" + searchTerm + "&app_id=6025a697&app_key=11d67226f6f5e59a6706570b9578fece";
    var proxyURL = "https://cors-anywhere.herokuapp.com/"
    console.log( foodUrl);
    $.ajax({
        url:  foodUrl,
        method: "GET",
    })
    .then(function(response){
        console.log(response);
    });
    
})





// var beerUrl = "http://api.brewerydb.com/v2//beer/random/?key=b77b0aed77b08ea4a53b9e27b3103a48";





