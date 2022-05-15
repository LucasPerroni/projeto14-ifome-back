import db from "../db.js"

export async function getCheckout(req, res) {
  const { user } = res.locals

  try {
    // await db.collection("checkout").insertOne({
    //   user: user._id,
    //   shopping: [{ _id: "...", img: "...", title: "...", description: "...", type: "..." }],
    //   status: "wait",
    // })
    const checkout = await db.collection("checkout").findOne({ user: user._id, status: "wait" })

    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(500)
  }
}
