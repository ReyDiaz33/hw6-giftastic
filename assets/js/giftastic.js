$(document).ready(function () {

// made my global variables
  var apiKey = "BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
  var apiUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey;
  var videoGameCharacters = ["mario", "luigi", "donkeyKong", "peach", "yoshi", "link", "zelda", "pikachu", "samus", "bowser", "koopa"];
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

    $.ajax({
      url: apiUrl + queryString,
      method: "GET"
    }).then(function (response) {

         $('#gifImage').empty();

        response.data.map(function(gif) {

          var img = $("<img>");
          img.addClass('gif');
          img.attr("src", gif.images.original_still.url);

          img.attr("data-animate", gif.images.original.url); 
          img.attr("data-still", gif.images.original_still.url);
          img.attr("data-state", "still");
          
          // on click function that selects the still image and the original gif.
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
          
          $('#gifImage').append(img);

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