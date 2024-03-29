'use strict'

const uuidv4 = require('uuid/v4')

const Room = use('App/Models/Room')

const {broadcast} = require('../../utils/socket.utils')

class RoomController {
    async select ({ params, response }) {
        const room = await Room
        .query()
        .where('uuid', params.id)
        .with('chats')
        .first();
    
        if (!room) {
        return response.notFound(`The room doesn't exist`)
        }
    
        return room;
    }

    async shows ({ request, response }) {
        const room = await Room
        .query()
        .select('*')
        .fetch()
        return room
    }
    
    async create () {
        const room = new Room();
        const uuid = uuidv4();
        room.uuid = uuid;
        await room.save();
        return Room.find(uuid)
    }
    
    async createMessage ({ params, request, response }) {
        const room = await Room
        .query()
        .where('uuid', params.id)
        .first();
        if (!room) {
        return response.notFound(`The room doesn't exist`)
        }
    
        const data = request.only(['name', 'message']);
        const message = await room.chats().create(data);
    
        // send the message upon new message creation
        // define a type for the frontend app - "room:newMessage"
        broadcast(room.uuid, 'room:newMessage', message);
    
        return message
    }
}

module.exports = RoomController
