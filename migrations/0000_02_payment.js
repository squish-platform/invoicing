exports.up = db =>
  db.schema.createTable("payment", t => {
    t.string("id").unique()
    t.string("payeePaymentReference").nullable()
    t.string("paymentReference").notNullable()
    t.string("callbackUrl").notNullable()
    t.string("payerAlias").nullable()
    t.string("payeeAlias").nullable()
    t.string("amount").notNullable()
    t.string("currency").notNullable()
    t.string("status").notNullable()
    t.string("dateCreated").notNullable()
    t.string("datePaid").nullable()
    t.string("errorCode").nullable()
    t.string("errorMessage").nullable()
    t.boolean("simulated").defaultTo(false)
    t
      .string("message")
      .references("invoice.id")
      .notNullable()
  })

exports.down = db => db.schema.dropTable("payment")
