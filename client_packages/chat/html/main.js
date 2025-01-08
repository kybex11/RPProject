const message_box = document.getElementById('message_box');
const input = document.getElementById('input');

let nickname = player.name;

function pushMessage(author, message, type) {
    let messageElement = document.createElement('div');
    let prefix = '';
    let endPrefix = '';


    if (type == "message") {
        prefix = '';
        endPrefix = '';
        messageElement.style.color = 'white';
    } else if (type == 'radio') {
        prefix = '[R]';
        endPrefix = '';
        messageElement.style.color = 'blue';
    } else if (type == 'dep') {
        prefix = '[D]';
        endPrefix = '';
        messageElement.style.color = 'orange';
    } else if (type == 'announcement') {
        prefix = '';
        endPrefix = '';
        messageElement.style.color = 'yellow';
    } else if (type == 'nonrp') {
        prefix = '((';
        endPrefix = '))';
        messageElement.style.color = 'white';
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
    if (message) {
        //push commands here
        if (message == 'builder639874298052') {
          player.call('server:command:builder');
        } else if (message = '') {

        }

        //default event for message
        pushMessage(nickname, message, 'message');
        input.value = '';
    }
}

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        send();
        event.preventDefault();
    }
})

mp.events.add('pushMessage', (author, message, type) => { pushMessage(author, message, type)});
