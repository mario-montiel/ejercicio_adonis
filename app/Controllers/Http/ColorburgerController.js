'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with colorburgers
 */
 const Colorburger = use('App/Models/Colorburger');
class ColorburgerController {
  /**
   * Show a list of all colorburgers.
   * GET colorburgers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let colorburger = await Colorburger.query().fetch()
    return response.json(colorburger)
  }

  /**
   * Render a form to be used for creating a new colorburger.
   * GET colorburgers/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new colorburger.
   * POST colorburgers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const color = request.input('color')
    const carne = request.input('carne')
    const precio = request.input('precio')
    const fecha_creacion = request.input('fecha')

    const colorburguer = new Colorburger()
    colorburguer.color = color
    colorburguer.carne = carne
    colorburguer.precio = precio
    colorburguer.fecha_creacion = fecha_creacion

    await colorburguer.save()
    return response.json(colorburguer)
  }

  /**
   * Display a single colorburger.
   * GET colorburgers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing colorburger.
   * GET colorburgers/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update colorburger details.
   * PUT or PATCH colorburgers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const color = request.input('color')
    const carne = request.input('carne')
    const precio = request.input('precio')
    const fecha = request.input('fecha')

    let colorburger = await Colorburger.find(params.id)

    colorburger.color = color
    colorburger.carne = carne
    colorburger.precio = precio
    colorburger.fecha_creacion = fecha
    await colorburger.save()
    return response.json(colorburger)
  }

  /**
   * Delete a colorburger with id.
   * DELETE colorburgers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const colorburger = await Colorburger.find(params.id)
    await colorburger.delete()
    return response.json({message:'Se elimino la colorburger'})
  }
}

module.exports = ColorburgerController
