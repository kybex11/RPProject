const ru = require('./translates/ru.json');
const en = require('./translates/en.json');

let lang = ru;

function getTranslate(name) {
  return lang[name];
}

function toggleLang() {
  lang = (lang === ru) ? en : ru;
}

function getLanguage() {
  return lang === ru ? 'ru' : 'en';
}
