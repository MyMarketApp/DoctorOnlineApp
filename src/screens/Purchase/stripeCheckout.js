import { STRIPE } from "./stripeSettings";

export function stripeCheckoutRedirectHTML(user, selectedPrice) {
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

      <div id="error-message"> <h1>Loading...</h1></div>

      <script>
        (function () {
          var stripe = Stripe('${STRIPE.PUBLIC_KEY}');
          window.onload = function () {
            stripe.redirectToCheckout({
              lineItems: [
                {price: '${selectedPrice}', quantity: 1},
              ],
              mode: 'payment',
              // https://stripe.com/docs/payments/checkout/fulfillment
              customerEmail: '${user.email}',
              clientReferenceId: '${user.cus_HSCj3TTkhpspoD}',
              successUrl: '${STRIPE.SUCCESS_URL}',
              cancelUrl: '${STRIPE.CANCELED_URL}',
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
