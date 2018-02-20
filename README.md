## user flow

* add items to cart on 3rd party website / app
* send checkout request to 3rd party server
  * send trusted request to API to create invoice
  * return invoice id to client
* client subscribe to invoice changes from invoice id
  * get verification when API receives payment
