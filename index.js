alert("Designed as user vs. user game. Suggestions are most Welcome");

var player = ""; //counter variable to select player
var status = ""; //variable to tell status of game (Over/Ongoing)
var stopwatch = ""; //variable to tell when to click on table

var X = []; //array to store X's position
var O = []; //array to store O's position

var count = 0; //variable used to count the valid inputs into table

var click = false; //Variable used in Timer Function
var start = false; //variable to keep track the game has started or not

// Array to store wining positions
var streak = [
  [
    [0, 0],
    [1, 0],
    [2, 0]
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1]
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2]
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2]
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2]
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2]
  ],
  [
    [0, 0],
    [1, 1],
    [2, 2]
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0]
  ]
];

// Function to emphasis user to select a player.

function fadeEffect() {
  $(".selectPlayer")
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}

// Function to warn user from changing submitted input

function displayWarning(event) {
  var x = 1;
  var stop = setInterval(function() {
    if (x % 2 === 0) $(event.target).addClass("glowWarning");
    else $(event.target).removeClass("glowWarning");
    x++;
    if (x === 10) clearInterval(stop);
  }, 100);
}

$("table").click(function(event) {
  if (start === false) fadeEffect();
  else {
    if (status === "over") alert("Result Declared!");
    else {
      if (event.target.innerText !== "") displayWarning(event);
      else {
        click = true;
        if (stopwatch === "started") {
          stopwatch = "";
          $(event.target).text(player);
          let row = event.target.parentNode.rowIndex;
          let col = event.target.cellIndex;
          ++count;
          if (player === "X") {
            X.push([row, col]);
            check(X);
          } else {
            O.push([row, col]);
            check(O);
          }
        }
      }
    }
  }
});

$("button").click(function(event) {
  if (start === false) {
    start = true;
    $(".selectPlayer").css("display", "none");
    player = event.target.name;
    activePlayer(player);
    timer(player);
  }
});

//Function which shows user's turn

function activePlayer(btn) {
  if (status === "over") {
    $("button." + btn).removeClass("active");
    $("button." + btn).addClass("disabled");
    $("p").css("display", "none");
    return;
  }
  if (count < 9) {
    if (btn === "X") {
      $("button.X").removeClass("disabled");
      $("button.X").addClass("active");
      $("button.O").removeClass("active");
      $("button.O").addClass("disabled");
    } else {
      $("button.O").removeClass("disabled");
      $("button.O").addClass("active");
      $("button.X").removeClass("active");
      $("button.X").addClass("disabled");
    }
    $("p").text("Next move by : " + btn);
  }
}

// Below is the function to find out the winner

function check(arr) {
  if (arr.length < 3) return;
  cmb = Combinatorics.combination(arr, 3); //imported check script
  while ((a = cmb.next())) {
    a.sort();
    for (var i = 0; i < streak.length; i++)
      if (JSON.stringify(a) === JSON.stringify(streak[i])) {
        $(".result" + player).css("display", "block");
        $(".reset").css("display", "block");
        $("p").css("display", "none");
        status = "over";
        strikeOFF(a);
        glowScreen(player);
        return;
      }
  }
  if (status !== "over" && count === 9) {
    $(".resultDraw, .reset").css("display", "block");
    $("p").css("display", "none");
    status = "over";
  }
}

// Below 2 functions are used for striking off.

function strikeOFF(arr) {
  if (arr[0][0] + 1 === arr[1][0])
    if (arr[0][1] + 1 === arr[1][1]) markIt("leftDiagonal", arr);
    else {
      if (arr[0][1] - 1 === arr[1][1]) markIt("rightDiagonal", arr);
      else markIt("vertical", arr);
    }
  if (arr[0][1] + 1 === arr[1][1]) markIt("horizontal", arr);
}

function markIt(str, arr) {
  $("." + arr[0][0] + " ." + arr[0][1]).addClass(str);
  $("." + arr[1][0] + " ." + arr[1][1]).addClass(str);
  $("." + arr[2][0] + " ." + arr[2][1]).addClass(str);
}

// Below function is a Simple Timer. Timer gets activated on Button Press.
// Each Player gets 10 seconds or else his/her chance is lost.

function timer(btn) {
  stopwatch = "started";
  var seconds = 2;
  var clock = setInterval(function() {
    $("button." + btn).html(seconds);
    if (seconds > 10 || click) {
      click = false;
      clearInterval(clock);
      $("button." + btn).html("Player " + btn);
      if (status !== "over") {
        if (btn === "X") {
          player = "O";
          activePlayer(player);
          timer(player);
        } else {
          player = "X";
          activePlayer(player);
          timer(player);
        }
      } else {
        activePlayer(player);
        return;
      }
    }
    ++seconds;
  }, 750);
}

// Function to produce screen effects when player wins.

function glowScreen(winner) {
  var x = 1;
  var stop = setInterval(function() {
    if (x % 2 === 0) $("body").addClass("glow" + winner);
    else $("body").removeClass("glow" + winner);
    x++;
    if (x === 100) clearInterval(stop);
  }, 100);
}
