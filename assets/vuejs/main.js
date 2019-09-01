window.Vue = Vue;

window.axios = axios;

window.sock = io('localhost:9001');

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


        <div class="chat" id="container-chat">
            <ul class="topbar" id="topbar">
                <!--<li class="topbar-item-li"> <a class="topbar-item" id="video-call">📹 </a></li>
                <li class="topbar-item-li"> <a class="topbar-item" id="audio-call">📞</a></li>-->
                <li v-if="selectedFriend.type == 2" class="topbar-item-li"> <p> Conversando no grupo {{ selectedFriend._id2 }} </p></li>
                <li v-else class="topbar-item-li"> <p> Conversando com {{ selectedFriend.user[0].nome }} </p></li>
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
            socket: sock,
            selectedFriend: {},
            list: "User",
        }
    },
    created(){
        self = this;
        this.socket.emit('join', {_id: this.me});
    },
    mounted(){
        axios.get('/channel/getFriends?me='+this.me, ).then(function(response){
            self.friends = response.data;
            self.selectedFriend = response.data[0];
        });
        axios.get('/channel/getGroups?me='+this.me, ).then(function(response){
            self.groups = response.data;
        });
        this.socket.on('receiveMessage', this.receiveMessage);
    },
    destroyed(){
        this.socket.emit('disconnect', this.from);
    },
    methods: {
        sendMessage() {
            if (this.message.trim().length > 0) {
                let messagePackage = this.createMsgObj(this.message);
                this.socket.emit('sendMessageF', messagePackage);
                this.message = "";
                receiveMessage(messagePackage.message);
            }else{
                alert("Digite algo antes de enviar :)");
            }
        },
        receiveMessage(msg) {
            this.messages.push(msg);
            this.scrollToBottom();
        },
        createMsgObj() {
            return {
                fromUserId: this.me,
                to: this.selectedFriend._id2,
                message: this.message
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
            this.selectedFriend = this.friends[id];
        },
        changeChatG(id) {
            this.selectedFriend = this.groups[id];
        }
    }
});
const app = new Vue({
    el: '#app'
});