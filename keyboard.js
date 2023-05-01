import keysEnglish from './keysEnglish.js';
import keysRussian from './keysRussian.js';

function playSound() {
  new Audio('sound.mp3').play();
}
class Keyboard {
  constructor(textarea) {
    this.capsBtn = false;
    this.shiftBtn = false;
    this.ctrlBtn = false;
    this.textarea = textarea;
    this.language = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
    this.keys = this.language === 'en' ? keysEnglish : keysRussian;

    this.keyboard = document.createElement('div');
    this.keyboard.classList.add('keyboard');
    const buttonCodes = Object.keys(this.keys);
    this.keyboard.appendChild(this.createRowButtons(buttonCodes.slice(0, 14)));
    this.keyboard.appendChild(this.createRowButtons(buttonCodes.slice(14, 29)));
    this.keyboard.appendChild(this.createRowButtons(buttonCodes.slice(29, 42)));
    this.keyboard.appendChild(this.createRowButtons(buttonCodes.slice(42, 55)));
    this.keyboard.appendChild(this.createRowButtons(buttonCodes.slice(55, buttonCodes.length)));
  }

  handleCase() {
    const keys = document.querySelectorAll('.keyboard__key_simple');
    if (this.capsBtn && this.shiftBtn) {
      keys.forEach((element) => {
        element.classList.remove('keyboard__key_upper');
      });
    } else if (this.capsBtn || this.shiftBtn) {
      keys.forEach((element) => {
        element.classList.add('keyboard__key_upper');
      });
    } else {
      keys.forEach((element) => {
        element.classList.remove('keyboard__key_upper');
      });
    }
    const up = document.querySelectorAll('.keyboard__key_spec .up');
    const down = document.querySelectorAll('.keyboard__key_spec .down');
    if (this.shiftBtn) {
      up.forEach((element) => {
        element.classList.add('keyboard__key_up');
      });
      down.forEach((element) => {
        element.classList.add('keyboard__key_down');
      });
    } else {
      up.forEach((element) => {
        element.classList.remove('keyboard__key_up');
      });
      down.forEach((element) => {
        element.classList.remove('keyboard__key_down');
      });
    }
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
          button.classList.add('keyboard__key_simple');
        } else {
          const up = document.createElement('div');
          up.className = 'up';
          const down = document.createElement('div');
          down.className = 'down';
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
    // e.stopPropagation();
    const keyDiv = e.target.closest('.keyboard__key');
    if (!keyDiv) return;
    const {
      dataset: { code },
    } = keyDiv;
    playSound();
    switch (code) {
      case 'MetaLeft':
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'MetaLeft' }));
        break;
      case 'CapsLock':
        this.capsBtn = !this.capsBtn;
        document.querySelector('button[data-code="CapsLock"]').classList.toggle('keyboard__key_pressed');
        this.handleCase();
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        this.shiftBtn = !this.shiftBtn;
        document.querySelector('button[data-code="ShiftLeft"]').classList.toggle('keyboard__key_pressed');
        document.querySelector('button[data-code="ShiftRight"]').classList.toggle('keyboard__key_pressed');
        this.handleCase();
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
/*    let currPositionSubStr = '';
    let currStrPos = 0;*/

    if (Array.isArray(this.keys[code])) {
      if (this.shiftBtn) {
        [, symbol] = this.keys[code];
        if (this.shiftBtn && this.capsBtn) {
          symbol = symbol.toLowerCase();
        }
      } else if (this.capsBtn) {
        if (this.keys[code][0].match(/[a-zа-яё]/)) {
          [, symbol] = this.keys[code];
          if (this.shiftBtn && this.capsBtn) {
            symbol = symbol.toLowerCase();
          }
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
    switch (code) {
      case 'ControlRight':
      case 'AltRight':
      case 'AltLeft':
        break;
      case 'Backspace':
        this.textarea.value = `${left.slice(0, -1)}${right}`;
        selStart -= 1;
        selEnd = selStart;
        break;
      case 'Delete':
        this.textarea.value = `${left}${right.slice(0, -1)}`;
        break;
      case 'Space':
        this.textarea.value = `${left} ${right}`;
        selStart += 1;
        selEnd = selStart;
        break;
      case 'Tab':
        this.textarea.value = `${left}\t${right}`;
        selStart += 1;
        selEnd = selStart;
        break;
      case 'Enter':
        this.textarea.value = `${left}\n${right}`;
        selStart += 1;
        selEnd = selStart;
        break;
      case 'ArrowLeft':
        selStart = selStart - 1 >= 0 ? selStart - 1 : 0;
        selEnd = selStart;
        break;
      case 'ArrowRight':
        selEnd += 1;
        selStart = selEnd;
        break;
      case 'ArrowUp':
        symbol = '▲';
        selStart += 1;
        selEnd = selStart;
        this.textarea.value = `${left}${symbol || ''}${right}`;
        break;
      case 'ArrowDown':
        symbol = '▼';
        selStart += 1;
        selEnd = selStart;
        this.textarea.value = `${left}${symbol || ''}${right}`;
        break;
      default:
        selStart += 1;
        selEnd = selStart;
        this.textarea.value = `${left}${symbol || ''}${right}`;
    }
    this.textarea.setSelectionRange(selStart, selEnd);
  }

  switchLanguage() {
    this.language = this.language === 'en' ? 'ru' : 'en';
    this.keys = this.language === 'en' ? keysEnglish : keysRussian;
    localStorage.setItem('language', this.language);
    const keyBtns = document.querySelectorAll('.keyboard__key');

    keyBtns.forEach((btn) => {
      const {
        dataset: { code },
      } = btn;
      if (Array.isArray(this.keys[code])) {
        const button = btn;
        if (this.keys[code][0].match(/[a-zа-яё]/)) {
          [button.textContent] = this.keys[code];
        } else {
          let up = btn.querySelector('.up');
          if (up == null) {
            button.textContent = '';
            up = document.createElement('div');
            up.className = 'up';
            btn.appendChild(up);
          }
          [, up.textContent] = this.keys[code];
          let down = btn.querySelector('.down');
          if (down == null) {
            down = document.createElement('div');
            down.className = 'down';
            btn.appendChild(down);
          }
          [down.textContent] = this.keys[code];
        }
      }
    });
  }

  keyHandlerDown(e) {
    playSound();
    if (Object.keys(this.keys).includes(e.code)) {
      if (e.code === 'CapsLock') {
        this.capsBtn = !this.capsBtn;
        document.querySelector('button[data-code="CapsLock"]').classList.toggle('keyboard__key_pressed');
        this.handleCase();
        return;
      }
      switch (e.code) {
        case 'ShiftLeft':
        case 'ShiftRight':
          if (this.shiftBtn) return;
          this.shiftBtn = true;
          if (this.shiftBtn && this.ctrlBtn) {
            this.switchLanguage();
          }
          document.querySelector('button[data-code="ShiftLeft"]').classList.toggle('keyboard__key_pressed');
          document.querySelector('button[data-code="ShiftRight"]').classList.toggle('keyboard__key_pressed');
          this.handleCase();
          break;
        case 'ControlLeft':
          this.ctrlBtn = true;
          if (this.shiftBtn && this.ctrlBtn) {
            this.switchLanguage();
          }
          break;
        default:
          this.outputSymbol(e.code);
      }
      document.querySelector(`button[data-code="${e.code}"]`).classList.add('keyboard__key_pressed');
    }
  }

  keyHandlerUp(e) {
    if (Object.keys(this.keys).includes(e.code)) {
      if (e.code === 'CapsLock') {
        this.handleCase();
        return;
      }

      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        this.shiftBtn = false;
        document.querySelector('button[data-code="ShiftLeft"]').classList.toggle('keyboard__key_pressed');
        document.querySelector('button[data-code="ShiftRight"]').classList.toggle('keyboard__key_pressed');
        this.handleCase();
        return;
        // switchShift();
      }

      if (e.code === 'ControlLeft') {
        this.ctrlBtn = false;
      }
      document.querySelector(`button[data-code="${e.code}"]`).classList.remove('keyboard__key_pressed');
    }
  }
}

export default Keyboard;
