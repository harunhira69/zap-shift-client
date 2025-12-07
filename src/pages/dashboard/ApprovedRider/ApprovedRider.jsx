import React from 'react';
import useAxiosSecue from '../../../hook/useAxiosSecue';
import { useQuery } from '@tanstack/react-query';
import { FcApproval } from "react-icons/fc";
import { ImCross } from "react-icons/im";
import { IoTrash } from "react-icons/io5";
import Swal from 'sweetalert2';

const ApprovedRider = () => {
    const axiosSecure = useAxiosSecue();

    const {refetch, data: riders = [], isLoading, error } = useQuery({
        queryKey: ['riders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');
            return res.data;
        }
    });


    const updateRiderStatus = (id,status)=>{
        const updateInfo = {status:status};
        axiosSecure.patch(`/riders/${id}`,updateInfo)
          .then(res=>{
            if(res.data.modifiedCount){
                refetch();
                         Swal.fire({
                                  position: "top-end",
                                  icon: "success",
                                  title: `Rider has been upadated ${status}`,
                                  showConfirmButton: false,
                                  timer: 1500
                                });
            }
        })
    }

const handleupdateRider = (id) => {
    updateRiderStatus(id, 'approved');
};

const handleRejecedRider = (id)=>{
    updateRiderStatus(id,'rejected');
}

const handleDelete = async (id) => {
    const confirm = await Swal.fire({
        title: 'Are you sure?',
        text: "This rider will be deleted permanently!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    });

    if (confirm.isConfirmed) {
        try {
            const res = await axiosSecure.delete(`/riders/${id}`);
            if(res.data.deletedCount > 0){
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Rider deleted successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Failed to delete rider',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
};



    if (isLoading) return <div className="text-center py-12"><p className="text-xl">Loading riders...</p></div>;
    if (error) return <div className="text-center py-12 text-red-500"><p>Error loading riders: {error.message}</p></div>;
    if (!riders || riders.length === 0) return <div className="text-center py-12"><p className="text-lg">No riders found</p></div>;

    return (
        <div>
            <h2 className="text-5xl font-bold">Rider Approval Details: {riders.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {riders.map((rider, index) => {
                            return (
                                <tr key={rider._id}>
                                    <th>{index + 1}</th>
                                    <td>{rider.riderName || rider.name}</td>
                                    <td>{rider.riderEmail || rider.email}</td>
    <td>
  {rider.status === 'approved' ? (
    <span className="text-green-600 font-semibold">Approved</span>
  ) : rider.status === 'rejected' ? (
    <span className="text-red-600 font-semibold">Rejected</span>
  ) : (
    <span className="text-yellow-600 font-semibold">Pending</span>
  )}
</td>
                                    <td className="flex gap-2">
                                        <button 
                                        onClick={()=>handleupdateRider(rider._id)}
                                        className="btn btn-sm btn-success text-white hover:bg-green-700 transition" title="Approve">
                                            <FcApproval size={18} />
                                        </button>
                                        <button 
                                        onClick={()=>handleRejecedRider(rider._id)}
                                        className="btn btn-sm btn-warning text-white hover:bg-orange-600 transition" title="Reject">
                                            <ImCross size={16} />
                                        </button>
                                        <button 
                                        onClick={()=>handleDelete(rider._id)}
                                        className="btn btn-sm btn-error text-white hover:bg-red-700 transition" title="Delete">
                                            <IoTrash size={18} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ApprovedRider;
