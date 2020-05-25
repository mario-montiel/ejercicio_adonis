'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Colorburger extends Model {
	static get createdAtColumn () {
   return null
 }

 static get updatedAtColumn () {
   return null
 }
}

module.exports = Colorburger
