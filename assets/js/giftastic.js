

$(document).ready(function () {
    console.log("START!");
});

var videoGameCharacters = ["mario", "luigi", "donkeyKong", "peach", "yoshi", "link", "zelda", "pikachu", "samus", "bowser", "koopa"]

function addVideoGameCharacter(){
  $("buttons-view").empty();

  // for loop that goes through array of preset game characters
  for(var i = 0; i < videoGameCharacters.length; i++){
    // new variable turning array objects into buttons
    var b = $("<button>");
    b.addClass("newGif");
    b.attr("data-name", videoGameCharacters[i]);
    b.text(videoGameCharacters[i]);
    $("#buttons-view").prepend(a);
  }
}
// on click event that pushes users input into the array creating a new gif button
$("#userGif").on("click", function (event) {
  event.preventDefault();
  var newGif = $("#gif-input").val();
  videoGameCharacters.push(newGif);
  addNewGif();
});
// calling the function to work 
addNewGif();

// Creating a function that allows the gifs to be appear by piecing the API URL with the new search by user
function gifsAppear(){
  var api = "BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10"
  var newGif = $(this).attr("data-name");
  console.log(newGif);
  var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + newGif + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
  $("#gifImage").empty();

  
}