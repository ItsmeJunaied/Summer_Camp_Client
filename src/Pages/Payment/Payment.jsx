import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckOutForm";
import useCart from "../../Hooks/useCart";
import { useLoaderData, useParams } from "react-router-dom";



const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {

    const [cart] = useCart();
    const params = useParams();
    const { id } = params;

    console.log(id);
    // const userdata = useLoaderData();
    // const { _id,name, sname, email, categoty, price, rating, quantity, detail, photo } = userdata;
    // console.log(userdata._id);


    const item = cart.find(item => (item._id)==id);
    const itemPrice = item ? item.price : 0;
    const price = parseFloat(itemPrice.toFixed(2))
    return (
        <div>
            <h2 className="text-3xl"> Teka o teka tumi uira uira aso...{price}</h2>
            <Elements stripe={stripePromise}>

                <CheckoutForm cart={cart} ></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;