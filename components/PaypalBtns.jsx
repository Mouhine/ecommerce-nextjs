import {
  PayPalScriptProvider,
  BraintreePayPalButtons,
  PayPalButtons,
} from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
export default function PaypalBtns() {
  const { carteItems } = useSelector((state) => state.cart);
  return (
    <PayPalScriptProvider
      options={{
        "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
      }}
    >
      <PayPalButtons
        createOrder={(data, actions) => {
          return fetch("/api/paypal", {
            method: "POST",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify(carteItems),
          })
            .then((res) => {
              if (res.ok) return res.json();
              return res.json().then((json) => Promise.reject(json));
            })
            .then(({ id }) => {
              return id;
            })
            .catch((error) => {
              console.log(error);
            });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            console.log(details);
          });
        }}
      />
    </PayPalScriptProvider>
  );
}
