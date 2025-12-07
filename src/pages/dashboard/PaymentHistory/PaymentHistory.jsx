import React from 'react';
import useAuth from '../../../hook/useAuth';
import useAxiosSecue from '../../../hook/useAxiosSecue';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecue();
    const {data:payment=[]}=useQuery({
        
        queryKey:['payment-history',user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/payment?email=${user.email}`);
            return res.data;

        }
   
    })
         console.log(payment);
    return (
        <div>
        <h2 className="text-5xl font-bold">Payment History:{payment.length}</h2>
        <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Parcel Name</th>
        <th>Amount</th>
        <th>TransactionId</th>
        <th>TrackingId</th>
      </tr>
    </thead>
  <tbody>
  {payment.map((pay, index) => (
    <tr key={pay._id}>
      <th>{index + 1}</th>
      <th>{pay.
parcelName}</th>
      <td>{pay.customerEmail}</td>
      <td>{pay.amount}$</td>
      <td>{pay.transaction}</td>
      <td>{pay.trackingId}</td>

    </tr>
  ))}
</tbody>

  </table>
</div>
        </div>
    );
};

export default PaymentHistory;