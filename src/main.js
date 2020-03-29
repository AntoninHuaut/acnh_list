import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

const vm = new Vue({
  router,
  store,
  render: h => h(App),
  vuetify,
  created:() => console.log("Instance créée")
});

vm.$mount('#app');
