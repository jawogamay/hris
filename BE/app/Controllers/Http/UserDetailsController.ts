// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserDetail from "App/Models/UserDetail";

export default class UserDetailsController {
  public async store({ request, response }) {

    const data = request.body()
    const userDetails = await UserDetail.create(data)
    
    return response.created(userDetails)
  }
  public async addUserName({ request, response }) {
    
    const userDetailsInput = request.body()

    const userDetail = await UserDetail.findBy('user_id', userDetailsInput.userId);
    userDetail.username = userDetailsInput.username
    
    await userDetail.save()

    return response.created(userDetail)

  }
}
