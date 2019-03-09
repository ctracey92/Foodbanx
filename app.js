console.log("it works");

//TheBeerSpot.com API key 7de5276cb58f68445b979e8499975c00

//https://sandbox-api.brewerydb.com/v2/ API key b77b0aed77b08ea4a53b9e27b3103a48

var searchTerm;

$("#submitBttn").on("click", function(){

    event.preventDefault();
    searchTerm = $("#foodInput").val().trim();

    console.log(searchTerm); 
})



// var foodUrl = "http://www.recipepuppy.com/api/?q=" + searchTerm + "&p=3";

// var beerUrl = "http://api.brewerydb.com/v2//beer/random/?key=b77b0aed77b08ea4a53b9e27b3103a48";





