import { getUserId, Context } from "../utils"

export const Query = {
  async invoice(parent, { id }, ctx: Context, info) {
    const invoice = await ctx
      .db("invoice")
      .where({ id })
      .first()

    return invoice
  },
  async invoices(parent, { query }, ctx: Context, info) {
    const invoices = await ctx.db("invoice")

    return invoices
  },
  me(parent, args, ctx: Context, info) {
    const id = getUserId(ctx)
    return ctx.db.query.user({ where: { id } }, info)
  }
}
