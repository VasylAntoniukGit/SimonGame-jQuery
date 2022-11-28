    var buttonColors = ["red", "blue", "yellow", "green"];
    var gamePattern = [];
    var userClickedPattern = [];
    var level = 0;

    $(document).one("keydown", function(event) {
      $("#level-title").text("Level " + level);
      nextSequence();


    });

    $(".btn").click(function() {
      var userChosenColor = $(this).attr("id");
      userClickedPattern.push(userChosenColor);
      animatePress(userChosenColor);
      playSound(userChosenColor);
      console.log("Random table:" + gamePattern);
      console.log("User table:" + userClickedPattern);
      checkAnswer(userClickedPattern.length - 1);





    })

    function nextSequence() {
      userClickedPattern = [];
      level++;
      $("#level-title").text("Level " + level);
      var randomNumber = Math.floor(Math.random() * 4);
      var randomChosenColor = buttonColors[randomNumber];
      $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
      gamePattern.push(randomChosenColor);
      playSound(randomChosenColor);
      console.log("Random table with new random element:" + gamePattern);



    }

    function playSound(name) {
      var buttonSound = new Audio("sounds/" + name + ".mp3");
      buttonSound.play();
    }

    function animatePress(currentColor) {
      $("#" + currentColor).addClass("pressed");
      setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
    }

    function checkAnswer(currentLevel) {
      if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
          setTimeout(function() {
            nextSequence();
          }, 1000);
        }

      } else {
        $("#level-title").text("Game Over, press any key to restart");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
          $("body").removeClass("game-over");
        }, 200);
        $(document).one("keydown", function(event) {
          gameOver();
          $("#level-title").text("Level " + level);
          nextSequence();
        });
      }

    }

    function gameOver() {
      level = 0;
      gamePattern = [];
      userClickedPattern = [];

    }
