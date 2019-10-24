<template>
<div class="row">
    <div hidden>
        <audio v-for="(item,index) in voicess" :id="item"></audio>
    </div>
    <div class="col s12 center-middle" v-if="selectedChat == undefined">
    <nav class="grey darken-1 grey-text text-lighten-2">
            <div class="nav-wrapper">
            <ul>
            <li><a href="#" data-target="slide-out" class="show-on-medium-and-up sidenav-trigger"><i class="material-icons">menu</i></a>
            </li>
            </ul>
            <ul id="slide-out" class="sidenav grey darken-1 grey-text text-lighten-2">
                    <li>
                        <div id="friends" v-if="list == 'User'">
                            <div class="tituloUserList" id="userlisttitle" v-on:click="changeList()">
                                <a class="waves-effect grey darken-2 white-text btngp center">Usuários Online <i
                                        class="material-icons">swap_vertical_circle</i></a>
                            </div>
                            <div class="list-users grey darken-2 collection" id="list-users">
                                <a class="usernalista grey darken-2 white-text collection-item"
                                    v-for="(item, index) in friends" :key="index" :value="item._id2"
                                    v-on:click="changeChatF(index)">{{item.user[0].nome}}</a>
                            </div>
                        </div>
                        <div id="groups" v-else>
                            <div class="tituloUserList" id="grouplisttitle" v-on:click="changeList()">
                                <a class="s12 waves-effect grey darken-2 white-text btngp center">Grupos <i
                                        class="material-icons">swap_vertical_circle</i></a>
                            </div>
                            <div class="list-groups grey darken-2 collection" id="list-groups">
                                <a class="groupnalista grey darken-2 white-text collection-item"
                                    v-for="(item, index) in groups" :key="index" :value="item._id2"
                                    v-on:click="changeChatG(index)">{{item._id2}}</a>
                            </div>
                        </div>
                        <div class="center row">
                            <button data-target="modal1"
                                class="waves-effect grey darken-2 grey-text text-lighten-3 waves-light btn modal-trigger">Adicionar
                                amigo</button>
                        </div>
                        <div class="center row">
                            <button data-target="modal2"
                                class="waves-effect grey darken-2 grey-text text-lighten-3 waves-light btn modal-trigger">Criar
                                ou entrar em um grupo</button>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
        <p>
            Selecione um chat ou grupo para começar a conversar...</p>
    </div>
    <div class="chat col s12" id="container-chat" v-if="selectedChat !== undefined">
    <div id="topside" onresize="arrumarAltura()" >
        <ul class="collapsible grey darken-1 grey-text text-lighten-2" v-if="voicess[0] !== undefined || videoss[0] !== undefined">
        <li>
            <div class="collapsible-header grey darken-1 "><i class="material-icons">call</i>Em chamada</div>
            <video v-for="(item,index) in videoss" :id="item"></video>
        </li>
        </ul>
        <nav class="grey darken-1 grey-text text-lighten-2">
            <div class="nav-wrapper">
            <ul> <li><a href="#" data-target="slide-out" class="show-on-medium-and-up topbar-item sidenav-trigger"><i class="material-icons">menu</i></a></li>
                
                    <li v-if="selectedChat.type == 2"> Conversando no grupo {{ selectedChat._id2 }} </li>
                    <li v-else-if="selectedChat.type == 1"> Conversando com {{ selectedChat.user[0].nome }} </li>
                </ul>
                <ul class="right" id="topbar">
                    <li> <a class="topbar-item" @click="startCall('Video')" id="video-call"><i
                                class="material-icons">video_call</i></a></li>
                    <li> <a class="topbar-item" @click="startCall('audio')" id="audio-call"><i
                                class="material-icons">phone</i></a></li>
                </ul>
                <ul id="slide-out" class="sidenav center-middle grey darken-1 grey-text text-lighten-2">
                <li>
                    <div id="friends" v-if="list == 'User'">
                        <div class="tituloUserList" id="userlisttitle" v-on:click="changeList()">
                            <a class="waves-effect grey darken-2 white-text btngp center">Usuários Online <i
                                    class="material-icons">swap_vertical_circle</i></a>
                        </div>
                        <div class="list-users grey darken-2 collection" id="list-users">
                            <a class="usernalista grey darken-2 white-text collection-item"
                                v-for="(item, index) in friends" :key="index" :value="item._id2"
                                v-on:click="changeChatF(index)">{{item.user[0].nome}}</a>
                        </div>
                    </div>
                    <div id="groups" v-else>
                        <div class="tituloUserList" id="grouplisttitle" v-on:click="changeList()">
                            <a class="s12 waves-effect grey darken-2 white-text btngp center">Grupos <i
                                    class="material-icons">swap_vertical_circle</i></a>
                        </div>
                        <div class="list-groups grey darken-2 collection" id="list-groups">
                            <a class="groupnalista grey darken-2 white-text collection-item"
                                v-for="(item, index) in groups" :key="index" :value="item._id2"
                                v-on:click="changeChatG(index)">{{item._id2}}</a>
                        </div>
                    </div>
                    <div class="center row">
                        <button data-target="modal1"
                            class="waves-effect grey darken-2 grey-text text-lighten-3 waves-light btn modal-trigger">Adicionar
                            amigo</button>
                    </div>
                    <div class="center row">
                        <button data-target="modal2"
                            class="waves-effect grey darken-2 grey-text text-lighten-3 waves-light btn modal-trigger">Criar
                            ou entrar em um grupo</button>
                    </div>
                </li>
            </ul>
            </div>
        </nav>
        </div>
        <div class="contmessages" onresize="arrumarAltura()" id="messages">
            <div v-for="(item, index) in messages[selectedChat.index]" :key="index" class="message">
                <div class="autor">{{ item.fromUsername }}</div>
                <div class="messagebody">{{ item.message }}</div>
                <hr class="sepadadormensagem">
            </div>
        </div>
        <div class="escrever row">
            <div class="col s11"> <textarea v-model="message" @keydown.enter.exact.prevent="sendMessage"
                    class="textochat" id="textbox"></textarea></div>
            <div class="col s1"><button @click="sendMessage"
                    class="white-text waves-effect waves-teal btn-flat btnsend enviarmensagem" id="send"><i
                        class="material-icons">send</i></button></div>
        </div>
    </div>
