function keydownEventHandler(evt, scope) {
  switch (evt.key) {
    case 'Backspace':
    case 'EndCall':
      scope.backspaceCallback(evt);
      break;
    case 'SoftLeft':
    case 'PageUp':
      scope.softLeftCallback(evt);
      evt.preventDefault();
      break;
    case 'SoftRight':
    case 'PageDown':
      scope.softRightCallback(evt);
      evt.preventDefault();
      break;
    case 'Enter':
      scope.enterCallback(evt);
      break;
    case 'ArrowUp':
      scope.arrowUpCallback(evt);
      break;
    case 'ArrowDown':
      scope.arrowDownCallback(evt);
      break;
    case 'ArrowLeft':
      scope.arrowLeftCallback(evt);
      break;
    case 'ArrowRight':
      scope.arrowRightCallback(evt);
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
  arrowUpCallback: Function = (evt) => {
    if (this.verticalNavClass) {
      evt.preventDefault();
      this.navigateListNav(-1);
    }
  };
  arrowDownCallback: Function = (evt) => {
    if (this.verticalNavClass) {
      evt.preventDefault();
      this.navigateListNav(-1);
    }
  };
  arrowLeftCallback: Function = (evt) => {
    if (this.horizontalNavClass) {
      evt.preventDefault();
      this.navigateTabNav(-1);
    }
  };
  arrowRightCallback: Function = (evt) => {
    if (this.horizontalNavClass) {
      evt.preventDefault();
      this.navigateTabNav(1);
    }
  };
  softLeftCallback: Function = (evt) => {};
  softRightCallback: Function = (evt) => {};
  enterCallback: Function = (evt) => {};
  backspaceCallback: Function = (evt) => {};
 
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
