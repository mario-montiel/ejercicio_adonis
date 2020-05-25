'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DogSchema extends Schema {
  up() {
    this.create('dogs', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('name', 80)
      table.string('nickname', 80)
      table.integer('age', 2)
      table.timestamps()
    })
  }

  down() {
    this.drop('dogs')
  }
}

module.exports = DogSchema
