'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatsSchema extends Schema {
  up () {
    this.create('chats', (table) => {
      table.increments()
      table.integer('room_id').unsigned()
      table.integer('user_id').unsigned()
      table.text('message').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('chats')
  }
}

module.exports = ChatsSchema
