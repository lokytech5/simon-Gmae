let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

$(document).keypress(function() {
   if(!started){
    $("#level-title").text("Level " + level);
    nextSequence()
    started = true;
   } 
});



$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
   playSound(userChosenColour)
   animatePress(userChosenColour)
    // console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length-1)
  });


  function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function() {
            nextSequence();
        }, 1000);
    }


    } else {
        console.log("wrong");

        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
    
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
    
}


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColours = buttonColours[randomNumber];
     gamePattern.push(randomChosenColours);

   $("#" + randomChosenColours).fadeOut(100).fadeIn(100); 
   playSound(randomChosenColours)
   
}

function playSound(name) {
   let audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}




