import Keyboard from './keyboard.js';

// Textarea
const { body } = document;
const textarea = document.createElement('textarea');
textarea.className = 'textarea';
textarea.name = 'textarea';
textarea.cols = 50;
textarea.rows = 5;
body.appendChild(textarea);
// Keyboard
const kbd = new Keyboard(textarea);
body.appendChild(kbd.getNode());
// Footer
const footer = document.createElement('div');
footer.className = 'footer';
footer.innerHTML += ('Клавиатура создана в операционной системе Windows<br>'
    + 'Для переключения языка комбинация: левыe ctrl + shift');
body.appendChild(footer);
textarea.focus();

kbd.getNode().addEventListener('click', (e) => {
  kbd.clickButtonHandler(e);
});

window.addEventListener('keydown', (e) => {
  if (e.code !== 'MetaLeft') {
    e.preventDefault();
    kbd.keyHandlerDown(e);
  } else {
    document.querySelector(`button[data-code="${e.code}"]`).classList.add('keyboard__key_pressed');
  }
});
window.addEventListener('keyup', (e) => {
  if (e.code !== 'MetaLeft') {
    e.preventDefault();
    kbd.keyHandlerUp(e);
  } else {
    document.querySelector(`button[data-code="${e.code}"]`).classList.remove('keyboard__key_pressed');
  }
});
