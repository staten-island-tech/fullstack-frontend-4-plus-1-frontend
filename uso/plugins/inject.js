// import createjs from 'createjs/builds/createjs-2015.11.26.min.js'; // https://stackoverflow.com/questions/47540846/dependency-not-found-even-defined-in-package-json-and-node-modules

// Object.defineProperty(Vue.prototype, '$howlerjs', { value: Howler });

import Vue from 'vue';

import { Howl, Howler } from 'howler';
// import { createjs } from 'createjs/builds/createjs-2015.11.26.min.js';

// import Howler from 'howler';
Vue.use(Howl);
Vue.use(Howler);
// Vue.use(createjs);
