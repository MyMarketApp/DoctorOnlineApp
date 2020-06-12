import { STRIPE } from "./stripeSettings";

/**
 * Create the Stripe Checkout redirect html code for a given user
 * @param {String} userID
 * @returns {String}
 */
export function stripeCheckoutRedirectHTML(userID) {
  if (!userID) {
    throw new Error("Invalid userID");
  }

  return `
  <html>
    <body>

      <!-- Load Stripe.js on your website. -->
      <script src="https://js.stripe.com/v3"></script>

      <h1>Loading...</h1>
      <h1>Loading...</h1>
      <h1>Loading...</h1>
      <h1>Loading...</h1>
      <h1>Loading...</h1>
      <h1>Loading...</h1>
      <h1>Loading...</h1>

      <div id="error-message"></div>

      <script>
        (function () {
          var stripe = Stripe('${STRIPE.PUBLIC_KEY}');
          window.onload = function () {
            stripe.redirectToCheckout({
              lineItems: [
                {price: 'price_1GshNiCIA0h2xnEvtRdqgbIG', quantity: 1},
              ],
              mode: 'payment',
              // https://stripe.com/docs/payments/checkout/fulfillment
              successUrl: '${STRIPE.SUCCESS_URL}',
              cancelUrl: '${STRIPE.CANCELED_URL}',

              // clientReferenceId: '${userID}',
              // sessionId: '${STRIPE.CHECKOUT_SESSION_ID}'
            })
              .then(function (result) {
                alert(result)
                if (result.error) {
                  var displayError = document.getElementById('error-message');
                  displayError.textContent = result.error.message;
                }
              })
              .catch(function (result) {
                  alert(result)
              });
          };
        })();
      </script>

    </body>
  </html>
  `;
}
