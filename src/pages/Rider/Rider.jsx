import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAxiosSecue from '../../hook/useAxiosSecue';
import useAuth from '../../hook/useAuth';
import { useLoaderData, useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const Rider = () => {
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
    const riderRegion = useWatch({
        control,
        name: "region",
    });




    const handleBeaRider = (data)=>{
        console.log('this is fucking rider data',data)
        axiosSecure.post('riders',data)
        .then(res=>{
            if(res.data.insertedId){
                           Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your apply has been submited.we will reach out",
                  showConfirmButton: false,
                  timer: 1500
                });
            }
        })
    }


      const getDistricts = (region) => {
        if (!region) return [];
        const filtered = serviceCenters.filter(c => c.region === region);
        return filtered.map(item => item.district);
    };



    return (
        <div>
           <h3 className="text-5xl font-bold">Be a Rider</h3>
                 <form className="mt-12 p-4" onSubmit={handleSubmit(handleBeaRider)}>
                
                {/* parcel type */}
               

                {/* parcel info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
                

                </div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Sender Details */}
                    <fieldset className="fieldset">
                        <h2 className="text-3xl font-semibold text-black">Rider Details</h2>

                        <label className="label">Rider Name</label>
                        <input
                            type="text"
                            {...register('riderName')}
                            className="input w-full"
                            placeholder="Sender Name"
                        />

                        <label className="label">Rider Email</label>
                        <input
                            type="email"
                            {...register('riderEmail')}
                            className="input w-full"
                            defaultValue={user.email}
                            placeholder="Sender Email"
                        />

                        {/* Region */}
                        <fieldset className="fieldset mt-4">
                            <legend className="fieldset-legend">Region</legend>
                            <select {...register("region")} className="select">
                                <option disabled selected>Pick a Region</option>
                                {regions.map((r, i) => (
                                    <option key={i} value={r}>{r}</option>
                                ))}
                            </select>
                        </fieldset>

                        {/* District */}
                        <fieldset className="fieldset mt-4">
                            <legend className="fieldset-legend">District</legend>
                            <select {...register("district")} className="select">
                                <option disabled selected>Select District</option>
                                {getDistricts(riderRegion).map((d, i) => (
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
                            {...register('address')}
                            className="input w-full"
                            placeholder="Sender Address"
                        />

                        {/* Phone */}
                        <label className="label mt-4">Phone</label>
                        <input
                            type="number"
                            {...register('phone')}
                            className="input w-full"
                            placeholder="Sender Phone"
                        />
                    </fieldset>

                    {/* Receiver Details */}
                    <fieldset className="fieldset">
                        <h2 className="text-3xl font-semibold text-black">More Details</h2>

                        <label className="label">Driving License</label>
                        <input
                            type="text"
                            {...register('license')}
                            className="input w-full"
                            placeholder="Driving License"
                        />

                        <label className="label">NID</label>
                        <input
                            type="text"
                            {...register('nid')}
                            className="input w-full"
                            placeholder="Rider NID"
                        />
                           {/*Receiver Region */}
                     

                        {/*Receiver District */}
                 

                        <label className="label">Bike</label>
                        <input
                            type="text"
                            {...register('bike')}
                            className="input w-full"
                            placeholder="Bike Model"
                        />


                      
                     

                    </fieldset>
                </div>

                <input type="submit" className="btn btn-primary mt-6" value="Apply a Rider" />
            </form>
        </div>
    );
};

export default Rider;