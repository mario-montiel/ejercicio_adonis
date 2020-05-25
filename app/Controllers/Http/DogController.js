'use strict'
const Dog = use('App/Models/Dog');
const AuthorizationServices = use('App/Services/AuthorizationServices')
class DogController {
  async index({
    auth
  }) {
    const user = await auth.getUser();
    console.log(user.id);
    return await user.dogs().fetch();
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
