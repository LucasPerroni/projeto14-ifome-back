import { ObjectId } from "mongodb"

import db from "../db.js"

export async function getCheckout(req, res) {
  const { user } = res.locals

  try {
    // check if there is any checkout not finished in database
    const checkout = await db.collection("shopping").findOne({ user: user._id.toString(), status: "wait" })
    if (!checkout) {
      return res.sendStatus(404)
    }

    delete checkout.user

    res.send(checkout)
  } catch (e) {
    res.sendStatus(500)
  }
}

export async function updateCheckout(req, res) {
  const { user } = res.locals
  const { id } = req.params

  try {
    // get the checkout from id
    const checkout = await db.collection("shopping").findOne({ _id: new ObjectId(id) })
    if (!checkout) {
      return res.sendStatus(404)
    }

    // validate if checkout is not finished
    if (checkout.status !== "wait") {
      return res.sendStatus(422)
    }

    // validate if checkout owner is the user
    if (checkout.user.toString() !== user._id.toString()) {
      return res.sendStatus(401)
    }

    await db.collection("shopping").updateOne(checkout, { $set: { status: "finished" } })
    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(500)
  }
}

export async function deleteCheckout(req, res) {
  const { user } = res.locals
  const { id } = req.params

  try {
    // get checkout from id
    const checkout = await db.collection("shopping").findOne({ _id: new ObjectId(id) })
    if (!checkout) {
      return res.sendStatus(404)
    }

    // validate if checkout is not finished
    if (checkout.status !== "wait") {
      return res.sendStatus(422)
    }

    // validate if checkout owner is the user
    if (checkout.user.toString() !== user._id.toString()) {
      return res.sendStatus(401)
    }

    await db.collection("shopping").deleteOne(checkout)
    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(500)
  }
}
