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

window.sock = io('localhost:9001');

Vue.component('lista-users', {
    template: '\n    <div class="userlist" id="listausers">\n        <div class="tituloUserList" id="userlisttitle">\n            <p>Usu\xE1rios Online</p>\n        </div>\n        <div class="list-users" id="list-users">\n            <a class="usernalista" v-for="(item, index) in users.userson" :key="index" :value="item._id"> {{ item.user }}</a>\n        </div>\n    </div>',
    data: function data() {
        return {
            users: [],
            socket: sock
        };
    },
    mounted: function mounted() {
        this.socket.on('onlineUsers', this.Users);
    },

    methods: {
        Users: function Users(usersdata) {
            this.users = usersdata;
        }
    }
});

Vue.component('grupo', {
    template: '\n        <div class="chat" id="container-chat">\n            <ul class="topbar" id="topbar">\n                <!--<li class="topbar-item-li"> <a class="topbar-item" id="video-call">\uD83D\uDCF9 </a></li>\n                <li class="topbar-item-li"> <a class="topbar-item" id="audio-call">\uD83D\uDCDE</a></li>-->\n                <li class="topbar-item-li"> <p> Conversando no grupo {{ to }} </p></li>\n            </ul>\n            <div id="messages">\n                <div v-for="(item, index) in messages" :key="index" class="message">\n                    <div class="autor">{{ item.fromUsername }}</div>\n                    <div class="messagebody">{{ item.message }}</div>\n                    <hr class="sepadadormensagem">\n                </div>\n            </div>\n            <p class="digitando"> O corno est\xE1 digitando </p>\n            <div class="container">\n                <textarea v-model="message" @keydown.enter.exact.prevent="sendMessage" class="textochat" id="textbox"></textarea>\n                <button @click="sendMessage" class="enviarmensagem" id="send">\u21A9</button>\n            </div>\n        </div>',
    props: { 'from': String, 'to': String },
    data: function data() {
        return {
            message: '',
            messages: [],
            socket: sock
        };
    },
    created: function created() {
        this.socket.emit('join', { _id: this.from });
    },
    mounted: function mounted() {
        this.socket.on('receiveMessage', this.receiveMessage);
    },
    destroyed: function destroyed() {
        this.socket.emit('disconnect', this.from);
    },

    methods: {
        sendMessage: function sendMessage() {
            if (this.message.trim().length > 0) {
                var messagePackage = this.createMsgObj(this.message);
                this.socket.emit('sendMessage', messagePackage);
                this.message = "";
            } else {
                alert("Digite algo antes de enviar :)");
            }
        },
        receiveMessage: function receiveMessage(msg) {
            this.messages.push(msg);
            this.scrollToBottom();
        },
        createMsgObj: function createMsgObj() {
            return {
                fromUserId: this.from,
                to: this.to,
                message: this.message
            };
        },
        scrollToBottom: function scrollToBottom() {
            setTimeout(function () {
                document.querySelector('#messages').scrollTop = document.querySelector('#messages').scrollHeight;
            }, 300);
        }
    }
});

var app = new Vue({
    el: '#app'
});

/***/ })
/******/ ]);