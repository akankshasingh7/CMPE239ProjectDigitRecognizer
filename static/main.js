var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var clear = document.getElementById('clear');
var saveButton = document.getElementById("save");

var radius = 5;
var dragging = false;

canvas.width ="500";
canvas.height = "400";

context.lineWidth = radius * 2;

/*context.fillStyle = '#fff';
ctx.fillRect(0, 0, canvas.width, canvas.height);*/

var putPoint = function(e){
	if(dragging){
	context.lineTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
	context.stroke();
	context.beginPath();
	context.arc(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, radius, 0, Math.PI*2);
	context.fill();
	context.beginPath();
	context.moveTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
	}
}

var engage = function(e){
	dragging = true;
	putPoint(e);
}

var disengage = function(e){
	dragging = false;
	context.beginPath();
}

var clearCanvas = function(e) {
	 context.clearRect(0, 0, canvas.width, canvas.height);
}

function saveImage(){

	  var xmlhttp;
      if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
          xmlhttp = new XMLHttpRequest();
      }
      else {// code for IE6, IE5
          xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }

      xmlhttp.onreadystatechange = function () {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
              // TODO: Optionally, here you can update the dom to have a table in "responseDiv"
             document.getElementById("myDiv").innerHTML = "<pre>" + xmlhttp.responseText + "</pre>";
              //var response = xmlhttp.responseText;
  			//window.open(response, '_blank', 'location=0, menubar=0');
          }
      }
      xmlhttp.open("POST", "analyzeImage", true);
      // TODO: Convert the canvas data to a data-uri encoded PNG image
      var dataURIPostBody = canvas.toDataURL("image/png");
    //  window.open(dataURIPostBody, '_blank', 'location=0, menubar=0');
      xmlhttp.send(dataURIPostBody);
  }


canvas.addEventListener('mousedown', engage	);
canvas.addEventListener('mousemove', putPoint);
canvas.addEventListener('mouseup', disengage);
clear.addEventListener('click', clearCanvas);
saveButton.addEventListener('click', saveImage);
