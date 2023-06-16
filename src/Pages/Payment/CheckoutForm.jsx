import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
// import './CheckoutForm.css'
import UseAxios from "../../Hooks/UseAxios";
import UseAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import useClass from "../../Hooks/useClass";



const CheckoutForm = ({ cart, price, classid }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = UseAuth();
    const [classList] = useClass();
    const [axiosSecure] = UseAxios()
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [availableSeats, setAvailableSeats] = useState([]);
    const [ClassID, setClassID] = useState('');

    useEffect(() => {

        const seats = classList.map(item => item.availableSeats);
        setAvailableSeats(seats);
    }, [classList]);



    useEffect(() => {
        if (classid && classid.length > 0) {
            const clsid = classid[0]._id;
            setClassID(clsid);
        }
    }, [classid]);

    // console.log(ClassID);


    // console.log(ClassID);
    //   console.log(availableSeats);
    //   console.log(user);

    useEffect(() => {
        // console.log(price);
        if (price > 0) {
            // console.log('api call')
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [price, axiosSecure])

    // console.log(clientSecret);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log('error', error)
            setCardError(error.message);
        }
        else {
            setCardError('');
            // console.log('payment method', paymentMethod)
        }

        setProcessing(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous'
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError);
        }

        console.log('payment intent', paymentIntent)
        setProcessing(false)
        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
            // save payment information to the server
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                quantity: cart.length,
                cartItems: cart.map(item => item._id),
                classItems: cart.map(item => item.classId),
                status: 'service pending',
                itemNames: cart.map(item => item.name)
            }
            axiosSecure.post('/payments', payment)
                .then(res => {
                    console.log(res.data);
                    if (res.data.deleteResult.deletedCount > 0) {
                        // display confirm

                        const newAvailableSeats = parseInt(availableSeats) - 1;
                        fetch(`http://localhost:5001/class/seat/${ClassID}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ availableSeats: newAvailableSeats })
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.modifiedCount) {
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Added to cart',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                }
                            })
                    }
                })
        }


    }

    return (
        <>
            <form className="w-2/3 m-8" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-primary btn-sm mt-4" type="submit" disabled={!stripe}>
                    {/* || !clientSecret || processing */}
                    Pay
                </button>
            </form>
            {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
            {transactionId && <p className="text-green-500">Transaction complete with transactionId: {transactionId}</p>}
        </>
    );
};

export default CheckoutForm;