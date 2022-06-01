let buttonColours = ["red" , "blue" , "green" , "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;


$(document).on("keypress" , function(){
   if(!started){
       $("#level-title").text("level" + level);
       nextSequence();
       started = true;
   }
});

$(".btn").on("click" , function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length -1);
});


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            } , 1000)
        }

    } else{
        console.log("wrong");

        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        } , 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function nextSequence(){

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 3) + 1;

    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play().then(r => 0);
}


function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}





