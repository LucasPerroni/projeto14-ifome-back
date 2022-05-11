import db from "../db.js"
import joi from "joi"
import bcrypt from "bcrypt"

export async function postSignUp(req, res) {
  // validate req.body obj
  const authSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.string().valid(joi.ref("password")).required(),
    address: joi.string().required(),
    number: joi.number().required(),
    complement: joi.string(),
  })
  const validation = authSchema.validate(req.body, { abortEarly: false })
  if (validation.error) {
    return res.status(422).send(validation.error.details.map((e) => e.message))
  }

  delete req.body.confirmPassword

  try {
    // check if email already exists
    const existEmail = await db.collection("users").findOne({ email: req.body.email })
    if (existEmail) {
      return res.sendStatus(409)
    }

    // create new document in collection
    await db.collection("users").insertOne({
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 10),
    })

    res.sendStatus(201)
  } catch (e) {
    res.sendStatus(500)
  }
}
