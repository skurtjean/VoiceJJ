/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

window.Vue = Vue;

window.axios = axios;

window.sock = io('localhost:9001');

Vue.use(axios);

Vue.component('listachat', {
    template: ' \n    <div>\n        <div class="userlist" id="listausers">\n            <div id="friends" v-if="list == \'User\'">\n                <div class="tituloUserList" id="userlisttitle" v-on:click="changeList()">\n                    <p>Usu\xE1rios Online</p>\n                </div>\n                <div class="list-users" id="list-users">\n                    <a class="usernalista" v-for="(item, index) in friends" :key="index" :value="item._id2" v-on:click="changeChatF(index)">{{item.user[0].nome}}</a>\n                </div>\n            </div>\n            <div id="groups" v-else>\n                <div class="tituloUserList" id="grouplisttitle" v-on:click="changeList()">\n                    <p>Grupos</p>\n                </div>\n                <div class="list-groups" id="list-groups">\n                    <a class="groupnalista" v-for="(item, index) in groups" :key="index" :value="item._id2" v-on:click="changeChatG(index)">{{item._id2}}</a>\n                </div>\n            </div>\n            <button data-target="modal1" class="btn btn-inicio modal-trigger">Adicionar amigo</button>\n            <br>\n            <button data-target="modal2" class="btn btn-inicio modal-trigger">Criar ou entrar em um grupo</button>\n        </div>\n\n\n        <div class="chat" id="container-chat" v-if="selectedChat !== undefined">\n            <ul class="topbar" id="topbar">\n                <!--<li class="topbar-item-li"> <a class="topbar-item" id="video-call">\uD83D\uDCF9 </a></li>\n                <li class="topbar-item-li"> <a class="topbar-item" id="audio-call">\uD83D\uDCDE</a></li>-->\n                <li v-if="selectedChat.type == 2" class="topbar-item-li"> <p> Conversando no grupo {{ selectedChat._id2 }} </p></li>\n                <li v-else-if="selectedChat.type == 1" class="topbar-item-li"> <p> Conversando com {{ selectedChat.user[0].nome }} </p></li>\n            </ul>\n            <div id="messages">\n                <div v-for="(item, index) in messages" :key="index" class="message">\n                    <div class="autor">{{ item.fromUsername }}</div>\n                    <div class="messagebody">{{ item.message }}</div>\n                    <hr class="sepadadormensagem">\n                </div>\n            </div>\n            <p class="digitando"> O corno est\xE1 digitando </p>\n            <div class="container">\n                <textarea v-model="message" @keydown.enter.exact.prevent="sendMessage" class="textochat" id="textbox"></textarea>\n                <button @click="sendMessage" class="enviarmensagem" id="send">\u21A9</button>\n            </div>\n        </div>\n    </div>',
    props: { 'me': String, 'myname': String },
    data: function data() {
        return {
            friends: [],
            groups: [],
            socket: sock,
            message: '',
            messages: [],
            selectedChat: { _id: '', _id1: '', _id2: '', type: 1 },
            list: "User"
        };
    },
    created: function created() {
        self = this;
        this.socket.emit('join', { _id: this.me });
    },
    mounted: function mounted() {
        axios.get('/channel/getFriends?me=' + this.me).then(function (response) {
            self.friends = response.data;
            self.selectedChat = response.data[0];
        });
        axios.get('/channel/getGroups?me=' + this.me).then(function (response) {
            self.groups = response.data;
        });
        this.socket.on('receiveMessage', this.receiveMessage);
    },
    destroyed: function destroyed() {
        this.socket.emit('disconnect', this.from);
    },

    methods: {
        sendMessage: function sendMessage() {
            if (this.message.trim().length > 0) {
                var messagePackage = this.createMsgObj(this.message);
                if (this.selectedChat.type == 1) {
                    this.socket.emit('sendMessageF', messagePackage);
                } else {
                    this.socket.emit('sendMessageG', messagePackage);
                }
                this.message = "";
            } else {
                alert("Digite algo antes de enviar :)");
            }
        },
        receiveMessage: function receiveMessage(msg) {
            this.messages.push(msg);
            this.scrollToBottom();
        },
        createMsgObj: function createMsgObj(message) {
            return {
                fromUserId: this.me,
                to: this.selectedChat._id2,
                message: message
            };
        },
        scrollToBottom: function scrollToBottom() {
            setTimeout(function () {
                document.querySelector('#messages').scrollTop = document.querySelector('#messages').scrollHeight;
            }, 300);
        },
        changeList: function changeList() {
            if (this.list == "Group") {
                this.list = "User";
            } else {
                this.list = "Group";
            }
        },
        changeChatF: function changeChatF(id) {
            this.selectedChat = this.friends[id];
        },
        changeChatG: function changeChatG(id) {
            this.selectedChat = this.groups[id];
            var messagePackage = this.createMsgObj('O cara entrou aqui mano');
            this.socket.emit('joinG', messagePackage);
        }
    }
});
var app = new Vue({
    el: '#app'
});

/***/ })
/******/ ]);