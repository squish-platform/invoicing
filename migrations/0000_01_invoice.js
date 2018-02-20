exports.up = db =>
  db.schema.createTable("invoice", t => {
    t.string("id").primary()
    t.string("customer").notNullable()
    t.string("vendor").notNullable()
    t.string("status").notNullable()
    t.string("amount_due").notNullable()
    t.string("currency").notNullable()
    t.timestamp("created_at").notNullable()
    t.timestamp("expires_at").notNullable()
    t.timestamp("paid_at").nullable()
    t.string("meta").nullable()
  })

exports.down = db => db.schema.dropTable("payment")
