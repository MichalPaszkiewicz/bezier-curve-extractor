$(document).ready(function() {

	var c = document.getElementById("my-canvas");
	var ctx = c.getContext("2d");
	
	var curveCoords = {
		start: {x: 0, y:0},
		pointOne: {x: 0, y: 0},
		pointTwo: {x: 0, y: 0},
		end: {x: 0, y: 0}
	};
	
	function drawBezier(){
		ctx.clearRect(0,0,c.width,c.height);
		ctx.beginPath();
		ctx.moveTo(curveCoords.start.x, curveCoords.start.y);
		ctx.bezierCurveTo(
				curveCoords.pointOne.x, curveCoords.pointOne.x,
				curveCoords.pointTwo.x, curveCoords.pointTwo.y,
				curveCoords.end.x, curveCoords.end.y);
		ctx.stroke();
	}
	
	$("#my-canvas").click(function(e){
		var coord = $("#item").val();
		var offset = $(this).offset();
		var x = e.clientX - offset.left;
		var y = e.clientY - offset.top;
		
		curveCoords[coord].x = x;
		curveCoords[coord].y = y;
		
		drawBezier();
		
		$("#bezier-function").html("ctx.moveTo(curveCoords.start.x, curveCoords.start.y); <br> ctx.bezierCurveTo(  curveCoords.pointOne.x, curveCoords.pointOne.x, <br>  curveCoords.pointTwo.x, curveCoords.pointTwo.y, <br> curveCoords.end.x, curveCoords.end.y); <br> ctx.stroke();");
	});

});
