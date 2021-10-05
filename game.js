var seqList = [];
var userList = [];
var flag = false;
var level = 0;
var colorNum = {
	1 : "green",
	2 : "red",
	3 : "yellow",
	4 : "blue"
};


$(document).on("keydown",function(event){
	startGame();
})
function startGame(){
	if (!flag){
		$("#level-title").text("Level " + (level+1));
		playGame();
		flag = true;
	}
}

$(".btn").click(function() {

  var currTile = $(this).attr("id");
  userList.push(currTile);
  animateButton(currTile);

  checkPattern(userList.length-1);
});


function playGame(){
	userList = [];
	level++;
	$("#level-title").text("Level " + level);
	var num1;
	num1 = Math.floor(Math.random() * 4) + 1;
	var nextColor =  colorNum[num1];
	console.log(nextColor);
	console.log($("#"+nextColor));
	$("#"+nextColor).fadeIn(100).fadeOut(100).fadeIn(100);
	seqList.push(colorNum[num1]);
	playSound(nextColor);	
}

function animateButton(nextColor){

	$("#"+nextColor).addClass("pressed");
		var audioSource = "sounds/"+nextColor+".mp3";
		var audio = new Audio(audioSource);
		audio.play();
		setTimeout(function(){
			$("#"+nextColor).removeClass("pressed");
		},200)
}

function checkPattern(currentLevel){
	console.log(seqList[currentLevel] ,userList[currentLevel])
	if (seqList[currentLevel] === userList[currentLevel]) {
      if (userList.length === seqList.length){
        setTimeout(function () {
          playGame();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Score = " + (level-1) );

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#play").removeClass("hide");

      $("#play").click(function(){
      	$("#play").addClass("hide");
      	startOver();
      	setTimeout(function () {
        	startGame();
        }, 500);
      });
    }
}

function startOver() {
  level = 0;
  seqList = [];
  flag = false;
}

function playSound(sound){
	var audioSource = "sounds/"+sound+".mp3";
	var audio = new Audio(audioSource);
	audio.play();
}

$("#play").hover(function(){
  $(this).css("color", "black");
  $(this).css("background-color", "white");
  }, function(){
  $(this).css("color", "white");	
  $(this).css("background-color", "#011F3F");
});