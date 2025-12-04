import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecue from '../../../hook/useAxiosSecue';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({})
    const sessionId = searchParams.get('session_id');
    console.log(sessionId)
    const axiosSecure = useAxiosSecue();

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/verify-success-payment?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data)
                    setPaymentInfo({
                        transcationId: res.data.transactionId,
                        trackingId:res.data.trackingId,

                    })
                })
        }

    }, [axiosSecure, sessionId])
    return (
        <div>
            <h3 className='text-4xl font-bold'>Payment successfully</h3>
            <p>Your Transaction Id:{paymentInfo. transcationId}</p>
            <p>Your Trackng Id:{paymentInfo.trackingId}</p>
        </div>
    );
};

export default PaymentSuccess;