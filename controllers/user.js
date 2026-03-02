import * as userModel from "../models/user.js";
import bcrypt from 'bcrypt';

export async function getUserById(req, resp) {
  if (req.query.user_id == undefined || req.query.user_id == null) {
    resp.json({
      sucess: false,
      data: "User don't exist",
    })
  } else if (req.query.user_id) {
    const user_id = req.query.user_id.split("=");
    const data = await userModel.getUser(user_id[1]);
    resp.json({
      success: true,
      data: {
        id: data.id,
        email: data.email,
        password: data.password,
        name: data.name,
        firstname: data.firstname,
        is_admin: data.is_admin,
        date_inscription: data.date_inscription,
      }
    })
  } else {
    resp.json({
      sucess: false,
      data: "User don't exist",
    })
  }
}

export async function updateUserInfos(req, resp) {
  const user_id = req.query.user_id.split("=");
  const data = await userModel.updateInfos(user_id[1], req.body.email, req.body.name, req.body.first_name)
  resp.json({
    success: true,
    message: `Vos données ont bien été modifiées.`
  })
}

export async function createUser(req, resp) {
  let password = await bcrypt.hash(req.body.password, 10);
  const data = await userModel.createUser(req.body.email, password, req.body.name, req.body.firstname)
  resp.json({
    success: true,
    message: 'Votre compte a bien été créer'
  })
}

export function getCurrent(req, resp) {
  resp.json(req.user)
}