import Vue from 'vue';
import Howler from 'howler'; // Can replace "Howler" with anything since we're importing two anonymous functions
// import createjs from 'createjs/builds/createjs-2015.11.26.min.js'; // https://stackoverflow.com/questions/47540846/dependency-not-found-even-defined-in-package-json-and-node-modules

Object.defineProperty(Vue.prototype, '$howlerjs', { value: Howler });

// Object.defineProperty(Vue.prototype, '$createjs', { value: createjs });
