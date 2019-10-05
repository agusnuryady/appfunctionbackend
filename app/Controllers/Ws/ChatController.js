'use strict'

class ChatController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request

    console.log('A new subscription for room topic', socket.topic)
  }

  onMessage(message){
    // Broadcast/kirim ke semua pengguna termasuk diri sendiri
    //~ this.socket.broadcastToAll('message', message)
    console.log('got message', message)
    // sebaliknya
    this.socket.broadcast('message', message)
  }

  onClose () {
    console.log('Closing subscription for room topic', this.socket.topic)
  }

}

module.exports = ChatController
