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

window.sock = io(window.location.hostname + ':9001', { secure: true });

Vue.use(axios);

Vue.component('listachat', {
    template: ' \n    <div class="row">\n        <div class="userlist col s3" id="listausers">\n            <div id="friends" v-if="list == \'User\'">\n                <div class="tituloUserList" id="userlisttitle" v-on:click="changeList()">\n                    <a class="waves-effect grey darken-2 white-text btn btngp center" >Usu\xE1rios Online <i class="material-icons">swap_vertical_circle</i></a>\n                </div>\n                <div class="list-users grey darken-2 collection" id="list-users">\n                        <a class="usernalista grey darken-2 white-text collection-item" v-for="(item, index) in friends" :key="index" :value="item._id2" v-on:click="changeChatF(index)">{{item.user[0].nome}}</a>\n                </div>\n            </div>\n            <div id="groups" v-else>\n                <div class="tituloUserList" id="grouplisttitle" v-on:click="changeList()">\n                    <a class="s12 waves-effect grey darken-2 white-text btn btngp center">Grupos <i class="material-icons">swap_vertical_circle</i></a>\n                </div>\n                <div class="list-groups grey darken-2 collection" id="list-groups">\n                    <a class="groupnalista grey darken-2 white-text collection-item" v-for="(item, index) in groups" :key="index" :value="item._id2" v-on:click="changeChatG(index)">{{item._id2}}</a>\n                </div>\n            </div>\n            <div class="center row">\n            <button data-target="modal1" class="waves-effect grey darken-2 grey-text text-lighten-3 waves-light btn modal-trigger">Adicionar amigo</button>\n            </div>\n            <div class="center row">\n            <button data-target="modal2" class="waves-effect grey darken-2 grey-text text-lighten-3 waves-light btn modal-trigger">Criar ou entrar em um grupo</button>\n            </div>\n        </div>\n\n        <div hidden>\n            <audio v-for="(item,index) in voicess" :id="item"></audio>\n        </div>\n        <div class="col s9 center-middle" v-if="selectedChat == undefined"> <p>Selecione um chat ou grupo para come\xE7ar a conversar...</p></div>\n        <div class="chat col s9" id="container-chat" v-if="selectedChat !== undefined">\n        <nav class="grey darken-2 grey-text text-lighten-2">\n            <div class="nav-wrapper">\n            <ul>\n                <li v-if="selectedChat.type == 2"> Conversando no grupo {{ selectedChat._id2 }} </li>\n                <li v-else-if="selectedChat.type == 1"> Conversando com {{ selectedChat.user[0].nome }} </li>\n              </ul>  \n                <ul class="right hide-on-med-and-down" id="topbar">\n                    <li> <a class="topbar-item" @click="startCall(\'video\')" id="video-call"><i class="material-icons">video_call</i></a></li>\n                    <li> <a class="topbar-item" @click="startCall(\'audio\')" id="audio-call"><i class="material-icons">phone</i></a></li>\n                </ul>\n            </div>\n        </nav>\n            <div class="contmessages" id="messages">\n                <div v-for="(item, index) in messages" :key="index" class="message">\n                    <div class="autor">{{ item.fromUsername }}</div>\n                    <div class="messagebody">{{ item.message }}</div>\n                    <hr class="sepadadormensagem">\n                </div>\n            </div>\n            <p class="digitando"> O corno est\xE1 digitando </p>\n            <div class="row">\n                <div class="col s11"> <textarea v-model="message" @keydown.enter.exact.prevent="sendMessage" class="textochat" id="textbox"></textarea></div>\n                <div class="col s1"><button @click="sendMessage" class="white-text waves-effect waves-teal btn-flat btnsend enviarmensagem" id="send"><i class="material-icons">send</i></button></div>\n            </div>\n        </div>\n    </div>',
    props: { 'me': String, 'myname': String },
    data: function data() {
        return {
            friends: [],
            groups: [],
            socket: sock,
            message: '',
            messages: [],
            selectedChat: { _id: '', _id1: '', _id2: '', type: 1 },
            list: "User",
            voices: [],
            voicess: [],
            inCallGroup: false,
            p: new Peer(this.me, {
                host: window.location.hostname,
                port: 9000,
                path: '/peerjs',
                config: {
                    'iceServers': [{
                        urls: 'stun:stun.l.google.com:19302'
                    }]
                }
            }),
            c: ""
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
        this.p.on('open', console.log("Abriu"));
        this.p.on('call', this.onReceiveCall);
        this.socket.on('NewUserCall', this.addUserCall);
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
                    this.messages.push(messagePackage);
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
        },
        startCall: function startCall(type) {
            if (this.selectedChat.type == 1) {
                this.getAudio(function (MediaStream) {
                    self.voicess.push(self.selectedChat._id2);
                    self.voices.push(self.p.call(self.selectedChat._id2, MediaStream));
                    self.voices[0].on('stream', self.onReceiveStream);
                }, function (err) {
                    console.log('Um erro ocorreu ao recuperar seu aúdio: ' + err);
                });
            } else {
                data = { to: this.selectedChat._id2, me: this.me, type: this.selectedChat.type };
                this.socket.emit('join' + type, data);
                this.getAudio(function (MediaStream) {
                    self.voicess.forEach(function (item, key) {
                        self.voices.push(self.p.call(item, MediaStream));
                        console.log(self.voices);
                        self.voices[key].on('stream', self.onReceiveStream);
                    });
                }, function (err) {
                    console.log('Um erro ocorreu ao recuperar seu aúdio: ' + err);
                });
            }
        },
        onReceiveCall: function onReceiveCall(call) {
            var aceitou = '';
            if (this.selectedChat.type == 1) {
                aceitou = confirm("Você está sendo chamado por " + call.peer + ", gostaria de aceitar a chamada?");
            } else {
                aceitou = true;
            }
            if (aceitou) {
                this.getAudio(function (MediaStream) {
                    call.answer(MediaStream);
                }, function (err) {
                    console.log(err);
                });
            } else {
                call.close();
            }
            this.c = call.peer;
            call.on('stream', this.onReceiveStream);
        },
        getAudio: function getAudio(successCallback, errorCallback) {
            navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            }).then(successCallback).catch(errorCallback);
        },
        onReceiveStream: function onReceiveStream(stream) {
            if (this.selectedChat.type == 1) {
                var audio = document.getElementById(this.selectedChat._id2);
                audio.srcObject = stream;
                audio.onloadedmetadata = function (e) {
                    audio.play();
                };
            } else {
                var audio = document.getElementById(self.c);
                audio.srcObject = stream;
                audio.onloadedmetadata = function (e) {
                    audio.play();
                };
            }
        },
        addUserCall: function addUserCall(users) {
            this.voicess = users;
            console.log(users);
        }
    }
});
var app = new Vue({
    el: '#app'
});

/***/ })
/******/ ]);