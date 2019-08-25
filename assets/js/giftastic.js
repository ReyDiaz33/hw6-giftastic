$(document).ready(function () {

  console.log("Page has fully loaded!");

  // Putting these "global" variables up here so that they are accessible from every function. 
  var apiKey = "BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
  var apiUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey;

  var videoGameCharacters = ["mario", "luigi", "donkeyKong", "peach", "yoshi", "link", "zelda", "pikachu", "samus", "bowser", "koopa"];

  function buildButtons() {

    // Empty out the buttons container. 
    $("#buttons-view").empty();   

    // for loop that goes through array of preset game characters
    for (var i = 0; i < videoGameCharacters.length; i++) {
      // new variable turning array objects into buttons
      var b = $("<button>");
      b.addClass("selectCharacter");   // I changed this class to selectCharacter to allow for broad class targeting using jQuery. See the $(".selectCharacter").on("click") below. 
      b.attr("data-name", videoGameCharacters[i]);
      b.text(videoGameCharacters[i]);

      /*
        Since we always use this function to load the buttons, we can register the event listener here when building the DOM element (b). jQuery is a little strange with 
        it's event listeners, so this helps us avoid having to use any type of jQuery class selector and possibly run into issues.  
      */
      b.on("click", function (event) {

        event.preventDefault();

        selectCharacter(event.target.dataset.name);

      });


      $("#buttons-view").append(b);
    }
  }


  /**
    We are going to pass in a string here for the character. We will then make a call to the api, and render the correct list of gifs on the page. 
    This will be called each time a button is clicked. 
  
  **/
  function selectCharacter(character) {
    console.info(character);

    // Even though it is not likely that no query will be enterd (ie. someone creates a blank button), it is good 
    // to guard against that type of behavior should something sneak by. Ideally, if the query string was blank you 
    // should not allow the code to continue. This is known as validation. 
    var queryString = '&q=' + character || null;

    $.ajax({
      url: apiUrl + queryString,
      method: "GET"
    }).then(function (response) {
      console.info(response.data);
      return response.data;

    });

  }


  /**
    Click Events
  **/

  /**
      Handles user input by taking the input, adding it to the videoGameCharacters array, and callinb buildButtons() to repopulate the buttons. 
  **/
  $("#userGif").on("click", function (event) {
    event.preventDefault();

    var newGif = $("#gif-input").val();

    videoGameCharacters.push(newGif);

    buildButtons();

  });


  // This is where we can make the calls that initialize the page.
  buildButtons();




});