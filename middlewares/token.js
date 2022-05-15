import db from "../db.js"

export async function token(req, res, next) {
  const { authorization } = req.headers
  try {
    const token = authorization?.replace("Bearer", "").trim()
    if (!token) {
      return res.sendStatus(401)
    }

    const session = await db.collection("sessions").findOne({ token })
    if (!session) {
      return res.sendStatus(401)
    }

    const user = await db.collection("users").findOne({ _id: session.userId })
    if (!user) {
      return res.sendStatus(401)
    }

    res.locals.user = user
    next()
  } catch (e) {
    res.sendStatus(500)
  }
}
