console.log("Hello World");

var animalArray = ["cat", "dog", "hamster", "horse"];

$(document).ready(function(){
    console.log("ready!");
    console.log(animalArray[1]);

// creates buttons for animals
    function renderButtons () {

        $("#buttonSection").empty();

        for(var i = 0; i<animalArray.length; i++) {
            var newButt = $("<button>");
            newButt.addClass("animalButt");
            
            var animalButt = newButt.text(animalArray[i]);
            $("#buttonSection").append(animalButt);
        }
    }
    renderButtons();

    function displayGifs() {

        
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=0ajdovi4XsCficMr7nSecx8IFqZBcne9&q=cow&limit=10&offset=0&rating=G&lang=en"
         

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){

            // var imageUrl = data[0].url;

            // var newImg = $("<img>");
            // var animImg = newImg.attr("src", imageUrl);

            // $(".imgDiv").append(animImg);

            console.log(response);

        });

        
    }
    displayGifs();


    // onclick event for clicking animal button
    $(".animalButt").on("click", function(){


    });

    $("#add-animal").on("click", function(event){

        event.preventDefault();

        var newAnimal = $("#animal-input").val().trim();
        animalArray.push(newAnimal);
        console.log(animalArray);
        renderButtons();

    });

});

