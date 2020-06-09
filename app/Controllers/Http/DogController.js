'use strict'
const Dog = use('App/Models/Dog');
//const User = use('App/Models/User ');
const AuthorizationServices = use('App/Services/AuthorizationServices')
const Database = use('Database')
class DogController {
  async index({
    /*auth,
    request,
    response,
    view*/
    response
  }) {
    //const user = await auth.getUser();
    //console.log("user", user);
    //return await user.dogs().fetch();
    //console.log(query);

    /*let userdog = await Dog.query().innerJoin('users', 'users.id', 'dogs.user_id').fetch();
    console.log(response.json(userdog))
    return response.json(userdog);*/
    return await Database.select('users.name as Propietario', 'dogs.name', 'dogs.nickname', 'dogs.age').from('dogs')
      .innerJoin('users', 'users.id', 'dogs.user_id')

    //return response.json(dog);
    header('Access-Control-Allow-Origin: *');
  }
  async create({
    auth,
    request
  }) {
    const user = await auth.getUser();
    const {
      name,
      nickname,
      age
    } = request.all();
    const dog = new Dog();
    dog.fill({
      name,
      nickname,
      age
    });
    await user.dogs().save(dog);
    return dog;
  }
  async store({
    request,
    response
  }) {
    const name = request.input('name')
    const nickname = request.input('nickname')
    const age = request.input('age')

    const dog = new Dog()
    dog.name = name
    dog.nickname =
      dog.age = age
    await dog.save()
    return response.json(dog)
  }
  async destroy({
    auth,
    response,
    params
  }) {
    const user = await auth.getUser();
    const {
      id
    } = params;
    const dog = await Dog.find(id);
    AuthorizationServices.verificarPermiso(dog, user);
    await dog.delete();
    return dog;
  }
  async update({
    auth,
    params,
    request
  }) {
    const user = await auth.getUser();
    const {
      id
    } = params;
    const {
      name
    } = request.all()
    const dog = await Dog.find(id);
    AuthorizationServices.verificarPermiso(dog, user);
    dog.merge(request.all());
    await dog.save();
    return dog;
    /*const user = await auth.getUser();
       const {
         id
       } = params;
       const name = request.input('name')
       const nickname = request.input('nickname')
       const age = request.input('age')

       const Finddog = await Dog.find(params.id)
       Finddog.name = name
       Finddog.nickname = nickname
       Finddog.age = age
       Finddog.save()

       const dog = await Dog.all()
       return dog*/
  }
}
module.exports = DogController
