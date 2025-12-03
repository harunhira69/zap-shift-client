import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecue from '../../../hook/useAxiosSecue';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    console.log(sessionId)
    const axiosSecure = useAxiosSecue();

    useEffect(()=>{
        if(sessionId){
            axiosSecure.patch(`/verify-success-payment?session_id=${sessionId}`)
            .then(res=>{
                console.log(res.data)
            })
        }

    },[axiosSecure,sessionId])
    return (
        <div>
        <h3 className='text-4xl font-bold'>Payment successfully</h3>
        </div>
    );
};

export default PaymentSuccess;