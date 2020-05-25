const AccessDenied = use('App/Exceptions/AccessDeniedException')
const ResourseIsNotFinded = use('App/Exceptions/ResourceIsNotFindedException')
class AuthorizationServices {
    verificarPermiso(
        resource,
        user
    ) { 
        if (!resource) {
            throw new ResourseIsNotFinded();
        }

          if (resource.user_id != user.id) {
            throw new AccessDenied();
          };
    }
  
}
module.exports = new AuthorizationServices();
