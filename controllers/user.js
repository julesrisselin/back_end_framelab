import * as userModel from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function getUserById(req, resp) {
  if (req.query.user_id == undefined || req.query.user_id == null) {
    resp.status[400].json({
      sucess: false,
      data: "User don't exist",
    })
  } else if (req.query.user_id) {
    const data = await userModel.getUser(req.query.user_id);
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
    resp.status[400].json({
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

export async function updateFirstConnexion(req, resp) {
  let token = req.body.token
  if (token == undefined) {
    resp.status(401).json({
      message: 'Token manquant, invalide ou expiré'
    })
  } else {
    const tokenData = jwt.verify(token, process.env.SECRET_KEY);
    console.log(tokenData.id)
    const valid = await userModel.activateUser(tokenData.id);
    console.log(valid)
    if (!valid) {
      resp.status(401).json({
        success: false,
        message: 'Token manquant, invalide ou expiré'
      })
    } else {
      resp.json({
        success: true,
        message: `Compte bien activé`
      })

    }
  }
}

export async function createUser(req, resp) {
  console.log(req.body.password)
  const password = await bcrypt.hash(req.body.password, 10);
  const data = await userModel.createUser(req.body.email, password, req.body.name, req.body.firstname)
  const token = jwt.sign({ id: data }, process.env.SECRET_KEY, { expiresIn: "1h" });
  resp.json({
    success: true,
    message: 'Votre compte a bien été créer',
    token: token
  })
}

export function getCurrent(req, resp) {
  resp.json(req.user)
}