</div>
</template>
<script>
module.exports = {
    props: ['me', 'myname'],
    data: function() {
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
            p: new Peer( this.me , {
                host: window.location.hostname,
                port: 9000,
                path: '/peerjs',
                config: {
                'iceServers': [{
                    urls: 'stun:stun.l.google.com:19302'
                    }
                ]
                }
            }),
            c: "",
        }
    },
    created(){
        self = this;
        axios.get('/user/getFriends?me='+this.me, ).then(function(response){
            self.friends = response.data;
            self.friends.forEach(function(item,key){
                self.messages.push(new Array());
                self.messagess.push(item._id2);
            });
            self.selectedChat = self.friends[0];
            self.getChatIndex(self.selectedChat._id2).then(function(id){
                self.selectedChat.index = id;
            })
        });
        axios.get('/user/getGroups?me='+this.me, ).then(function(response){
            self.groups =  response.data;
            self.groups.forEach(function(item,key){
                self.messages.push(new Array());
                self.messagess.push(item._id2);
            });
        })
        this.socket.emit('join', {_id: this.me});
        sideNav();
    },
    mounted(){
        this.socket.on('receiveMessage', this.receiveMessage);
        this.p.on('open', console.log("Abriu"));
        this.p.on('call', this.onReceiveCall);
        this.socket.on('NewUserCall', this.addUserCall);
        this.socket.on('CallVideo', this.changeVideo);
    },
    destroyed(){
        this.socket.emit('disconnect', this.from);
    },
    methods: {
        sendMessage() {
            if (this.message.trim().length > 0) {
                let messagePackage = this.createMsgObj(this.message);
                if(this.selectedChat.type == 1){
                    this.socket.emit('sendMessageF', messagePackage);
                    if(this.messages[this.selectedChat._id2] == undefined){
                        this.messages[this.selectedChat._id2] = [];
                    }
                    this.messages[this.selectedChat.index].push(messagePackage);
                }
                else{
                    this.socket.emit('sendMessageG', messagePackage);
                    if(this.messages[this.selectedChat._id2] == undefined){
                        this.messages[this.selectedChat._id2] = [];
                    }
                    this.messages[this.selectedChat.index].push(messagePackage);
                }
                this.message = "";
            }else{
                alert("Digite algo antes de enviar :)");
            }
        },
        receiveMessage(msg) {
            if(this.me != msg.fromUserId){
                if(msg.to != this.me){
                    this.getChatIndex(msg.to).then(function(id){
                        self.messages[id].push(msg);
                        self.scrollToBottom();
                    });
                }
                else{
                    this.getChatIndex(msg.fromUserId).then(function(id){
                        self.messages[id].push(msg);
                        self.scrollToBottom();
                    });
                }
            }
        },
        createMsgObj(message) {
            return {
                fromUserId: this.me,
                fromUsername: this.myname,
                to: this.selectedChat._id2,
                message: message
            }
        },
        scrollToBottom() {
            setTimeout(function() {
                document.querySelector('#messages').scrollTop = document.querySelector('#messages').scrollHeight
            },300)
        },
        changeList() {
            if(this.list == "Group"){
                this.list = "User";
            }
            else{
                this.list = "Group";
            }
        },
        changeChatF(id) {
            this.selectedChat = this.friends[id];
            this.getChatIndex(this.selectedChat._id2).then(function(id){
                self.selectedChat.index = id;
            })
        },
        changeChatG(id) {
            this.selectedChat = this.groups[id];
            this.getChatIndex(this.selectedChat._id2).then(function(id){
                self.selectedChat.index = id;
            });
            var data = {to: this.selectedChat._id2};
            this.socket.emit('joinG', data);
        },
        startCall(type){
            if(this.selectedChat.type == 1){
                if(type == "audio"){
                    this.getAudio(function (MediaStream) {
                        self.voicess.push(self.selectedChat._id2);
                        self.voices.push(self.p.call(self.selectedChat._id2, MediaStream));
                        self.voices[0].on('stream', self.onReceiveStream);
                        self.c = self.selectedChat._id2;
                    }, function (err) {
                        console.log('Um erro ocorreu ao recuperar seu aúdio: '+err);
                    });
                }
                else{
                    this.getAudio(function (MediaStream) {
                        self.videoss.push(self.selectedChat._id2);
                        self.videos.push(self.p.call(self.selectedChat._id2, MediaStream));
                        self.videos[0].on('stream', self.onReceiveStream);
                        self.c = self.selectedChat._id2;
                        var data = { to: self.selectedChat._id2 };
                        self.socket.emit('callVideo', data);
                    }, function (err) {
                        console.log('Um erro ocorreu ao recuperar seu aúdio: '+err);
                    });
                }
            }
            else{
                var data = { to: this.selectedChat._id2, me: this.me, type: this.selectedChat.type };
                this.inCallGroup = true;
                this.socket.emit('join'+type, data);
                this.getAudio(function (MediaStream) {
                    self.voicess.forEach(function(item, key){
                        if(item != self.me){
                            self.voices.push(self.p.call(item, MediaStream));
                            self.voices[key].on('stream', self.onReceiveStream);
                            self.c = item;
                        }
                    });
                    self.videoss.forEach(function(item, key){
                        if(item != self.me){
                            self.videos.push(self.p.call(item, MediaStream));
                            self.videos[key].on('stream', self.onReceiveStream);
                            self.c = item;
                        }
                    });
                }, function (err) {
                    console.log('Um erro ocorreu ao recuperar seu aúdio: '+err);
                });
            }
            collapsible();
        },
        onReceiveCall(call) {
            var aceitou = '';
            if(this.selectedChat.type == 1){
                aceitou = confirm("Você está sendo chamado por " + call.peer + ", gostaria de aceitar a chamada?")
            }
            else{
                aceitou = true;
            }
            if (aceitou) {
                this.getAudio(
                    function (MediaStream) {
                        call.answer(MediaStream);
                    },
                    function (err) {
                        console.log(err);
                    }
                );
            } 
            else {
                call.close();
            }
            if(this.selectedChat.type == 1){
                espera(500);
                if(self.callEmVideo()){    
                    self.videoss.push(call.peer);
                    self.videos.push(call);
                    self.videos[0].on('stream', self.onReceiveStream);
                }
                else{
                    self.voicess.push(call.peer);
                    self.voices.push(call);
                    self.voices[0].on('stream', self.onReceiveStream);
                }
            }
            this.c = call.peer;
            call.on('stream', this.onReceiveStream);
            collapsible();
        },
        getAudio(successCallback, errorCallback) {
            navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true
            }).then(successCallback).catch(errorCallback);
        },
        onReceiveStream(stream) {
            if(this.selectedChat.type == 1){
                var audio = document.getElementById(self.c);
                audio.srcObject = stream;
                audio.onloadedmetadata = function (e) {
                    audio.play();
                }
            }
            else{
                var audio = document.getElementById(self.c);
                audio.srcObject = stream;
                audio.onloadedmetadata = function (e) {
                    audio.play();
                }
            }
        },
        addUserCall(users) {
            if(this.inCallGroup){
                this.voicess = users[0];
                this.videoss = users[1];
            }
        },
        changeVideo(){
            this.Video1X1 = true;
        },
        getChatIndex(id){
            return new Promise((resolve, reject) => {
                self.messagess.forEach(function(item,key){
                    if(item == id){
                        resolve(key);
                    }
                })
            })
        },
        callEmVideo(){
            return this.Video1X1;
        }
    }
}
</script>