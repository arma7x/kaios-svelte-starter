function keydownEventHandler(evt, scope) {
  switch (evt.key) {
    case 'Backspace':
    case 'EndCall':
      scope.backspaceListener(evt);
      break;
    case 'SoftLeft':
    case 'PageUp':
      scope.softLeftListener(evt);
      evt.preventDefault();
      break;
    case 'SoftRight':
    case 'PageDown':
      scope.softRightListener(evt);
      evt.preventDefault();
      break;
    case 'Enter':
      scope.enterListener(evt);
      break;
    case 'ArrowUp':
      scope.arrowUpListener(evt);
      break;
    case 'ArrowDown':
      scope.arrowDownListener(evt);
      break;
    case 'ArrowLeft':
      scope.arrowLeftListener(evt);
      break;
    case 'ArrowRight':
      scope.arrowRightListener(evt);
      break;
  }
}

class KaiNavigator {
  private eventHandler: any; // actual is EventListenerObject, any to suppress error
  target: string;
  verticalNavIndex: number = -1;
  verticalNavClass: string;
  horizontalNavIndex: number = -1;
  horizontalNavClass: string;
  arrowUpListener: Function = (evt) => {
    if (this.verticalNavClass) {
      evt.preventDefault();
      this.navigateListNav(-1);
    }
  };
  arrowDownListener: Function = (evt) => {
    if (this.verticalNavClass) {
      evt.preventDefault();
      this.navigateListNav(-1);
    }
  };
  arrowLeftListener: Function = (evt) => {
    if (this.horizontalNavClass) {
      evt.preventDefault();
      this.navigateTabNav(-1);
    }
  };
  arrowRightListener: Function = (evt) => {
    if (this.horizontalNavClass) {
      evt.preventDefault();
      this.navigateTabNav(1);
    }
  };
  softLeftListener: Function = (evt) => {};
  softRightListener: Function = (evt) => {};
  enterListener: Function = (evt) => {};
  backspaceListener: Function = (evt) => {};
 
  constructor(opts = {}) {
    for(const x in opts) {
      if (typeof opts[x] === 'function')
        typeof opts[x];
      this[x] = opts[x];
    }
    this.eventHandler = (evt: any) => {
      keydownEventHandler(evt, this);
    }
  }

  navigateListNav(next) {
    return this.nav(next, 'verticalNavIndex', 'verticalNavClass');
  }

  navigateTabNav(next) {
    return this.nav(next, 'horizontalNavIndex', 'horizontalNavClass');
  }

  nav(next, navIndex, navClass) {
    const currentIndex = this[navIndex];
    const nav = document.getElementsByClassName(this[navClass]);
    if (nav.length === 0) {
      return;
    }
    var move = currentIndex + next;
    var cursor:any = nav[move];
    if (cursor != undefined) {
      cursor.focus();
      this[navIndex] = move;
    } else {
      if (move < 0) {
        move = nav.length - 1;
      } else if (move >= nav.length) {
        move = 0;
      }
      cursor = nav[move];
      cursor.focus();
      this[navIndex] = move;
    }
    cursor.classList.add('focus');
    if (currentIndex > -1 && nav.length > 1) {
      nav[currentIndex].classList.remove('focus');
    }
  }

  attachListener() {
    document.addEventListener('keydown', this.eventHandler);
    setTimeout(() => {
      if (this.verticalNavClass != null)
        this.navigateListNav(1);
      else if (this.horizontalNavClass != null)
        this.navigateTabNav(1);
    }, 100);
  }

  detachListener() {
    document.removeEventListener('keydown', this.eventHandler);
  }
}

const createKaiNavigator = (opts = {}) => {
  return new KaiNavigator(opts);
}

export {
  createKaiNavigator,
  KaiNavigator
}
