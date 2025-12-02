import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div>
            <h3>Payment cancelled </h3>
            <Link to='/dashboard/my-Parcel'>
            <button className='btn btn-primary'>Try again</button>
            </Link>
        </div>
    );
};

export default PaymentCancelled;