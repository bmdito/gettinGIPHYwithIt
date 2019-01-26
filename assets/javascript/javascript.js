

var animalArray = ["cat", "dog", "hamster", "horse"];

$(document).ready(function(){
    console.log("ready!");
    console.log(animalArray[1]);

// creates buttons for all animals in Animals array
    function renderButtons () {

        $("#buttonSection").empty();
        $("#animal-input").val("");

        for(var i = 0; i<animalArray.length; i++) {
            var newButt = $("<button>");
            newButt.addClass("animalButt");
            
            var animalButt = newButt.text(animalArray[i]).attr("data-name", animalArray[i]);
            $("#buttonSection").append(animalButt);
            
        }
    }
    renderButtons();

    // displays the 10 gifs for whatever animal is clicked
    function displayGifs(){

        $("#imgArea").empty();
        var theAnimal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + theAnimal + "&api_key=0ajdovi4XsCficMr7nSecx8IFqZBcne9&limit=10";
        
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            var results = response.data;
            
            for(var i =0; i<results.length; i++){

                var gifDiv = $("<div>");
                gifDiv.addClass("gif-box");
                var ratingStuff = results[i].rating;
                var newImg = $("<img>");
                newImg.attr("src", results[i].images.fixed_height_still.url);
                newImg.addClass("imgStyle");
                newImg.addClass("gif");
                newImg.attr("state", "still");
                newImg.attr("data-still", results[i].images.fixed_height_still.url);
                newImg.attr("data-animate", results[i].images.fixed_height.url);
                newImg.attr("rating", results[i].rating);
               

                gifDiv.append(newImg);
                gifDiv.append("<p class='ratingStyle'>"+"Rating: "+ratingStuff+"</p>");
                
                $("#imgArea").prepend(gifDiv);
                
              
                
            }

            // on click function to start and stop GIF's
            
            $(".gif").on("click", function(){
                
                if($(this).attr("state")==="still"){
                    $(this).attr("state", "animating");
                    $(this).attr("src", $(this).attr("data-animate"));
                } else
                if($(this).attr("state")==="animating"){
                    $(this).attr("state", "still");
                    $(this).attr("src", $(this).attr("data-still"));

                }

                console.log("you clicked!");
            });

        
        });


        
    };

    
   
    

    

    // adds button when a new animal is added through text form/"lets go" submit button

    $("#add-animal").on("click", function(event){

        event.preventDefault();

        var newAnimal = $("#animal-input").val().trim();
        if(!animalArray.includes(newAnimal)){

            
            animalArray.push(newAnimal);
            console.log(animalArray);
            renderButtons();
            
        }
    });

    $(document).on("click", ".animalButt", displayGifs);

});

