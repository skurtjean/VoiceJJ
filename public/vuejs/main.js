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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
window.Vue = Vue;

window.axios = axios;

window.sock = io(window.location.hostname + ':9001', { secure: true });

Vue.use(axios);

Vue.component('listachat', __webpack_require__(6));
var app = new Vue({
    el: '#app'
});

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(7)
/* script */
var __vue_script__ = __webpack_require__(8)
/* template */
var __vue_template__ = __webpack_require__(9)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "assets/vuejs/components/ComponentPrincipal.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fb62c9a8", Component.options)
  } else {
    hotAPI.reload("data-v-fb62c9a8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = {
    props: ['me', 'myname'],
    data: function data() {
        return {
            socket: sock,
            friends: [],
            groups: [],
            selectedChat: {},
            message: '',
            messages: [],
            messagess: [],
            list: "User",
            voices: [],
            voicess: [],
            videos: [],
            videoss: [],
            Video1X1: false,
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
        axios.get('/user/getFriends?me=' + this.me).then(function (response) {
            self.friends = response.data;
            self.friends.forEach(function (item, key) {
                self.messages.push(new Array());
                self.messagess.push(item._id2);
            });
            self.selectedChat = self.friends[0];
            self.getChatIndex(self.selectedChat._id2).then(function (id) {
                self.selectedChat.index = id;
            });
        });
        axios.get('/user/getGroups?me=' + this.me).then(function (response) {
            self.groups = response.data;
            self.groups.forEach(function (item, key) {
                self.messages.push(new Array());
                self.messagess.push(item._id2);
            });
        });
        this.socket.emit('join', { _id: this.me });
        sideNav();
    },
    mounted: function mounted() {
        this.socket.on('receiveMessage', this.receiveMessage);
        this.p.on('open', console.log("Abriu"));
        this.p.on('call', this.onReceiveCall);
        this.socket.on('NewUserCall', this.addUserCall);
        this.socket.on('CallVideo', this.changeVideo);
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
                    if (this.messages[this.selectedChat._id2] == undefined) {
                        this.messages[this.selectedChat._id2] = [];
                    }
                    this.messages[this.selectedChat.index].push(messagePackage);
                } else {
                    this.socket.emit('sendMessageG', messagePackage);
                    if (this.messages[this.selectedChat._id2] == undefined) {
                        this.messages[this.selectedChat._id2] = [];
                    }
                    this.messages[this.selectedChat.index].push(messagePackage);
                }
                this.message = "";
            } else {
                alert("Digite algo antes de enviar :)");
            }
        },
        receiveMessage: function receiveMessage(msg) {
            if (this.me != msg.fromUserId) {
                if (msg.to != this.me) {
                    this.getChatIndex(msg.to).then(function (id) {
                        self.messages[id].push(msg);
                        self.scrollToBottom();
                    });
                } else {
                    this.getChatIndex(msg.fromUserId).then(function (id) {
                        self.messages[id].push(msg);
                        self.scrollToBottom();
                    });
                }
            }
        },
        createMsgObj: function createMsgObj(message) {
            return {
                fromUserId: this.me,
                fromUsername: this.myname,
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
            this.getChatIndex(this.selectedChat._id2).then(function (id) {
                self.selectedChat.index = id;
            });
        },
        changeChatG: function changeChatG(id) {
            this.selectedChat = this.groups[id];
            this.getChatIndex(this.selectedChat._id2).then(function (id) {
                self.selectedChat.index = id;
            });
            var data = { to: this.selectedChat._id2 };
            this.socket.emit('joinG', data);
        },
        startCall: function startCall(type) {
            if (this.selectedChat.type == 1) {
                if (type == "audio") {
                    this.getAudio(function (MediaStream) {
                        self.voicess.push(self.selectedChat._id2);
                        self.voices.push(self.p.call(self.selectedChat._id2, MediaStream));
                        self.voices[0].on('stream', self.onReceiveStream);
                        self.c = self.selectedChat._id2;
                    }, function (err) {
                        console.log('Um erro ocorreu ao recuperar seu aúdio: ' + err);
                    });
                } else {
                    this.getAudio(function (MediaStream) {
                        self.videoss.push(self.selectedChat._id2);
                        self.videos.push(self.p.call(self.selectedChat._id2, MediaStream));
                        self.videos[0].on('stream', self.onReceiveStream);
                        self.c = self.selectedChat._id2;
                        var data = { to: self.selectedChat._id2 };
                        self.socket.emit('callVideo', data);
                    }, function (err) {
                        console.log('Um erro ocorreu ao recuperar seu aúdio: ' + err);
                    });
                }
            } else {
                var data = { to: this.selectedChat._id2, me: this.me, type: this.selectedChat.type };
                this.inCallGroup = true;
                this.socket.emit('join' + type, data);
                this.getAudio(function (MediaStream) {
                    self.voicess.forEach(function (item, key) {
                        if (item != self.me) {
                            self.voices.push(self.p.call(item, MediaStream));
                            self.voices[key].on('stream', self.onReceiveStream);
                            self.c = item;
                        }
                    });
                    self.videoss.forEach(function (item, key) {
                        if (item != self.me) {
                            self.videos.push(self.p.call(item, MediaStream));
                            self.videos[key].on('stream', self.onReceiveStream);
                            self.c = item;
                        }
                    });
                }, function (err) {
                    console.log('Um erro ocorreu ao recuperar seu aúdio: ' + err);
                });
            }
            collapsible();
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
            if (this.selectedChat.type == 1) {
                espera(500);
                if (self.callEmVideo()) {
                    self.videoss.push(call.peer);
                    self.videos.push(call);
                    self.videos[0].on('stream', self.onReceiveStream);
                } else {
                    self.voicess.push(call.peer);
                    self.voices.push(call);
                    self.voices[0].on('stream', self.onReceiveStream);
                }
            }
            this.c = call.peer;
            call.on('stream', this.onReceiveStream);
            collapsible();
        },
        getAudio: function getAudio(successCallback, errorCallback) {
            navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true
            }).then(successCallback).catch(errorCallback);
        },
        onReceiveStream: function onReceiveStream(stream) {
            if (this.selectedChat.type == 1) {
                var audio = document.getElementById(self.c);
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
            if (this.inCallGroup) {
                this.voicess = users[0];
                this.videoss = users[1];
            }
        },
        changeVideo: function changeVideo() {
            this.Video1X1 = true;
        },
        getChatIndex: function getChatIndex(id) {
            return new Promise(function (resolve, reject) {
                self.messagess.forEach(function (item, key) {
                    if (item == id) {
                        resolve(key);
                    }
                });
            });
        },
        callEmVideo: function callEmVideo() {
            return this.Video1X1;
        }
    }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "row" }, [
    _c(
      "div",
      { attrs: { hidden: "" } },
      _vm._l(_vm.voicess, function(item, index) {
        return _c("audio", { attrs: { id: item } })
      }),
      0
    ),
    _vm._v(" "),
    _vm.selectedChat == undefined
      ? _c("div", { staticClass: "col s12 center-middle" }, [
          _c("nav", { staticClass: "grey darken-1 grey-text text-lighten-2" }, [
            _c("div", { staticClass: "nav-wrapper" }, [
              _vm._m(0),
              _vm._v(" "),
              _c(
                "ul",
                {
                  staticClass: "sidenav grey darken-1 grey-text text-lighten-2",
                  attrs: { id: "slide-out" }
                },
                [
                  _c("li", [
                    _vm.list == "User"
                      ? _c("div", { attrs: { id: "friends" } }, [
                          _c(
                            "div",
                            {
                              staticClass: "tituloUserList",
                              attrs: { id: "userlisttitle" },
                              on: {
                                click: function($event) {
                                  return _vm.changeList()
                                }
                              }
                            },
                            [_vm._m(1)]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "list-users grey darken-2 collection",
                              attrs: { id: "list-users" }
                            },
                            _vm._l(_vm.friends, function(item, index) {
                              return _c(
                                "a",
                                {
                                  key: index,
                                  staticClass:
                                    "usernalista grey darken-2 white-text collection-item",
                                  attrs: { value: item._id2 },
                                  on: {
                                    click: function($event) {
                                      return _vm.changeChatF(index)
                                    }
                                  }
                                },
                                [_vm._v(_vm._s(item.user[0].nome))]
                              )
                            }),
                            0
                          )
                        ])
                      : _c("div", { attrs: { id: "groups" } }, [
                          _c(
                            "div",
                            {
                              staticClass: "tituloUserList",
                              attrs: { id: "grouplisttitle" },
                              on: {
                                click: function($event) {
                                  return _vm.changeList()
                                }
                              }
                            },
                            [_vm._m(2)]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "list-groups grey darken-2 collection",
                              attrs: { id: "list-groups" }
                            },
                            _vm._l(_vm.groups, function(item, index) {
                              return _c(
                                "a",
                                {
                                  key: index,
                                  staticClass:
                                    "groupnalista grey darken-2 white-text collection-item",
                                  attrs: { value: item._id2 },
                                  on: {
                                    click: function($event) {
                                      return _vm.changeChatG(index)
                                    }
                                  }
                                },
                                [_vm._v(_vm._s(item._id2))]
                              )
                            }),
                            0
                          )
                        ]),
                    _vm._v(" "),
                    _vm._m(3),
                    _vm._v(" "),
                    _vm._m(4)
                  ])
                ]
              )
            ])
          ]),
          _vm._v(" "),
          _c("p", [
            _vm._v(
              "\r\n            Selecione um chat ou grupo para começar a conversar..."
            )
          ])
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.selectedChat !== undefined
      ? _c(
          "div",
          { staticClass: "chat col s12", attrs: { id: "container-chat" } },
          [
            _c(
              "div",
              { attrs: { id: "topside", onresize: "arrumarAltura()" } },
              [
                _vm.voicess[0] !== undefined || _vm.videoss[0] !== undefined
                  ? _c(
                      "ul",
                      {
                        staticClass:
                          "collapsible grey darken-1 grey-text text-lighten-2"
                      },
                      [
                        _c(
                          "li",
                          [
                            _vm._m(5),
                            _vm._v(" "),
                            _vm._l(_vm.videoss, function(item, index) {
                              return _c("video", { attrs: { id: item } })
                            })
                          ],
                          2
                        )
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "nav",
                  { staticClass: "grey darken-1 grey-text text-lighten-2" },
                  [
                    _c("div", { staticClass: "nav-wrapper" }, [
                      _c("ul", [
                        _vm._m(6),
                        _vm._v(" "),
                        _vm.selectedChat.type == 2
                          ? _c("li", [
                              _vm._v(
                                " Conversando no grupo " +
                                  _vm._s(_vm.selectedChat._id2) +
                                  " "
                              )
                            ])
                          : _vm.selectedChat.type == 1
                          ? _c("li", [
                              _vm._v(
                                " Conversando com " +
                                  _vm._s(_vm.selectedChat.user[0].nome) +
                                  " "
                              )
                            ])
                          : _vm._e()
                      ]),
                      _vm._v(" "),
                      _c(
                        "ul",
                        { staticClass: "right", attrs: { id: "topbar" } },
                        [
                          _c("li", [
                            _c(
                              "a",
                              {
                                staticClass: "topbar-item",
                                attrs: { id: "video-call" },
                                on: {
                                  click: function($event) {
                                    return _vm.startCall("Video")
                                  }
                                }
                              },
                              [
                                _c("i", { staticClass: "material-icons" }, [
                                  _vm._v("video_call")
                                ])
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _c("li", [
                            _c(
                              "a",
                              {
                                staticClass: "topbar-item",
                                attrs: { id: "audio-call" },
                                on: {
                                  click: function($event) {
                                    return _vm.startCall("audio")
                                  }
                                }
                              },
                              [
                                _c("i", { staticClass: "material-icons" }, [
                                  _vm._v("phone")
                                ])
                              ]
                            )
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "ul",
                        {
                          staticClass:
                            "sidenav center-middle grey darken-1 grey-text text-lighten-2",
                          attrs: { id: "slide-out" }
                        },
                        [
                          _c("li", [
                            _vm.list == "User"
                              ? _c("div", { attrs: { id: "friends" } }, [
                                  _c(
                                    "div",
                                    {
                                      staticClass: "tituloUserList",
                                      attrs: { id: "userlisttitle" },
                                      on: {
                                        click: function($event) {
                                          return _vm.changeList()
                                        }
                                      }
                                    },
                                    [_vm._m(7)]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    {
                                      staticClass:
                                        "list-users grey darken-2 collection",
                                      attrs: { id: "list-users" }
                                    },
                                    _vm._l(_vm.friends, function(item, index) {
                                      return _c(
                                        "a",
                                        {
                                          key: index,
                                          staticClass:
                                            "usernalista grey darken-2 white-text collection-item",
                                          attrs: { value: item._id2 },
                                          on: {
                                            click: function($event) {
                                              return _vm.changeChatF(index)
                                            }
                                          }
                                        },
                                        [_vm._v(_vm._s(item.user[0].nome))]
                                      )
                                    }),
                                    0
                                  )
                                ])
                              : _c("div", { attrs: { id: "groups" } }, [
                                  _c(
                                    "div",
                                    {
                                      staticClass: "tituloUserList",
                                      attrs: { id: "grouplisttitle" },
                                      on: {
                                        click: function($event) {
                                          return _vm.changeList()
                                        }
                                      }
                                    },
                                    [_vm._m(8)]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    {
                                      staticClass:
                                        "list-groups grey darken-2 collection",
                                      attrs: { id: "list-groups" }
                                    },
                                    _vm._l(_vm.groups, function(item, index) {
                                      return _c(
                                        "a",
                                        {
                                          key: index,
                                          staticClass:
                                            "groupnalista grey darken-2 white-text collection-item",
                                          attrs: { value: item._id2 },
                                          on: {
                                            click: function($event) {
                                              return _vm.changeChatG(index)
                                            }
                                          }
                                        },
                                        [_vm._v(_vm._s(item._id2))]
                                      )
                                    }),
                                    0
                                  )
                                ]),
                            _vm._v(" "),
                            _vm._m(9),
                            _vm._v(" "),
                            _vm._m(10)
                          ])
                        ]
                      )
                    ])
                  ]
                )
              ]
            ),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "contmessages",
                attrs: { onresize: "arrumarAltura()", id: "messages" }
              },
              _vm._l(_vm.messages[_vm.selectedChat.index], function(
                item,
                index
              ) {
                return _c("div", { key: index, staticClass: "message" }, [
                  _c("div", { staticClass: "autor" }, [
                    _vm._v(_vm._s(item.fromUsername))
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "messagebody" }, [
                    _vm._v(_vm._s(item.message))
                  ]),
                  _vm._v(" "),
                  _c("hr", { staticClass: "sepadadormensagem" })
                ])
              }),
              0
            ),
            _vm._v(" "),
            _c("div", { staticClass: "escrever row" }, [
              _c("div", { staticClass: "col s11" }, [
                _c("textarea", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.message,
                      expression: "message"
                    }
                  ],
                  staticClass: "textochat",
                  attrs: { id: "textbox" },
                  domProps: { value: _vm.message },
                  on: {
                    keydown: function($event) {
                      if (
                        !$event.type.indexOf("key") &&
                        _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                      ) {
                        return null
                      }
                      if (
                        $event.ctrlKey ||
                        $event.shiftKey ||
                        $event.altKey ||
                        $event.metaKey
                      ) {
                        return null
                      }
                      $event.preventDefault()
                      return _vm.sendMessage($event)
                    },
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.message = $event.target.value
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col s1" }, [
                _c(
                  "button",
                  {
                    staticClass:
                      "white-text waves-effect waves-teal btn-flat btnsend enviarmensagem",
                    attrs: { id: "send" },
                    on: { click: _vm.sendMessage }
                  },
                  [_c("i", { staticClass: "material-icons" }, [_vm._v("send")])]
                )
              ])
            ])
          ]
        )
      : _vm._e()
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("ul", [
      _c("li", [
        _c(
          "a",
          {
            staticClass: "show-on-medium-and-up sidenav-trigger",
            attrs: { href: "#", "data-target": "slide-out" }
          },
          [_c("i", { staticClass: "material-icons" }, [_vm._v("menu")])]
        )
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "a",
      { staticClass: "waves-effect grey darken-2 white-text btngp center" },
      [
        _vm._v("Usuários Online "),
        _c("i", { staticClass: "material-icons" }, [
          _vm._v("swap_vertical_circle")
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "a",
      { staticClass: "s12 waves-effect grey darken-2 white-text btngp center" },
      [
        _vm._v("Grupos "),
        _c("i", { staticClass: "material-icons" }, [
          _vm._v("swap_vertical_circle")
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "center row" }, [
      _c(
        "button",
        {
          staticClass:
            "waves-effect grey darken-2 grey-text text-lighten-3 waves-light btn modal-trigger",
          attrs: { "data-target": "modal1" }
        },
        [_vm._v("Adicionar\r\n                                amigo")]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "center row" }, [
      _c(
        "button",
        {
          staticClass:
            "waves-effect grey darken-2 grey-text text-lighten-3 waves-light btn modal-trigger",
          attrs: { "data-target": "modal2" }
        },
        [
          _vm._v(
            "Criar\r\n                                ou entrar em um grupo"
          )
        ]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "collapsible-header grey darken-1 " }, [
      _c("i", { staticClass: "material-icons" }, [_vm._v("call")]),
      _vm._v("Em chamada")
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("li", [
      _c(
        "a",
        {
          staticClass: "show-on-medium-and-up topbar-item sidenav-trigger",
          attrs: { href: "#", "data-target": "slide-out" }
        },
        [_c("i", { staticClass: "material-icons" }, [_vm._v("menu")])]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "a",
      { staticClass: "waves-effect grey darken-2 white-text btngp center" },
      [
        _vm._v("Usuários Online "),
        _c("i", { staticClass: "material-icons" }, [
          _vm._v("swap_vertical_circle")
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "a",
      { staticClass: "s12 waves-effect grey darken-2 white-text btngp center" },
      [
        _vm._v("Grupos "),
        _c("i", { staticClass: "material-icons" }, [
          _vm._v("swap_vertical_circle")
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "center row" }, [
      _c(
        "button",
        {
          staticClass:
            "waves-effect grey darken-2 grey-text text-lighten-3 waves-light btn modal-trigger",
          attrs: { "data-target": "modal1" }
        },
        [_vm._v("Adicionar\r\n                            amigo")]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "center row" }, [
      _c(
        "button",
        {
          staticClass:
            "waves-effect grey darken-2 grey-text text-lighten-3 waves-light btn modal-trigger",
          attrs: { "data-target": "modal2" }
        },
        [_vm._v("Criar\r\n                            ou entrar em um grupo")]
      )
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-fb62c9a8", module.exports)
  }
}

/***/ })
/******/ ]);