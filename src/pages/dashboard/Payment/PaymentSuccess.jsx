import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecue from '../../../hook/useAxiosSecue';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecue();

    useEffect(() => {
        if (sessionId) {
            axiosSecure
                .patch(`/verify-success-payment?session_id=${sessionId}`)
                .then(res => {
                    console.log("Verify Payment Response:", res.data);
                    if (res.data.success) {
                        setPaymentInfo({
                            transactionId: res.data.transactionId, // fixed typo
                            trackingId: res.data.trackingId,
                        });
                    } else {
                        console.error("Payment verification failed:", res.data);
                    }
                })
                .catch(err => {
                    console.error("Payment verification error:", err);
                });
        }
    }, [axiosSecure, sessionId]);

    return (
        <div className="p-8">
            <h3 className="text-4xl font-bold mb-4">Payment Successful!</h3>
            {paymentInfo.transactionId && (
                <p className="mb-2">
                    Your Payment Transaction ID: <span className="font-mono">{paymentInfo.transactionId}</span>
                </p>
            )}
            {paymentInfo.trackingId && (
                <p>
                    Your Tracking ID: <span className="font-mono">{paymentInfo.trackingId}</span>
                </p>
            )}
        </div>
    );
};

export default PaymentSuccess;
