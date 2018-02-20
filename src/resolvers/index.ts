import { AuthPayload } from "./AuthPayload"
import { Query } from "./Query"
import { Subscription } from "./Subscription"

import auth from "./Mutation/auth"
import { invoiceMutations } from "./Mutation/invoice"

export default {
  Query,
  Mutation: {
    ...auth,
    ...invoiceMutations
  },
  Subscription,
  AuthPayload
}
