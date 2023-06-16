import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckOutForm";
import useCart from "../../Hooks/useCart";
import { useLoaderData, useParams } from "react-router-dom";
import useClass from "../../Hooks/useClass";



const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {

    const [cart] = useCart();
    const params = useParams();
    const [classList] = useClass();
    const { id } = params;

    // console.log(id);
    // const userdata = useLoaderData();
    // const { _id,name, sname, email, categoty, price, rating, quantity, detail, photo } = userdata;
    // console.log(userdata._id);


    const item = cart.find(item => (item._id)==id);
    const itemPrice = item ? item.price : 0;
    const price = parseInt(itemPrice.toFixed(2))


    const filteredClassList = classList.filter(item => cart.some(cartItem => cartItem.classId === item._id));
    return (
        <div>
            <h2 className="text-3xl"> Totall Money: {price}</h2>
            <Elements stripe={stripePromise}>

                <CheckoutForm cart={cart} price={price}  classid={filteredClassList}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;