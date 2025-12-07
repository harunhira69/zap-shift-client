import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecue from '../../hook/useAxiosSecue';
import useAuth from '../../hook/useAuth';

const SendParcel = () => {
    const {
        register,
        handleSubmit,
     control,
    
    } = useForm();

    const axiosSecure = useAxiosSecue();
    const {user}= useAuth();
    const navigate = useNavigate();
    

    const serviceCenters = useLoaderData();

    // Get all regions
    const regions = [...new Set(serviceCenters.map(c => c.region))];

    // Watch selected region
const senderRegion = useWatch({
    control,
    name: "senderRegion",
});
const receiverRegion = useWatch({
    control,
    name: "receiverRegion",
});


    // Dynamically get the district list based on region
    const getDistricts = (region) => {
        if (!region) return [];
        const filtered = serviceCenters.filter(c => c.region === region);
        return filtered.map(item => item.district);
    };

    const handleSendParcel = (data) => {
        console.log("Form Data:", data);
        const isDocument = data.parcelType==='document';
        const sameDistrict = data.senderDistrict===data.receiverDistrict;
      const parcelWeight = parseFloat(data.parcelWeight);
        let cost = 0;
        if(isDocument){
            cost = sameDistrict?60:80
        }else{
            if(parcelWeight<3){
                cost = sameDistrict?110:150;

            }else{
                const minCharge = sameDistrict?110:150;
                const extraWeight = parcelWeight-3;
                const extraCharge = sameDistrict?extraWeight*40:extraWeight*40+40;
                cost = minCharge+extraCharge;

            }
        }
     data.cost = cost;

     Swal.fire({
  title: "Agree with cost?",
  text: `you have to pay:${cost} taka`,
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Confirm and continue pay"
}).then((result) => {
  if (result.isConfirmed) {
    axiosSecure.post('parcel',data).then(res=>{
        console.log('after send parcel',res.data);
        if(res.data.insertedId){
            navigate('/dashboard/my-parcel')
            Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Your work has been saved",
  showConfirmButton: false,
  timer: 1500
});
        }
    })
    // Swal.fire({
    //   title: "Deleted!",
    //   text: "Your order has been deleted.",
    //   icon: "success"
    // });
  }
});
    };

    return (
        <div>
            <h2 className="text-5xl font-bold">Send a Parcel</h2>

            <form className="mt-12 p-4" onSubmit={handleSubmit(handleSendParcel)}>
                
                {/* parcel type */}
                <div>
                    <label className="label mr-4">
                        <input
                            type="radio"
                            {...register('parcelType')}
                            value="document"
                            className="radio"
                            defaultChecked
                        />
                        Document
                    </label>

                    <label className="label mr-4">
                        <input
                            type="radio"
                            {...register('parcelType')}
                            value="non-document"
                            className="radio"
                        />
                        Non-document
                    </label>
                </div>

                {/* parcel info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
                    <fieldset className="fieldset">
                        <label className="label">Parcel Name</label>
                        <input
                            type="text"
                            {...register('parcelName')}
                         
                            className="input w-full"
                            placeholder="Parcel Name"
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label">Parcel Weight</label>
                        <input
                            type="number"
                            {...register('parcelWeight')}
                            className="input w-full"
                            placeholder="Parcel Weight"
                        />
                    </fieldset>
                </div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Sender Details */}
                    <fieldset className="fieldset">
                        <h2 className="text-3xl font-semibold text-black">Sender Details</h2>

                        <label className="label">Sender Name</label>
                        <input
                            type="text"
                            {...register('senderName')}
                            className="input w-full"
                            placeholder="Sender Name"
                        />

                        <label className="label">Sender Email</label>
                        <input
                            type="email"
                            {...register('senderEmail')}
                            className="input w-full"
                            defaultValue={user.email}
                            placeholder="Sender Email"
                        />

                        {/* Region */}
                        <fieldset className="fieldset mt-4">
                            <legend className="fieldset-legend">Region</legend>
                            <select {...register("senderRegion")} className="select">
                                <option disabled selected>Pick a Region</option>
                                {regions.map((r, i) => (
                                    <option key={i} value={r}>{r}</option>
                                ))}
                            </select>
                        </fieldset>

                        {/* District */}
                        <fieldset className="fieldset mt-4">
                            <legend className="fieldset-legend">District</legend>
                            <select {...register("senderDistrict")} className="select">
                                <option disabled selected>Select District</option>
                                {getDistricts(senderRegion).map((d, i) => (
                                    <option key={i} value={d}>
                                        {d}
                                    </option>
                                ))}
                            </select>
                        </fieldset>

                        {/* Address */}
                        <label className="label mt-4">Address</label>
                        <input
                            type="text"
                            {...register('senderAddress')}
                            className="input w-full"
                            placeholder="Sender Address"
                        />

                        {/* Phone */}
                        <label className="label mt-4">Phone</label>
                        <input
                            type="number"
                            {...register('senderPhone')}
                            className="input w-full"
                            placeholder="Sender Phone"
                        />
                    </fieldset>

                    {/* Receiver Details */}
                    <fieldset className="fieldset">
                        <h2 className="text-3xl font-semibold text-black">Receiver Details</h2>

                        <label className="label">Receiver Name</label>
                        <input
                            type="text"
                            {...register('receiverName')}
                            className="input w-full"
                            placeholder="Receiver Name"
                        />

                        <label className="label">Receiver Email</label>
                        <input
                            type="email"
                            {...register('receiverEmail')}
                            className="input w-full"
                            placeholder="Receiver Email"
                        />
                           {/*Receiver Region */}
                        <fieldset className="fieldset mt-4">
                            <legend className="fieldset-legend">Region</legend>
                            <select {...register("receiverRegion")} className="select">
                                <option disabled selected>Pick a Region</option>
                                {regions.map((r, i) => (
                                    <option key={i} value={r}>{r}</option>
                                ))}
                            </select>
                        </fieldset>

                        {/*Receiver District */}
                        <fieldset className="fieldset mt-4">
                            <legend className="fieldset-legend">District</legend>
                            <select {...register("receiverDistrict")} className="select">
                                <option disabled selected>Select District</option>
                                {getDistricts(receiverRegion).map((d, i) => (
                                    <option key={i} value={d}>
                                        {d}
                                    </option>
                                ))}
                            </select>
                        </fieldset>

                        <label className="label">Address</label>
                        <input
                            type="text"
                            {...register('receiverAddress')}
                            className="input w-full"
                            placeholder="Receiver Address"
                        />

                        <label className="label">Phone</label>
                        <input
                            type="number"
                            {...register('receiverPhone')}
                            className="input w-full"
                            placeholder="Receiver Phone"
                        />

                      
                     

                    </fieldset>
                </div>

                <input type="submit" className="btn btn-primary mt-6" value="Send Parcel" />
            </form>
        </div>
    );
};

export default SendParcel;
