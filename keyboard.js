import keysEnglish from './keys.js';

class Keyboard {
  constructor(body) {
    const keys = keysEnglish;
    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    const buttonCodes = Object.keys(keys);
    keyboard.appendChild(this.createRowButtons(keys, buttonCodes.slice(0, 14)));
    keyboard.appendChild(this.createRowButtons(keys, buttonCodes.slice(14, 29)));
    keyboard.appendChild(this.createRowButtons(keys, buttonCodes.slice(29, 42)));
    keyboard.appendChild(this.createRowButtons(keys, buttonCodes.slice(42, 55)));
    keyboard.appendChild(this.createRowButtons(keys, buttonCodes.slice(55, buttonCodes.length)));
    body.appendChild(keyboard);
  }

  createRowButtons = (keys,arr) => {
    const rowKeys = document.createElement('div');
    rowKeys.classList.add('keyboard__row');
    arr.forEach((item) => {
      const button = document.createElement('button');
      button.classList.add('keyboard__key');
      button.ariaLabel = item;

      if (Array.isArray(keys[item])) {
        if (keys[item][0].match(/[a-zа-яё]/)) {
          button.textContent = keys[item][0];
        }
        else
        {
          const up = document.createElement('div');
          up.textContent = keys[item][1];
          button.appendChild(up);
          const down = document.createElement('div');
          down.textContent = keys[item][0];
          button.appendChild(down);

        }
      }
      else {

          button.textContent = keys[item];

      }

      button.dataset.code = item;
      rowKeys.appendChild(button);
    });
    return rowKeys;
  }
}

export default Keyboard;
