// import createjs from 'createjs/builds/createjs-2015.11.26.min.js'; // https://stackoverflow.com/questions/47540846/dependency-not-found-even-defined-in-package-json-and-node-modules

import Vue from 'vue';

import { Howl, Howler } from 'howler';
import * as PIXI from 'pixi.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faUserSecret);
global.PIXI = PIXI;
require('pixi-projection');
// const renderer = PIXI.autoDetectRenderer();

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
// import { createjs } from 'createjs/builds/createjs-2015.11.26.min.js';

// import Howler from 'howler';

// Vue.use(renderer);
Vue.use(Howl);
Vue.use(Howler);
// Vue.use(createjs);
