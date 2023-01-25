const paypal = require("@paypal/checkout-server-sdk");
export default async function handler(req, res) {
  if (req.method === "POST") {
    const Environment =
      process.env.NEXT_PUBLIC_NODE_ENV === "production"
        ? paypal.core.LiveEnvironment
        : paypal.core.SandboxEnvironment;
    const paypalClient = new paypal.core.PayPalHttpClient(
      new Environment(
        process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET
      )
    );

    const request = new paypal.orders.OrdersCreateRequest();
    console.log(req.body);
    const total = req.body.reduce((sum, item) => {
      return sum + item.price * item.q;
    }, 0);
    request.prefer("return=representation");
    const reqBody = request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total,
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: total,
              },
            },
          },

          items: req.body.map((item) => {
            return {
              name: item.title.slice(0, 30),
              unit_amount: {
                currency_code: "USD",
                value: item.price,
              },
              quantity: item.q,
            };
          }),
        },
      ],
    });
    console.log(reqBody.body.purchase_units[0].items);

    try {
      const order = await paypalClient.execute(request);
      console.log(order);
      res.json({ id: order.result.id });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
