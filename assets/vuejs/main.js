import Vue from 'vue/dist/vue';

window.Vue = Vue;
Vue.component('component-chat-texto', require('./components/ComponentTexto.vue'));

const app = new Vue({
    el: '#vue-app'
});