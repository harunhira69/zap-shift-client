import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecue from '../../../hook/useAxiosSecue';

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecue();

  const { isLoading, data: parcel = {} } = useQuery({
    queryKey: ['parcel', parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcel/${parcelId}`);
      return res.data;
    }
  });
  const handlePayment = async()=>{
    const paymentInfo = {
     cost:parcel.cost,
     parcelId:parcel._id,
     senderEmail:parcel.senderEmail,
     parcelName:parcel.parcelName

    };
    const res = await axiosSecure.post('/create-checkout-session',paymentInfo);
    console.log(res.data);
    window.location.href= res.data.url;


  }

  if (isLoading) return <p>Loading parcel info...</p>;

  return (
    <div>
      <h3>Please Pay</h3>
      <p><strong>Name:</strong> {parcel.parcelName}</p>
      <p><strong>Cost:</strong> {parcel.cost}</p>
      <button 
      onClick={handlePayment}
      className='btn btn-primary text-black'> Pay</button>
    </div>
  );
};

export default Payment;
