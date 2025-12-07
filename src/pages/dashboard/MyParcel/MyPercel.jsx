import React from 'react';
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import useAuth from '../../../hook/useAuth';
import useAxiosSecue from '../../../hook/useAxiosSecue';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const MyPercel = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecue();

    const { data: parcels = [], refetch, isLoading } = useQuery({
        queryKey: ['my-parcel', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcel?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    const handlePayment = async (parcel) => {
        if (!parcel.cost || isNaN(parcel.cost)) {
            Swal.fire({
                icon: "error",
                title: "Invalid Parcel Cost",
                text: "Cannot proceed to payment because cost is missing or invalid."
            });
            return;
        }

        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName
        };

        try {
            const res = await axiosSecure.post('/checkout-session', paymentInfo);
            window.location.assign(res.data.url);
        } catch (error) {
            console.error("Payment error:", error);
            Swal.fire({
                icon: "error",
                title: "Payment failed",
                text: error.response?.data?.error || error.message
            });
        }
    };

    const handleDeleted = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/parcel/${id}`).then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your parcel has been deleted.",
                            icon: "success"
                        });
                    }
                });
            }
        });
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            All of my parcels: {parcels.length}
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Payment</th>
                            <th>Delivery Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.cost ?? "-"}</td>
                                <td>
                                    {parcel.status === 'paid' ? (
                                        <span className='text-green-500'>Paid</span>
                                    ) : (
                                        <button
                                            onClick={() => handlePayment(parcel)}
                                            className="btn btn-primary text-black"
                                        >
                                            Pay
                                        </button>
                                    )}
                                </td>
                                <td>{parcel.deliveryStatus ?? "-"}</td>
                                <td>
                                    <button className='btn btn-square hover:bg-primary'><FaMagnifyingGlass /></button>
                                    <button className='btn btn-square hover:bg-primary'><AiOutlineEdit /></button>
                                    <button
                                        onClick={() => handleDeleted(parcel._id)}
                                        className='btn btn-square hover:bg-primary'
                                    >
                                        <FaRegTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPercel;
