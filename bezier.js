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
	
	function drawPoint(item){
		var x = item.x, y = item.y
		ctx.beginPath();
		ctx.fillStyle = "red";
		ctx.arc(x,y,10,0,2*Math.PI);
		ctx.fill();
	}
	
	function drawPoints(){
		drawPoint(curveCoords.start);
		drawPoint(curveCoords.pointOne);
		drawPoint(curveCoords.pointTwo);
		drawPoint(curveCoords.end);
	}
	
	function action(e){
		var coord = $("#item").val();
		var offset = $(this).offset();
		var x = e.clientX - offset.left;
		var y = e.clientY - offset.top;
				
		curveCoords[coord].x = x;
		curveCoords[coord].y = y;
				
		drawBezier();
		drawPoints();
				
		$("#bezier-function").html("ctx.moveTo(" + curveCoords.start.x + ", " + curveCoords.start.y + "); <br> ctx.bezierCurveTo(  " + curveCoords.pointOne.x + ", " + curveCoords.pointOne.x + ", " + curveCoords.pointTwo.x + ", " + curveCoords.pointTwo.y + ", " + curveCoords.end.x + ", " + curveCoords.end.y + "); <br> ctx.stroke();");
	}
	
	var scrolling = false;
	
	$("#my-canvas").mousedown(function(){
		scrolling = true;
		
		action();
		
		$("#my-canvas").mousemove(function(e){
			if(scrolling){
				action(e);
			}	
		});
	});
	
	$("#my-canvas").mouseup(function(){
		scrolling = false;
		$( "#my-canvas").unbind( "mousemove" );
	});
	


});
