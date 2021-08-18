var buttonsColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var isGameStarted = false;
var level = 0;

$(document).keydown(function(){
  if (!isGameStarted){
    $("#level-title").text("Level " + level);
    nextSequence();
    isGameStarted = true;
  }
})

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour)

  checkAnswer(userClickedPattern.length - 1);

})

function nextSequence(){
  userClickedPattern = [];
  $("#level-title").text("level " + (++level));
  var randomNumber = Math.floor(Math.random() * 3) + 1;

  var randomChosenColour = buttonsColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(soundName){
  var audio = new Audio("assets/sounds/" + soundName +".mp3");
  audio.play();
}

 function animatePress(currentColour){
   $("." + currentColour).addClass("pressed");
   setTimeout(function(){
     $("." + currentColour).removeClass("pressed");
   }, 100)
 }

 function checkAnswer(elementIndex){
   if (userClickedPattern[elementIndex] === gamePattern[elementIndex]){
     if(userClickedPattern.length === gamePattern.length){
       setTimeout(function () {
         nextSequence();
       }, 1000)
     }
   }

   else{
     playSound("wrong");

     $("body").addClass("game-over");
     setTimeout(function () {
       $("body").removeClass("game-over");
     }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

     startOver()
   }
 }

 function startOver(){
   isGameStarted = false;
   level = 0;
   gamePattern = [];
 }
