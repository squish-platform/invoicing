import { HttpLink } from "apollo-link-http"
import * as fetch from "cross-fetch"

export default class SwishLink extends HttpLink {
  constructor(token: string) {
    if (!token) {
      throw new Error("No token provided")
    }
    super({
      uri: "https://api.github.com/graphql",
      headers: { Authorization: `Bearer ${token}` },
      fetch
    })
  }
}
