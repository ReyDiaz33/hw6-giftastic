$(document).ready(function () {

// made my global variables
  var apiKey = "BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
  var apiUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey;
  var videoGameCharacters = ["mario", "luigi", "donkeyKong", "peach", "yoshi", "link", "zelda", "pikachu", "samus", "bowser", "koopa"];
// function that will build buttons 
  function buildButtons() {

    $("#buttons-view").empty();   

    for (var i = 0; i < videoGameCharacters.length; i++) {
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
    
    // Even though it is not likely that no query will be enterd (ie. someone creates a blank button), it is good 
    // to guard against that type of behavior should something sneak by. Ideally, if the query string was blank you 
    // should not allow the code to continue. This is known as validation. 
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

/*
  $(".gif").on("click", function() {

      console.info('clicked', this);
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state") || still;
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
*/

  buildButtons();

});