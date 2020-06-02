'use strict'
const User = use('App/Models/User')
const Database = use('Database')
const Hash = use('Hash')

class UserController {
    async login ({request, auth}){
        try {
            console.log(request);
            const { email, password } = request.all()
            const query = await Database
                .select('password')
                .from('users')
                .where('email', email)
                .first()

            if (query){
                if (await auth.attempt(email, password)) {
                    let user = await User.findBy('email', email)
                    const token = await auth
                        .withRefreshToken()
                        .attempt(email, password)
                    const username = Object.assign({user: user.$attributes.name, token: token})
                    if (user){
                        return username
                    }
                    return "NELSON"
                  }
                else{
                    console.log('Nelson')
                    return 'No se encontró ningun usuario con esos datos'
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    async logout ({request, response, view, auth}){
        try {
            console.log('logout1')
            console.log(auth)
            console.log('logout2')
            await auth.logout()
            console.log('logoutFinal')
            // return 'Sesión cerrada';
        } catch (error) {
            console.log(error)
        }
    }

    async addUserPost ({request, view, auth}){
        try {
            const user_name = request.input('name')
            const user_email = request.input('email')
            const user_pass = request.input('password')
            const pass = await Hash.make(user_pass)

            // await use('Database').table('users').insert({ 
            //     name: user_name,
            //     email: user_email,
            //     password: pass
            //  })

            const user = new User()
            user.name = user_name
            user.email = user_email
            user.password = pass
            user.save()

            const users = await User.all()
            return users

        } catch (error) {
            console.log(error)
        }
    }

    async updUser ({params, request}){
        try {
            const name = request.input('name')
            const email = request.input('email')

            const userFind = await User.find(params.id)
            userFind.name = name
            userFind.email = email
            userFind.save()

            const users = await User.all()
            return users
        } catch (error) {
            console.log(error)
        }
    }

    async deleteUser ({params}){
        try {
            const user = await User.find(params.id)
            await user.delete()

            const users = await User.all()
            return users
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = UserController