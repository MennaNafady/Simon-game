// alert("hi");
var array = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var count = 0;
var i = 0;
var level = 0;
var userClickedPattern = [];
var acceptingInput = false;

$(document).keydown(function () {
  if (count === 0) {
    $("h1").text("Level 1");
    nextSequence();
    count++;
  }
});



function nextSequence() {
  acceptingInput = false;
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomnumber = Math.floor(Math.random() * array.length);
  var randomChosenColour = array[randomnumber];
  

  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .addClass("flash");
  playSound(randomChosenColour);

  setTimeout(function () {
    $("#" + randomChosenColour).removeClass("flash");
    acceptingInput = true;
  }, 300);
  

 
}
 $(".btn").click(function () {
   if (!acceptingInput) return;
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    playSound(userChosenColour);
    $("#" + userChosenColour).addClass("pressed");
    setTimeout(function () {
      $("#" + userChosenColour).removeClass("pressed");
    }, 100);
  });

function checkAnswer(c) {
  if (userClickedPattern[c] === gamePattern[c]) {
   
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    
    playSound("wrong"); 
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    count = 0;
    gamePattern = [];
    userClickedPattern = [];
    level = 0;

    return; 
  }
}


function playSound(name) {
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}
