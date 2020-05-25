'use strict'
const User = use('App/Models/Pruebon/User')
const Database = use('Database')
const Hash = use('Hash')

class UserController {
    async login ({request, auth, response, redirect}){
        try {
            const { email, password } = request.all()
            const query = await Database
                .select('password')
                .from('users')
                .where('email', email)
                .first()

            const query_id = await Database
                .select('id')
                .from('users')
                .where('email', email)
                .first()

            if(Hash.verify(password, query)){
                if (await auth.attempt(email, password)) {
                    let user = await User.findBy('email', email)
                    let token = await auth.generate(user)
        
                    Object.assign(user, token)
                    if (user){
                        return user
                    }
                    return "NELSON"
                  }
            }
            else{
                console.log('Nelson')
            }
        } catch (error) {
            console.log(error)
        }
    }

    async logout ({request, response, view}){
        try {
            session.flashAll()
            console.log(session.get('user'))
        } catch (error) {
            console.log(error)
        }
    }

    async addUserPost ({request, view}){
        console.log(request)
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