// Textarea
const { body } = document;
const textarea = document.createElement('textarea');
textarea.className = 'textarea';
textarea.name = 'textarea';
textarea.cols = 50;
textarea.rows = 5;
body.appendChild(textarea);
// Keyboard
// Footer
const footer = document.createElement('div');
footer.className = 'footer';
footer.innerHTML += ('Клавиатура создана в операционной системе Windows<br>'
    + 'Для переключения языка комбинация: левыe ctrl + alt');
body.appendChild(footer);
