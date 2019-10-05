'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LocationsSchema extends Schema {
  up () {
    this.create('locations', (table) => {
      table.increments()
      table.string('name', 256).notNullable()
      table.decimal('latitude', 10, 8).notNullable()
      table.decimal('longitude', 11, 8).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('locations')
  }
}

module.exports = LocationsSchema
