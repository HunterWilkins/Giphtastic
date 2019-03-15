var topics = ["opossums", "guinea pigs", "mini horses"];

var timesRun = 0;

function makeButtons(){
    $(".button-group").empty();
    for (var i = 0; i < topics.length; i++){
    
        $(".button-group").append($("<button class = 'gif-button' data-animal = '" + topics[i] +"'>" + topics[i] + "</buttons>"));
    }
}


$(".button-group").on("click", "button", function(){

    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+animal+"&api_key=YIavb9bynILqpMILAhXZTAtgvZlrHfoZ&limit=10";
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        
        for (var i = 0; i < response.data.length; i++){

            //inserting the _s into the image url. There's probably a better way to do it.
            //============================================================================
            var imageURL = response.data[i].images.fixed_height.url;
            
            var arrayify = imageURL.split(".");
            arrayify[2]+"_s";

            var transitionArray = [];

            transitionArray.push(arrayify[0], arrayify[1], arrayify[2] + "_s", arrayify[3]);
            var newString = transitionArray.join();
            var newURL = newString.replace(/,/g, ".");
            //========================================================
            
            $(".results").prepend($("<img src = '" + newURL + "' class = 'gif' data-animate = '" + imageURL + "' data-still = '" + newURL + "' data-state = 'still'><hr>"));
            $(".results").prepend($("<p>Rated: " + response.data[i].rating.toUpperCase() + "</p>"));
        }
        $(".results").prepend($("<p>Note: .gifs might not actually be of " + animal + ", but, rather, of some crappy TV show that tangentially mentions " + animal + ".</p>"));
        $(".results").prepend($("<h3>Gifs of " + animal + ". Click on the .gifs to pause and resume them.</h1>"));

    });

    $(".results").on("click", ".gif", function(){
        var state = $(this).attr("data-state");
        
        console.log("gif has been clicked");
        if (state === "still"){
            $(this).attr("src",$(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            
            $(this).css("border", "rgb(182, 204, 255) solid 2px");
            $(this).css("box-shadow", "0 0 10px ");
            $(this).css("opacity", "1");
            
            console.log("This gif now has a data state of " + $(this).attr("data-state"));
        }
        else  if (state === "animate") {
            $(this).attr("src",$(this).attr("data-still"));
            $(this).attr("data-state", "still");

            $(this).css("box-shadow", "none");
            $(this).css("border", "none");
            $(this).css("opacity", ".5");

            console.log("This gif now has a data state of " +$(this).attr("data-state"));
        }
        timesRun++;
        console.log("This has activated: " + timesRun + " times ==============");

    })
});

$("#submit").on("click", function(){
    event.preventDefault();

    var animalInput = $("#new-animal").val();
    topics.push(animalInput);
    makeButtons();
})

makeButtons();
