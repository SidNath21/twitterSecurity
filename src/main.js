import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'
import router from './router/routes'

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyDMWc3ihD6c9wbiyF6vkSl8dRw0_yDLzWo",
  authDomain: "twittersecurity-dbc5b.firebaseapp.com",
  projectId: "twittersecurity-dbc5b",
  storageBucket: "twittersecurity-dbc5b.appspot.com",
  messagingSenderId: "294648084368",
  appId: "1:294648084368:web:886563873439749d886515"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
