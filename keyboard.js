import keysEnglish from './keysEnglish.js';

class Keyboard {
  constructor(textarea) {
    this.capsBtn = false;
    this.shiftBtn = false;
    this.textarea = textarea;
    this.keys = keysEnglish;
    this.keyboard = document.createElement('div');
    this.keyboard.classList.add('keyboard');
    const buttonCodes = Object.keys(this.keys);
    this.keyboard.appendChild(this.createRowButtons(buttonCodes.slice(0, 14)));
    this.keyboard.appendChild(this.createRowButtons(buttonCodes.slice(14, 29)));
    this.keyboard.appendChild(this.createRowButtons(buttonCodes.slice(29, 42)));
    this.keyboard.appendChild(this.createRowButtons(buttonCodes.slice(42, 55)));
    this.keyboard.appendChild(this.createRowButtons(buttonCodes.slice(55, buttonCodes.length)));
  }

  getNode() {
    return this.keyboard;
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
          [button.textContent] = this.keys[item];
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

  clickButtonHandler(e) {
    e.stopPropagation();
    const keyDiv = e.target.closest('.keyboard__key');
    if (!keyDiv) return;
    const {
      dataset: { code },
    } = keyDiv;

    switch (code) {
      case 'CapsLock':
        this.capsBtn = !this.capsBtn;
        document.querySelector('button[data-code="CapsLock"]').classList.toggle('keyboard__key_pressed');
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        this.shiftBtn = !this.shiftBtn;
        document.querySelector('button[data-code="ShiftLeft"]').classList.toggle('keyboard__key_pressed');
        document.querySelector('button[data-code="ShiftRight"]').classList.toggle('keyboard__key_pressed');
        break;
      case 'ControlLeft':
        if (this.shiftBtn) {
          this.switchLanguage();
        }
        break;
      default:
        this.outputSymbol(code);
    }
  }

  outputSymbol(code) {
    let symbol = '';

    if (Array.isArray(this.keys[code])) {
      if (this.shiftBtn) {
        [, symbol] = this.keys[code];
      } else if (this.capsBtn) {
        if (this.keys[code][0].match(/[a-zа-яё]/)) {
          [, symbol] = this.keys[code];
        } else {
          [symbol] = this.keys[code];
        }
      } else {
        [symbol] = this.keys[code];
      }
    }
    this.textarea.focus();
    let selStart = this.textarea.selectionStart;
    let selEnd = this.textarea.selectionEnd;
    const left = this.textarea.value.slice(0, selStart);
    const right = this.textarea.value.slice(selEnd);
    // eslint-disable-next-line no-plusplus
    selEnd = ++selStart;
    this.textarea.value = `${left}${symbol || ''}${right}`;
    this.textarea.setSelectionRange(selStart, selEnd);
  }

  switchLanguage() {
    console.log('Switch language');
  }
}

export default Keyboard;
