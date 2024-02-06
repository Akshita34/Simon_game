// alert("Hello");

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var toggle = false;
var lvl = 0;
var error = false;



$(document).keydown(function(){
    // console.log(toggle);
    if(error===false){
        alert("GAME RULES: ")
        alert("U need to follow the colored block sequence and press it accordingly. The level will update if you correctly remember and press the colored blocks....");
        error = true;
    }
    if(toggle===false){
        $("h1").text("Level " + lvl);
        
        nextSequence();
        // lvl = lvl+1;
        toggle = true;
        
    }
});

function nextSequence(){
    lvl++;
    $("h1").text("Level " + lvl);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    // console.log(gamePattern[0]);
    var btn = $("#" + randomChosenColor);
    btn.fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    animatePress(randomChosenColor);


    
}

$(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id");
    // alert(userChosenColor);
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    // console.log(userClickedPattern[userClickedPattern.length-1]);
    checkAnswer(userClickedPattern.length-1);
});

// console.log(gamePattern.slice(-1));

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100)
}

function checkAnswer(currentLevel){
    // console.log(currentLevel);
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            console.log("done");
            setTimeout(function(){
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver(){
    lvl = 0;
    gamePattern = [];
    userClickedPattern = [];
    toggle = false;
}







