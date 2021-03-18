
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function() {                   //selecting the  buttonby jquery

//store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

//  console.log(userClickedPattern);

playSound(userChosenColour);
animatePress(userChosenColour);

checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);

    $("#level-title").text("HA HA HA Looser, Press any key to Restart!");

    startOver();

    }

}

function nextSequence() {

  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);        //////random number bw 0 and 3 ////////
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);                ////// animating the button with flash //////

  playSound(randomChosenColour);

}


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");                 /////  audio playing /////////////
  audio.play();
}


function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
  $("#" + currentColor).removeClass("pressed");
}, 100);
}

function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}
