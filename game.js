var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];
var bool = 1;
var level = 0;
$(document).keydown(function () {
    if (bool == 1) nextSequence();
});


function nextSequence() {
    bool = 0;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level " + level);

}

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    //alert(userChosenColour);
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    //alert (userClickedPattern.length - 1);
});
function playSound(colorName) {
    var soundName = 'sounds/' + colorName + '.mp3';
    var audio = new Audio(soundName);
    audio.play();
}
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        if (currentLevel == level - 1) {
            setTimeout(function () {
                nextSequence();
                userClickedPattern = [];
            }, 1000)
        }
    }
    else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function startOver() {
    level = 0;
    bool = 1;
    gamePattern = [];
    userClickedPattern = [];
}