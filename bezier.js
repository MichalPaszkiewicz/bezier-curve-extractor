$(document).ready(function() {

	var c = document.getElementById("my-canvas");
	var ctx = c.getContext("2d");
	
	var curveCoords = {
		start: {x: 160, y: 200, name: "Start", xn: "start"},
		pointOne: {x: 220, y: 120, name: "Point 1", xn: "pointOne"},
		pointTwo: {x: 280, y: 120, name: "Point 2", xn: "pointTwo"},
		end: {x: 340, y: 200, name: "End", xn: "end"}
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
	
	function writeCode(){
		$("#bezier-function").html("ctx.moveTo(" + curveCoords.start.x + ", " + curveCoords.start.y + "); <br> ctx.bezierCurveTo(  " + curveCoords.pointOne.x + ", " + curveCoords.pointOne.y + ", " + curveCoords.pointTwo.x + ", " + curveCoords.pointTwo.y + ", " + curveCoords.end.x + ", " + curveCoords.end.y + "); <br> ctx.stroke();");
	}
	
	drawBezier();
	drawPoints();
	writeCode();
	
	function action(e, thing, curveCoord){
		var offset = $(thing).offset();
		var x = e.clientX - offset.left;
		var y = e.clientY - offset.top + window.scrollY;
				
		curveCoords[curveCoord].x = x;
		curveCoords[curveCoord].y = y;
				
		drawBezier();
		drawPoints();
		writeCode();		
	}
	
	var scrolling = false;
	
	$("#my-canvas").mousedown(function(e){
		scrolling = true;
		
		var curveCoord = $("input:checked").val();
		var offset = $(this).offset();
		
		var x = e.clientX - offset.left;
		var y = e.clientY - offset.top + window.scrollY;
		
		for(var key in curveCoords)
		{
			if(curveCoords[key].x + 10 > x && curveCoords[key].x - 10 < x && curveCoords[key].y + 10 > y && curveCoords[key].y - 10 < y){
				curveCoord = curveCoords[key].xn;
				$("[value=" + key + "]").click();
			}
		}

		action(e, this, curveCoord);
		
		$("#my-canvas").mousemove(function(e){
			if(scrolling){
				
				action(e, this, curveCoord);
			}	
		});
	});
	
	$("#my-canvas").mouseup(function(){
		scrolling = false;
		$( "#my-canvas").unbind( "mousemove" );
	});
	


});
