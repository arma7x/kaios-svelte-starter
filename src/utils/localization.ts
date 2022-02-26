import { sprintf } from 'sprintf-js'; // https://github.com/alexei/sprintf.js

interface Translation {
  [key: string]: string;
}

interface Locale {
  [locale: string]: Translation;
}

class Localization {

  locales: Locale = {};
  namespace: string;
  defaultLocale: string;

  constructor(locale: string, namespace: string) {
    this.defaultLocale = locale;
    this.namespace = namespace;
    this.loadLocale(this.defaultLocale);
  }

  loadLocale(locale: string, cache: boolean = true, origin: string = document.location.origin): boolean {
    if (cache && this.locales[locale] != null) {
      this.defaultLocale = locale;
      console.log('Cache', this.locales[this.defaultLocale]);
      return true;
    } else {
      const url = [];
      url.push(origin);
      if (this.namespace !== '' && origin === document.location.origin)
        url.push(this.namespace);
      url.push(`${locale}.json`);
      console.log('Locale URL:', url.join('/'));
      const request = new XMLHttpRequest();
      request.open('GET', url.join('/'), false);
      request.send(null);
      if (request.readyState === 4 && request.status >= 200 && request.status <= 399) {
        this.defaultLocale = locale;
        this.locales[this.defaultLocale] = JSON.parse(request.responseText);
        console.log('Lazy Loading:', this.locales[this.defaultLocale]);
        return true;
      } else if (request.readyState === 4) {
        return false;
      }
    }
  }

  lang(key: string, ...args: any): string | boolean {
    const line = this.locales[this.defaultLocale][key];
    if (line == null)
      return false;
    return sprintf(line, ...args);
  }

}

export {
  Localization
}
