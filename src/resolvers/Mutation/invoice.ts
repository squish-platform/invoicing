import Big from "big.js"

import { getVendor, Context, nanoid, swishMock, now } from "../../utils"

const ONE_HOUR = 3600 * 24 * 1000
export const invoiceMutations = {
  async createInvoice(parent, { data }, ctx: Context, info) {
    const vendor = getVendor(ctx)
    console.log("createInvoice", data, vendor)

    const invoice = {
      id: nanoid(),
      customer: data.customer,
      vendor: vendor.id,
      status: "unpaid",
      amount_due: data.amount,
      currency: data.currency || "SEK",
      created_at: now(),
      expires_at: now(ONE_HOUR),
      paid_at: null,
      meta: data.meta
    }

    await ctx.db("invoice").insert(invoice)

    return invoice
  },

  async payInvoice(parent, { data: payment }, ctx, info) {
    console.log("payInvoice", payment)

    const vendor = getVendor(ctx)

    await ctx.db("payment").insert(payment)

    let invoice = await ctx
      .db("invoice")
      .where({ id: payment.message })
      .first()

    const amount_due = Big(invoice.amount_due)
      .minus(payment.amount)
      .toFixed(2)

    const update = {
      status: amount_due <= 0 ? "paid" : invoice.status,
      amount_due
    }

    // TODO: handle expired refunds

    await ctx
      .db("invoice")
      .where({ id: payment.message })
      .update(update)

    invoice = { ...invoice, ...update, payment }

    console.log("publish", invoice)

    ctx.pubsub.publish(invoice.id, { invoice })

    return invoice
  },
  async simulate(parent, { data }, ctx, info) {
    const inv = await ctx
      .db("invoice")
      .where({ id: data.id })
      .first()

    return invoiceMutations.payInvoice(
      parent,
      {
        data: swishMock({
          ...inv,
          ...data
        })
      },
      ctx,
      info
    )
  }
}
