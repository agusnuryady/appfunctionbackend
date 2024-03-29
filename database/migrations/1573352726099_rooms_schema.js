'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoomsSchema extends Schema {
  up () {
    this.create('rooms', (table) => {
      table.increments()
      table.timestamps()
      table.uuid('uuid').unique()
    })
  }

  down () {
    this.drop('rooms')
  }
}

module.exports = RoomsSchema
