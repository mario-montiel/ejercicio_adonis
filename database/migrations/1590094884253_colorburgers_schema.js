'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ColorburgersSchema extends Schema {
  up () {
    this.create('colorburgers', (table) => {
      table.increments()
      table.string('color')
      table.string('carne')
      table.string('precio')
      table.string('fecha_creacion')
    })
  }

  down () {
    this.drop('colorburgers')
  }
}

module.exports = ColorburgersSchema
