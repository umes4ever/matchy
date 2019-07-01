var numbers = ['1', '3', '6', '2', '1', '3', '4', '8', '5', '7', '6', '8', '5', '7', '4','2'];
var boxes = ['box00', 'box01', 'box02','box03','box10','box11','box12','box13','box20','box21','box22','box23','box30','box31','box32','box33'];
var row1 = [];
var row2 = [];
var row3 = [];
var row4 = [];
var countDiv = '';

$(document).ready(function(){
	countDiv = $('.count'); 
	shuffleArray(numbers);
	initializeNumbers();
	hideAll();	
	addClickListeners();
});

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

var preValue = '';
var preBox = '';
var maxScore = 8;
var score = 0;
var totalClicks = 0;


function addClickListeners(){

	boxes.forEach(function(item, index, array) {
		$('.' + item).click(function(){
			var currentBox = $('.' + item);
			handleClick(currentBox);
		});
	});
}

function handleClick(currentBox){
	
	var currentValue = currentBox.text();

	currentBox.removeClass('hide');

	if(preValue === ''){
		countDiv.text("Total Clicks: " + ++totalClicks);
		preValue = currentValue;
		preBox = currentBox;
	}else{
		if(preBox.is(currentBox)){
			return;
		}
		
		countDiv.text("Total Clicks: " + ++totalClicks);

		if((preValue === currentValue)){
			currentBox.addClass('disable');
			preBox.addClass('disable');
			++score;
			preValue = '';
			preBox = '';


			if(score === maxScore){
				setTimeout(function(){

					if(!alert("Game Completed in " + totalClicks + " clicks")){
						resetGame();
					};
					
				}, 50);
			}
		}else{
			setTimeout(function(){

				currentBox.addClass('hide');
				preBox.addClass('hide');	
				preValue = '';
				preBox = '';

			}, 500);
			
		}
	}
}

function hideAll(){
	boxes.forEach(function(item, index, array) {
		$('.' + item).addClass('hide');
	});
}

function removeDisableClick(){
	boxes.forEach(function(item, index, array) {
		$('.' + item).removeClass('disable');
	});
}

function reinitValue(){
	preValue = '';
	preBox = '';
	maxScore = 8;
	score = 0;
	totalClicks = 0;
}

function resetGame(){
	reinitValue();
	shuffleArray(numbers);
	initializeNumbers();
	hideAll();
	removeDisableClick();
}

function initializeNumbers(){

	for(var i =0, j = 0; i < numbers.length ; i++, j++){
		if(j > 3){ j = 0; }

		if(i<4){
			$('.box0' + j).text(numbers[i]);
		}else if(i<8){
			$('.box1' + j).text(numbers[i]);
		}else if(i<12) {
			$('.box2' + j).text(numbers[i]);
		}else{
			$('.box3' + j).text(numbers[i]);
		}
	}
}