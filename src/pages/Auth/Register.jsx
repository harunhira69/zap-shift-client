import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hook/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';
import axios from 'axios';

const Register = () => {
      const {register,handleSubmit,formState: { errors }} = useForm();
      const location = useLocation();
      const navigate = useNavigate();

      const {createUserEmail,  updateUserProfile} = useAuth()

    const handleRegistration = (data)=>{
        console.log('after register',data)
        const profileImg = data.photo[0];
        createUserEmail(data.email,data.password).then(res=>{
            console.log(res.user)
          
        const formData = new FormData();
        formData.append('image',profileImg)

        const image_api = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_image}`

        axios.post(image_api,formData).then((res)=>{
          console.log('after image upload',res.data.data.url)
          const updateProfile = {
            displayName : data.name,
            photoURL : res.data.data.url,
          }
          updateUserProfile(updateProfile)
          .then(()=>{
            console.log('after update profile',res.data);
            navigate(location?.state||'/')
          })
          .catch(err=>console.log(err))
        })
  
  

        }).catch(err => console.error(err));


    }
    return (
       
            <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
                 <h3 className="text-3xl text-center">Welcome Back</h3>
      <p className='text-center'>Please Register</p>
                 <form className='card-body'
                 onSubmit={handleSubmit(handleRegistration)}>
                    <fieldset className="fieldset">
                      {/* name */}

                       <label className="label">Name</label>
                 <input type="text"
                  {...register('name',{required:true})} 
                  className="input" placeholder="Your name" />
                  {errors.name?.type==='required'&&<p className='text-red-500'>Name Required</p>}
       
{/* photo */}

    <label className="label">Photo</label>
                 <input type="file"
                  {...register('photo',{required:true})} 
                  className="file-input" placeholder="Your name" />
                  {errors.file?.type==='required'&&<p className='text-red-500'>Name Required</p>}
       


                      {/* email */}
                 <label className="label">Email</label>
                 <input type="email"
                  {...register('email',{required:true})} 
                  className="input" placeholder="Email" />
                  {errors.email?.type==='required'&&<p className='text-red-500'>Email Required</p>}
       
                {/* password */}
                 <label className="label">Password</label>
                 <input type="password" {...register('password',
                   {required:true,
                     minLength:6,
                     pattern:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
       
                       
       
                   })}className="input" placeholder="Password" />
       
                   {errors.password?.type==='required'&&<p className='text-red-500'>Password are required</p>}
       {errors.password?.type==='minLength'&&<p className='text-red-500'>Password must be 6 chracter</p>}
       
       {
         errors.password?.type==='pattern'&&<p className='text-red-500'> "Password must contain uppercase, lowercase, number, special character and be at least 6 characters long"</p>
       }
       
                 <div><a className="link link-hover">Forgot password?</a></div>
                 <button className="btn btn-neutral mt-4">Login</button>
               </fieldset>
                      <p>Already have an account<Link state={location.state}
         className='underline text-blue-400' to='/login'>Login</Link></p>
            </form>
            <SocialLogin></SocialLogin>
            </div>
       
    );
};

export default Register;