'use strict'

const {
  LogicalException
} = require('@adonisjs/generic-exceptions')

class ResourceIsNotFindedException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle(error, {
    response
  }) {
    {
      return response.status(403).json({
        error: "Resource is not finded"
      })
    }
  }
}

module.exports = ResourceIsNotFindedException
