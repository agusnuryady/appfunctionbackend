'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FilesSchema extends Schema {
  up () {
    this.create('files', (table) => {
      table.increments()
      table.string('name', 256).notNullable()
      table.string('description', 256).notNullable()
      table.string('file', 256).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('files')
  }
}

module.exports = FilesSchema
