'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatsSchema extends Schema {
  up () {
    this.create('chats', (table) => {
      table.increments()
      table.uuid('room_id').references('uuid').inTable('rooms').onDelete('CASCADE')
      table.string('name').notNullable()
      table.text('message').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('chats')
  }
}

module.exports = ChatsSchema
