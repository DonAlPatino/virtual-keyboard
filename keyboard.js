import keysEnglish from './keys.js';

class Keyboard {
  constructor(body) {
    this.keys = keysEnglish;
    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    const buttonCodes = Object.keys(this.keys);
    keyboard.appendChild(this.createRowButtons(buttonCodes.slice(0, 14)));
    keyboard.appendChild(this.createRowButtons(buttonCodes.slice(14, 29)));
    keyboard.appendChild(this.createRowButtons(buttonCodes.slice(29, 42)));
    keyboard.appendChild(this.createRowButtons(buttonCodes.slice(42, 55)));
    keyboard.appendChild(this.createRowButtons(buttonCodes.slice(55, buttonCodes.length)));
    body.appendChild(keyboard);
  }

  createRowButtons(arr) {
    const rowKeys = document.createElement('div');
    rowKeys.classList.add('keyboard__row');
    arr.forEach((item) => {
      const button = document.createElement('button');
      button.classList.add('keyboard__key');
      button.ariaLabel = item;

      if (Array.isArray(this.keys[item])) {
        if (this.keys[item][0].match(/[a-zа-яё]/)) {
          // eslint-disable-next-line prefer-destructuring
          button.textContent = this.keys[item][0];
        } else {
          const up = document.createElement('div');
          const down = document.createElement('div');
          [down.textContent, up.textContent] = this.keys[item];
          button.appendChild(up);
          button.appendChild(down);
          button.classList.add('keyboard__key_spec');
        }
      } else {
        if (this.keys[item].match(/Backspace|Del|Tab|CapsLock|Enter|Shift| /)) {
          button.classList.add('keyboard__key_wide');
        }
        if (this.keys[item].match(/Ctrl/)) {
          button.classList.add('keyboard__key_double');
        }
        button.textContent = this.keys[item];
      }

      button.dataset.code = item;
      rowKeys.appendChild(button);
    });
    return rowKeys;
  }
}

export default Keyboard;
