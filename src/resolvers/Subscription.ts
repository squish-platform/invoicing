import { Context } from "../utils"
import { subscribe } from "graphql"

export const Subscription = {
  invoice: {
    // resolve: async (invoice, args, { db, pubsub }) => {
    //   console.log("resolve", args, invoice)

    //   return invoice
    // },
    subscribe: async (parent, { id, ...rest }, ctx: Context) => {
      console.log("subscribe", id, rest)

      // setTimeout(async () => {
      //   ctx.pubsub.publish(id, {
      //     invoice: await ctx
      //       .db("invoice")
      //       .where({ id })
      //       .first()
      //   })
      // }, 500)
      return ctx.pubsub.asyncIterator(id)
    }
  }
}
