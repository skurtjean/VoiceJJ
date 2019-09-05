window.Vue = Vue;

window.axios = axios;

window.sock = io(window.location.hostname+':9001', {secure: true});

Vue.use(axios)

Vue.component('listachat', {
    template: ` 
    <div>
        <div class="userlist" id="listausers">
            <div id="friends" v-if="list == 'User'">
                <div class="tituloUserList" id="userlisttitle" v-on:click="changeList()">
                    <p>Usuários Online</p>
                </div>
                <div class="list-users" id="list-users">
                    <a class="usernalista" v-for="(item, index) in friends" :key="index" :value="item._id2" v-on:click="changeChatF(index)">{{item.user[0].nome}}</a>
                </div>
            </div>
            <div id="groups" v-else>
                <div class="tituloUserList" id="grouplisttitle" v-on:click="changeList()">
                    <p>Grupos</p>
                </div>
                <div class="list-groups" id="list-groups">
                    <a class="groupnalista" v-for="(item, index) in groups" :key="index" :value="item._id2" v-on:click="changeChatG(index)">{{item._id2}}</a>
                </div>
            </div>
            <button data-target="modal1" class="btn btn-inicio modal-trigger">Adicionar amigo</button>
            <br>
            <button data-target="modal2" class="btn btn-inicio modal-trigger">Criar ou entrar em um grupo</button>
        </div>

        <audio hidden></audio>
        <div class="chat" id="container-chat" v-if="selectedChat !== undefined">
            <ul class="topbar" id="topbar">
                <li class="topbar-item-li"> <a class="topbar-item" @click="startCall('video')" id="video-call">📹</a></li>
                <li class="topbar-item-li"> <a class="topbar-item" @click="startCall('audio')" id="audio-call">📞</a></li>
                <li v-if="selectedChat.type == 2" class="topbar-item-li"> <p> Conversando no grupo {{ selectedChat._id2 }} </p></li>
                <li v-else-if="selectedChat.type == 1" class="topbar-item-li"> <p> Conversando com {{ selectedChat.user[0].nome }} </p></li>
            </ul>
            <div id="messages">
                <div v-for="(item, index) in messages" :key="index" class="message">
                    <div class="autor">{{ item.fromUsername }}</div>
                    <div class="messagebody">{{ item.message }}</div>
                    <hr class="sepadadormensagem">
                </div>
            </div>
            <p class="digitando"> O corno está digitando </p>
            <div class="container">
                <textarea v-model="message" @keydown.enter.exact.prevent="sendMessage" class="textochat" id="textbox"></textarea>
                <button @click="sendMessage" class="enviarmensagem" id="send">↩</button>
            </div>
        </div>
    </div>`,
    props: {'me': String, 'myname': String},
    data: function(){
        return {
            friends: [],
            groups: [],
            socket: sock,
            message: '',
            messages: [],
            selectedChat: { _id: '', _id1: '', _id2: '', type: 1 },
            list: "User",
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
                }
              ),
            call: '',
        }
    },
    created(){
        self = this;
        this.socket.emit('join', {_id: this.me});
    },
    mounted(){
        axios.get('/channel/getFriends?me='+this.me, ).then(function(response){
            self.friends = response.data;
            self.selectedChat = response.data[0];
        });
        axios.get('/channel/getGroups?me='+this.me, ).then(function(response){
            self.groups = response.data;
        });
        this.socket.on('receiveMessage', this.receiveMessage);
        this.p.on('open', console.log("Abriu"));
        this.p.on('call', this.onReceiveCall);
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
                }
                else{
                    this.socket.emit('sendMessageG', messagePackage);
                }
                this.message = "";
            }else{
                alert("Digite algo antes de enviar :)");
            }
        },
        receiveMessage(msg) {
            this.messages.push(msg);
            this.scrollToBottom();
        },
        createMsgObj(message) {
            return {
                fromUserId: this.me,
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
        },
        changeChatG(id) {
            this.selectedChat = this.groups[id];
            let messagePackage = this.createMsgObj('O cara entrou aqui mano');
            this.socket.emit('joinG', messagePackage);
        },
        startCall(type){
            if(this.selectedChat.type == 1){
                this.getAudio(function (MediaStream) {
                    self.call = self.p.call(self.selectedChat._id2, MediaStream);
                    self.call.on('stream', onReceiveStream);
                }, function (err) {
                    console.log('Um erro ocorreu ao recuperar seu aúdio');
                })
            }
            else{
                data = { to: this.selectedChat._id2, me: this.me, type: this.selectedChat.type };
                this.socket.emit('join'+type, data);
            }
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
            call.on('stream', onReceiveStream);
        },
        getAudio(successCallback, errorCallback) {
            navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            }).then(successCallback).catch(errorCallback);
        },
        onReceiveStream(stream) {
            var audio = document.querySelector('audio');
            audio.srcObject = stream;
            console.log(audio);
            audio.onloadedmetadata = function (e) {
                audio.play();
            }
        }
    }
});
const app = new Vue({
    el: '#app'
});