var player = "_";
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
  if (status === "over")
    alert("Result Declared. Refresh to Start Playing Again.");
  else {
    if (event.target.innerText !== "_") alert("Select another cell");
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
        if (player === "O") {
          O.push([row, col]);
          ++count;
          check(O);
        }
        player = "X";
      }
      highlight(player);
      if (start === false) {
        start = true;
        $(".selectPlayer").css("display", "none");
      }
    }
  }
});

$("button").click(function(event) {
  if (start === false) {
    start = true;
    $(".selectPlayer").css("display", "none");
    player = event.target.name;
    highlight(player);
  }
});

function highlight(btn) {
  if (btn === "X") {
    $("button.X").addClass("highlight");
    $("button.O").removeClass("highlight");
  } else {
    $("button.O").addClass("highlight");
    $("button.X").removeClass("highlight");
  }
  $("p").text("Next move by : " + btn);
}

function check(arr) {
  if (arr.length < 3) return;

  if (count === 9) {
    $(".resultDraw").css("display", "block");
    status = "over";
  }

  cmb = Combinatorics.combination(arr, 3);

  while ((a = cmb.next())) {
    a.sort();
    for (var i = 0; i < streak.length; i++) {
      if (JSON.stringify(a) === JSON.stringify(streak[i])) {
        $(".result" + player).css("display", "block");
        $("p").css("display", "none");
        status = "over";
      }
    }
  }
}
