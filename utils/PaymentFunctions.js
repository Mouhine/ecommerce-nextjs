import getStripe from "./getStripe";
import { useSelector } from "react-redux";

export const handleCheckout = async (items) => {
  try {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(items),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    stripe.redirectToCheckout({ sessionId: data.id });
    console.log(items);
  } catch (error) {
    console.log(error);
  }
};
