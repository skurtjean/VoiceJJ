window.Vue = Vue;

Vue.component('grupo',{
    template: `
        <div class="chat" id="container-chat">
            <ul class="topbar" id="topbar">
                <li class="topbar-item-li"> <a class="topbar-item" id="video-call">📹 </a></li>
                <li class="topbar-item-li"> <a class="topbar-item" id="audio-call">📞</a></li>
                <li class="topbar-item-li"> <p> Conversando no grupo {{ to }} </p></li>
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
        </div>`,
    props: {'from': String, 'to': String},
    data: function(){
        return {
            message: '',
            messages: [],
            socket: io('localhost:9001'),
        }
    },
    created(){
        this.socket.emit('join', {_id : this.from});
    },
    mounted(){
        this.socket.on('receiveMessage', this.receiveMessage);
    },
    destroyed(){
        this.socket.emit('disconnect', this.from);
    },
    methods: {
        sendMessage() {
            if (this.message.trim().length > 0) {
                let messagePackage = this.createMsgObj(this.message);
                this.socket.emit('sendMessage', messagePackage);
                this.message = "";
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
                fromUserId: this.from,
                to: this.to,
                message: this.message
            }
        },
        scrollToBottom() {
            setTimeout(function() {
                document.querySelector('#messages').scrollTop = document.querySelector('#messages').scrollHeight
            },300)
        }
    }
});

const app = new Vue({
    el: '#app'
});