import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPaymentAccess } from "../../apiservice/apiservice";

export default function PaymentPage() {

    const { token } = useParams();

    useEffect(() => {

        const loadPayment = async () => {

            try {

                const response = await getPaymentAccess(token);

                console.log("PAYMENT DATA", response);

                const options = {

                    key: response.razorpayKey,

                    amount: response.amount * 100,

                    currency: response.currency,

                    name: response.gymName,

                    description: "Gym Membership Payment",

                    order_id: response.orderId,

                    prefill: {
                        name: response.memberName,
                        email: response.email,
                        contact: response.phone
                    },

                    method: {
                        upi: true
                    },

                    // config: {
                    //     display: {
                    //         hide: [
                    //             {
                    //                 method: "card"
                    //             },
                    //             {
                    //                 method: "netbanking"
                    //             },
                    //             {
                    //                 method: "wallet"
                    //             }
                    //         ]
                    //     }
                    // },

                    handler: function (response) {

                        console.log("PAYMENT SUCCESS");

                        console.log(response);

                        alert("Payment successful");
                    }
                };

                const razorpay = new window.Razorpay(options);

                razorpay.open();

            } catch (err) {

                console.error(err);

                alert("Unable to load payment");
            }
        };

        loadPayment();

    }, [token]);

    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "20px"
            }}
        >
            Opening payment...
        </div>
    );
}