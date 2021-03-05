function saveText(){
	const text = document.getElementById('text').value;
	
	localStorage.setItem("text", text);
	
	drawText();
}
function drawText(){
	
	const saved_text = localStorage.getItem("text");
	
	document.getElementById('stored_text').innerText = saved_text;
	

}
function delText(){
	
	localStorage.removeItem("text");
	document.getElementById('text').value = '';
	drawText();
}
function editText(){
	const saved_text = localStorage.getItem("text");
	
	document.getElementById('text').value = saved_text;
	
}

drawText();