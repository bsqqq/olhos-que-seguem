var eyesMouseX = 0, eyesMouseY = 0, eyesRX = 0, eyesRY = 0, eyesTimerDoOneMove = null, eyeBalls, eyeLeft, eyeRight, eyesVisible=true;


function EyesSetup() {
	var eyeballsURL = "", eyeURL = "";
	s = '<div ID="eyeballsID"><img SRC="eyeballs.gif"><\/div>'
	s += '<div ID="eyeLeftID"><img SRC="eye.gif"><\/div>'
	s += '<div ID="eyeRightID"><img SRC="eye.gif"><\/div>';
	document.writeln(s);
	eyeBalls = document.getElementById("eyeballsID"); eyeBalls.style.position = "absolute";
	eyeLeft = document.getElementById("eyeLeftID"); eyeLeft.style.position = "absolute";
	eyeRight = document.getElementById("eyeRightID"); eyeRight.style.position = "absolute";
	if (document.layers) document.captureEvents(Event.MOUSEMOVE); 
	document.onmousemove = EyesMouseMovedHandler;
	if (document.all) document.onmousemove = EyesMouseMovedHandler;
	window.onunload = EyesClearMyTimer;
	EyesDoOneMove();
}

function EyesOnOff() {
	if (eyesVisible) {
		eyesVisible = false;  document.getElementsByName("eyesOnOffButton")[0].value = "eyes on ";
	} else {
		eyesVisible = true;  document.getElementsByName("eyesOnOffButton")[0].value = "eyes off";
	}
}


function EyesDoOneMove() {
	if (!eyesVisible) {
		EyesMoveObject(-100, -100, eyeBalls); EyesMoveObject(-100, -100, eyeLeft); EyesMoveObject(-100, -100, eyeRight);		
	} else {
		eyesRX += (eyesMouseX - eyesRX - 40) * 0.03, eyesRY += (eyesMouseY - eyesRY - 50) * 0.03; 
		var dy = eyesMouseY - eyesRY - 20, dx1 = eyesMouseX - eyesRX - 20, dx2 = eyesMouseX - eyesRX - 60;
		var r = Math.max(20, Math.sqrt(dx1 * dx1 + dy * dy));
		dx1 = dx1 * 10 / r + eyesRX + 15, dy1 = dy * 3 / r + eyesRY + 3;
		r = Math.max(20, Math.sqrt(dx2 * dx2 + dy * dy));
		dx2 = dx2 * 10 / r + eyesRX + 55;
		EyesMoveObject(eyesRX, eyesRY, eyeBalls); EyesMoveObject(dx1, dy1, eyeLeft); EyesMoveObject(dx2, dy1, eyeRight);
	}
	eyesTimerDoOneMove = setTimeout("EyesDoOneMove()", 100);
}


function EyesMoveObject(xPos, yPos, theObject) {
	theObject.style.left = Math.round(xPos) + "px"; theObject.style.top = Math.round(yPos) + "px";
}


function EyesMouseMovedHandler(e) {
	function MyMouseMovedTo(xPos, yPos) {eyesMouseX = xPos; eyesMouseY = yPos;}
	if (e) {
		MyMouseMovedTo(e.pageX, e.pageY); return null;//return routeEvent(e);
	}
	if (event) {
		MyMouseMovedTo(event.clientX+window.document.body.scrollLeft, yPos = event.clientY+window.document.body.scrollTop);
	}
	return null; 
}


function EyesClearMyTimer() {
	if (eyesTimerDoOneMove != null) clearTimeout(eyesTimerDoOneMove);
}
