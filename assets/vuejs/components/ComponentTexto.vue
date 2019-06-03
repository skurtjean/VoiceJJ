<template>
    <div>gg</div>
</template>

    <!-- <div id="chat-frame-box">
        <div class="status status-done">
             <div v-if="finished" class="mb-4">
                <script>
                    alert('Chat finalizado.')
                </script>
            </div>
        </div>
        <div class="talking-area">
            <div v-for="(item, index) in messages" :key="index" :class="item.fromUserId == sender.id ? 'msg agent-me' : 'msg agent-notme'">
                <div class="text">
                    <span class="name"> {{item.fromUserId == to ? to : from }} </span>
                    {{ item.message }}
                </div>
            </div>
        </div>
        <div class="panel-text">
            <p class="typing" v-if="typing">{{ receiver.name }} está digitando...</p>
            <textarea v-model="message" @keyup.enter="sendMessage" @keypress="onTyping" @keyup.delete="stopTyping" id="message" placeholder="Enviar mensagem..." ></textarea>
            <button @click="sendMessage">Enviar Mensagem</button>
        </div>
    </div>

<script>
export default {
    props: ['id', 'to'],
    data () {
        return {
            message: '',
            messages: [],
            typing: false,
            finished: false,
            socket: io('http://vps13171.publiccloud.com.br:9001')
        }
    },
    created() {
        this.socket.emit("join", {
            from: this.from
        });
    },
    mounted() {
        //Listen for messages
        this.socket.on('receiveMessage', this.receiveMessage);
        this.socket.on('istyping', this.someoneIsTyping);
        this.socket.on('notyping', this.finishIsTyping);
        this.socket.on('finishing', this.finishingChat);
    },
    destroyed() {
    },
    methods: {
        sendMessage() {
            if (this.message.trim().length > 0) {
                let messagePackage = this.createMsgObj(this.message);
                this.socket.emit('sendMessage', messagePackage);
                this.socket.emit("typing", {to: this.to, name: this.from, typing:false });
                this.messages.push(messagePackage);
                this.storeMessage();
                this.message = "";
                this.scrollToBottom();
            }else{
                alert("Digite algo antes de enviar :)");
            }
        },
        receiveMessage(msg) {
            this.messages.push(msg);
            this.scrollToBottom();
        },
        onTyping() {
            if(this.message.length == 1 || (this.message.length%100 == 0 && this.message.length > 0))
            {
                this.socket.emit("typing", {toUserId: this.to, name: this.from, typing: true });
            }
        },
        stopTyping() {
            if(this.message.length == 0)
            {
                this.socket.emit("typing", {toUserId: this.to, name: this.from, typing:false });
            }
        },
        someoneIsTyping(data) {
            this.typing = true;
        },
        finishIsTyping(data) {
            this.typing = false;
        },
        createMsgObj() {
            return {
                fromUserId: this.from,
                toUserId: this.to,
                message: this.message
            }
        },
        scrollToBottom() {
            setTimeout(function() {
                document.querySelector('.talking-area').scrollTop = document.querySelector('.talking-area').scrollHeight
            },300)
        },
        finishingChat(){
            this.finished = true;
            console.log("chamada finalizada");
        }
    }
}
</script>

<style scoped>
    .typing {
        font-family: 'Open Sans', sans-serif;
        font-size: 14px;
        color: #c7bdbd;
        margin-bottom: 10px;
    }
</style> -->
