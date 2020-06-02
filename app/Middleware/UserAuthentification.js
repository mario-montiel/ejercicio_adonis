// 'use strict'
// /** @typedef {import('@adonisjs/framework/src/Request')} Request */
// /** @typedef {import('@adonisjs/framework/src/Response')} Response */
// /** @typedef {import('@adonisjs/framework/src/View')} View */

// class UserAuthentification {
//   /**
//    * @param {object} ctx
//    * @param {Request} ctx.request
//    * @param {Function} next
//    */
//   async handle ({ request, auth }, next) {
//     // call next to advance the request
//     console.log('MIDDLEWARE')
//     try {
//       // console.log(auth)
//       // const user = await auth.getUser();
//       console.log(await auth.getUser())
//       console.log('ya termino')
//     } catch (error) {
//       console.log(error)
//     }
//     // await next()
//   }
// }

// module.exports = UserAuthentification
