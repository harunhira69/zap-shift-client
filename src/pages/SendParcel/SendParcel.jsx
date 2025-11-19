import React from 'react';
import { useForm } from 'react-hook-form';

const SendParcel = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const handleSendParcel = data => {
        console.log(data)

    }
    return (
        <div>
            <h2 className="text-5xl font-bold">Send a Parcel</h2>
            <form className='mt-12 p-4'
                onSubmit={handleSubmit(handleSendParcel)}>
                {/* document */}
                <div>
                    <label className="label mr-4" >
                        <input type="radio" {...register('parcelType')} value="document" className="radio" defaultChecked />
                        Document</label>
                    <label className="label mr-4" >
                        <input type="radio" {...register('parcelType')} value="non-document" className="radio" defaultChecked />
                        non-Document</label>
                </div>

                {/* parcel info (name,weight) */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Name</label>
                        <input type="text" {...register('parcelName')} className="input w-full" placeholder="your parcel" />
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label">Parcel Weight</label>
                        <input type="number" {...register('parcelWeight')} className="input w-full" placeholder="your parcel weight" />
                    </fieldset>
                </div>

                {/* two column */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                   
                    {/* sender name */}
                    <fieldset className="fieldset">
                         <h2 className="text-3xl font-semibold text-black">Sender Details</h2>
                        <label className="label">Sender Name</label>
                        <input type="text" {...register('senderName')} className="input w-full" placeholder="senderName" />
                

                    {/* sender address */}

                 
                        <label className="label">Address</label>
                        <input type="text" {...register('senderAddress')} className="input w-full" placeholder="Address" />
                 


                    {/* sender phone */}

                   
                        <label className="label">Phone</label>
                        <input type="number" {...register('senderPhone')} className="input w-full" placeholder="Phone" />
               

                    {/* sender district */}
                  
                        <label className="label">District</label>
                        <input type="text" {...register('senderDistrict')} className="input w-full" placeholder="District" />
                    </fieldset>


                    {/* receiver info */}

                    <fieldset className="fieldset">
                         <h2 className="text-3xl font-semibold text-black">Receiver Details</h2>
                        <label className="label">Receiver Name</label>
                        <input type="text" {...register('ReceiverName')} className="input w-full" placeholder="ReceiverName" />
              

                    {/*Receiver address */}

                 
                        <label className="label">Address</label>
                        <input type="text" {...register('receiverAddress')} className="input w-full" placeholder="Address" />
          


                    {/*Receiver phone */}

             
                        <label className="label">Phone</label>
                        <input type="number" {...register('receiverPhone')} className="input w-full" placeholder="Phone" />
            

                    {/* Receiver district */}
            
                        <label className="label">District</label>
                        <input type="text" {...register('receiverDistrict')} className="input w-full" placeholder="District" />
                    </fieldset>





                </div>



                <input type="submit" className='btn btn-primary text-black' value="Send Parcel" />
            </form>
        </div>
    );
};

export default SendParcel;