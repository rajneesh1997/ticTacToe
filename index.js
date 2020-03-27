var player = "";
var startPlayer = "";
var start = false;
var X = [];
var O = [];
var count = 0;
var status = "";

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

$("table").click(function(event) {
  if (start === false) {
    $(".selectPlayer")
      .fadeOut(100)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);
  } else {
    if (status === "over")
      alert("Result Declared. Refresh to Start Playing Again.");
    else {
      if (event.target.innerText !== "") alert("Select another cell");
      else {
        $(event.target).text(player);
        let row = event.target.parentNode.rowIndex;
        let col = event.target.cellIndex;
        if (player === "X") {
          X.push([row, col]);
          ++count;
          check(X);
          player = "O";
        } else {
          O.push([row, col]);
          ++count;
          check(O);
          player = "X";
        }
        highlight(player);
      }
    }
  }
});

$("button").click(function(event) {
  if (start === false) {
    start = true;
    $(".selectPlayer").css("display", "none");
    startPlayer = event.target.name;
    player = event.target.name;
    highlight(player);
  }
});

function highlight(btn) {
  if (count < 9) {
    if (btn === "X") {
      $("button.X").addClass("highlight");
      $("button.O").removeClass("highlight");
    } else {
      $("button.O").addClass("highlight");
      $("button.X").removeClass("highlight");
    }
    $("p").text("Next move by : " + btn);
  } else {
    $("button." + startPlayer).removeClass("highlight");
    $("p").css("display", "none");
  }
}

function check(arr) {
  if (arr.length < 3) return;

  cmb = Combinatorics.combination(arr, 3);

  while ((a = cmb.next())) {
    a.sort();
    for (var i = 0; i < streak.length; i++) {
      if (JSON.stringify(a) === JSON.stringify(streak[i])) {
        $(".result" + player).css("display", "block");
        $("p").css("display", "none");
        status = "over";
        strike(a);
        break;
      }
    }
  }

  if (status !== "over" && count === 9) {
    console.log(status);
    $(".resultDraw").css("display", "block");
    status = "over";
  }
}

function strike(arr) {
  if (arr[0][0] + 1 === arr[1][0]) {
    if (arr[0][1] + 1 === arr[1][1]) {
      $("." + arr[0][0] + " ." + arr[0][1]).addClass("leftDiagonal");
      $("." + arr[1][0] + " ." + arr[1][1]).addClass("leftDiagonal");
      $("." + arr[2][0] + " ." + arr[2][1]).addClass("leftDiagonal");
    } else {
      if (arr[0][1] - 1 === arr[1][1]) {
        $("." + arr[0][0] + " ." + arr[0][1]).addClass("rightDiagonal");
        $("." + arr[1][0] + " ." + arr[1][1]).addClass("rightDiagonal");
        $("." + arr[2][0] + " ." + arr[2][1]).addClass("rightDiagonal");
      } else {
        $("." + arr[0][0] + " ." + arr[0][1]).addClass("vertical");
        $("." + arr[1][0] + " ." + arr[1][1]).addClass("vertical");
        $("." + arr[2][0] + " ." + arr[2][1]).addClass("vertical");
      }
    }
  }

  if (arr[0][1] + 1 === arr[1][1]) {
    $("." + arr[0][0] + " ." + arr[0][1]).addClass("horizontal");
    $("." + arr[1][0] + " ." + arr[1][1]).addClass("horizontal");
    $("." + arr[2][0] + " ." + arr[2][1]).addClass("horizontal");
  }
}
