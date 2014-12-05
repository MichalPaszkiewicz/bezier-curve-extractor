$(document).ready(function() {

	var c = document.getElementById("my-canvas");
	var ctx = c.getContext("2d");
	
	var curveCoords = {
		start: {x: 0, y:0, name: "Start"},
		pointOne: {x: 0, y: 0, name: "Point 1"},
		pointTwo: {x: 0, y: 0, name: "Point 2"},
		end: {x: 0, y: 0, name: "End"}
	};
	
	function drawBezier(){
		ctx.clearRect(0,0,c.width,c.height);
		ctx.beginPath();
		ctx.moveTo(curveCoords.start.x, curveCoords.start.y);
		ctx.bezierCurveTo(
				curveCoords.pointOne.x, curveCoords.pointOne.y,
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
		
		ctx.font = "bold 10px Arial";
  		ctx.fillText(item.name, x - 10, y - 15);
	}
	
	function drawPoints(){
		drawPoint(curveCoords.start);
		drawPoint(curveCoords.pointOne);
		drawPoint(curveCoords.pointTwo);
		drawPoint(curveCoords.end);
	}
	
	function action(e, thing){
		var coord = $("#item").val();
		var offset = $(thing).offset();
		var x = e.clientX - offset.left;
		var y = e.clientY - offset.top;
				
		curveCoords[coord].x = x;
		curveCoords[coord].y = y;
				
		drawBezier();
		drawPoints();
				
		$("#bezier-function").html("ctx.moveTo(" + curveCoords.start.x + ", " + curveCoords.start.y + "); <br> ctx.bezierCurveTo(  " + curveCoords.pointOne.x + ", " + curveCoords.pointOne.x + ", " + curveCoords.pointTwo.x + ", " + curveCoords.pointTwo.y + ", " + curveCoords.end.x + ", " + curveCoords.end.y + "); <br> ctx.stroke();");
	}
	
	var scrolling = false;
	
	$("#my-canvas").mousedown(function(e){
		scrolling = true;
		
		action(e, this);
		
		$("#my-canvas").mousemove(function(e){
			if(scrolling){
				action(e, this);
			}	
		});
	});
	
	$("#my-canvas").mouseup(function(){
		scrolling = false;
		$( "#my-canvas").unbind( "mousemove" );
	});
	


});
