const message_box = document.getElementById('message_box');
const input = document.getElementById('input');

//let nickname = player.name;
let nickname = "PenisBaidena";

function pushMessage(author, message, type) {
    let messageElement = document.createElement('div');
    let prefix = '';
    let endPrefix = '';

    if (message.length > 30) {
        messageElement.style.whiteSpace = 'pre-wrap';
        messageElement.style.wordWrap = 'break-word';
    }


    if (type == "message") {
        prefix = '';
        endPrefix = '';
        messageElement.style.color = 'black';
    } else if (type == 'system') {
        prefix = '[KBRP]';
        endPrefix = '';
        messageElement.style.color = 'orange';
    } else if (type == 'announcement') {
        prefix = '[Announcement]';
        endPrefix = '';
        messageElement.style.color = 'yellow';
    } else if (type == 'nonrp') {
        prefix = '((';
        endPrefix = '))';
        messageElement.style.color = 'black';
    } else if (type == 'news') {
        prefix = '[NEWS]';
        endPrefix = '';
        messageElement.style.color = 'green';
    } else if (type == 'ad') {
        prefix = '[AD]';
        endPrefix = '';
        messageElement.style.color = 'yellow';
    }

    messageElement.innerText = `${prefix} ${author}: ${message} ${endPrefix}`;
    message_box.appendChild(messageElement);

    if (message_box.children.length > 100) {
        message_box.removeChild(message_box.children[0]);
    }

    // прокрутка вниз при добавлении нового сообщения
    message_box.scrollTop = message_box.scrollHeight;
}

function send() {
    console.log(input.value.trim());
    const message = input.value.trim();
    if (message.length > 1) {
        //push commands here

        //default event for message
        pushMessage(nickname, message, 'ad');
        input.value = '';
    }
}

function toggleInputVisibility() {
    const inputContainer = document.querySelector('.input-container');
    inputContainer.style.display = inputContainer.style.display === 'none' ? 'flex' : 'none';
}
3 
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        send();
        event.preventDefault();
    }
})

//mp.events.add('pushMessage', (author, message, type) => { pushMessage(author, message, type)});
//mp.events.add('toggleChatVisiblity', () => { toggleInputVisibility()});
