import Vue from "vue";
import App from "./App.vue";
import createjs from "createjs";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");

Object.defineProperty(Vue.prototype, "$createjs", { value: createjs });
