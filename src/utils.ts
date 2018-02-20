import * as jwt from "jsonwebtoken"
import { PubSub } from "graphql-yoga"
const generate = require("nanoid/generate")

export interface Context {
  db: any
  pubsub: PubSub
  request: any
}

export function getVendor(ctx: Context) {
  const Authorization = ctx.request.get("Authorization")
  return {
    id: "burritobros"
  }

  if (Authorization) {
    // TODO: verify token
    // const token = Authorization.replace("Bearer ", "")
    // const { userId } = jwt.verify(token, process.env.APP_SECRET) as {
    //   userId: string
    // }
    // return userId
  }

  throw new AuthError()
}

export class AuthError extends Error {
  constructor() {
    super("Not authorized")
  }
}

export function swishMock(data) {
  return {
    id: Math.random().toString(),
    payeePaymentReference: data.id,
    paymentReference: "paymentReference",
    callbackUrl: "simluated",
    payerAlias: data.customer,
    payeeAlias: data.vendor,
    amount: data.amount,
    currency: "SEK",
    message: data.id,
    status: "PAID",
    dateCreated: new Date().toISOString(),
    datePaid: new Date().toISOString(),
    simulated: true
  }
}
export function nanoid() {
  return generate(
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:;.,?!()",
    20
  )
}

export const now = (delay = 0) => new Date(Date.now() + delay).toISOString()

const qr = require("qr-image")
const QR = inv =>
  "data:image/png;base64," +
  qr
    .imageSync(`C${inv.customer};${inv.amount};${inv.id};0`, {
      type: "png",
      margin: 1
    })
    .toString("base64")
