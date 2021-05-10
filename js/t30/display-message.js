function displayMessage(type, title, message, time){

    const div = document.createElement('div');
    div.classList.add('message-box');

    const content = document.createElement('div');
    content.classList.add('message-content');
    content.classList.add(type);

    div.appendChild(content);

    const header = document.createElement('div');
    header.classList.add('message-header');
    header.innerText = title;

    const text = document.createElement('div');
    text.classList.add('message-text');
    text.innerText = message;

    const line = document.createElement('div');
    line.classList.add('message-time-line');
   

    content.appendChild(header);
    content.appendChild(text);
    content.appendChild(line);

    document.body.appendChild(div);

    line.style.width = '100%';
    let difference = 1000/time;

    let lineMore = setInterval( function(){

        line.style.width = `${Number(line.style.width.replace('%', '')) - difference}%`;
        if( Number(line.style.width.replace('%', '')) < 1 ){
            clearInterval(lineMore);
            document.body.removeChild(div);
        }
    }, 10)
}
displayMessage('.message-warning', 'Test Header', 'Some test text', 4000);