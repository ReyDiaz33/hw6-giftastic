$(document).ready(function () {

// made my global variables
  var apiKey = "BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
  var apiUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey;
  var videoGameCharacters = ["Mario", "Luigi", "Donkey Kong", "Peach", "Yoshi", "Link", "Zelda", "Pikachu", "Samus", "Bowser", "Koopa"];
// function that will build buttons
  function buildButtons() {

    $("#buttons-view").empty();   
// for loop that goes throught the array at the top of the js file
    for (var i = 0; i < videoGameCharacters.length; i++) {
      // variable b to make a button 
      var b = $("<button>");
      b.addClass("selectCharacter");
      b.attr("data-name", videoGameCharacters[i]);
      b.text(videoGameCharacters[i]);
      b.on("click", function (event) {
        event.preventDefault();
        selectCharacter(event.target.dataset.name);
      });
      $("#buttons-view").append(b);
    }
  }


  function selectCharacter(character) {
    
    var queryString = '&q=' + character || null;
// my ajax call to get the info needed for the gifs. 
    $.ajax({
      url: apiUrl + queryString,
      method: "GET"
    }).then(function (response) {

         $('#gifImage').empty();
        // map is the easier way of looping. 
        response.data.map(function(gif) {
          console.log(gif.rating);


          var d = $("<div>");
          d.addClass("imageContainer");

          var img = $("<img>");
          img.addClass('gif');
          img.attr("src", gif.images.original_still.url);

          img.attr("data-animate", gif.images.original.url); 
          img.attr("data-still", gif.images.original_still.url);
          img.attr("data-state", "still");
          
          // on click function that selects the still image and the original gif. click events worked in here rather than the end of the file. 
          img.on("click", function() {

            var state = $(img).attr("data-state");
            if (state === "still") { 
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
            
          });
          var rating = $("<p>");
          rating.addClass("rating");
          rating.html("Rating: " +gif.rating);

          d.append(rating).append(img);
          $('#gifImage').append(d);
          
        });
      
    });
}


  $("#userGif").on("click", function (event) {
  
    event.preventDefault();
    var newGif = $("#gif-input").val();

    videoGameCharacters.push(newGif);

    buildButtons();

  });


  buildButtons();

});