window.Vue = Vue;

window.axios = axios;

window.sock = io(window.location.hostname+':9001', {secure: true});

Vue.use(axios);

Vue.component('listachat', require('./components/ComponentPrincipal'));
const app = new Vue({
    el: '#app'
});