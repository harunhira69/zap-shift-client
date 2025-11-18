import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hook/useAuth';
import { Link } from 'react-router';
import SocialLogin from './SocialLogin';

const Register = () => {
      const {register,handleSubmit,formState: { errors }} = useForm();

      const {createUserEmail} = useAuth()

    const handleRegistration = (data)=>{
        console.log('after register',data)
        createUserEmail(data.email,data.password).then(res=>{
            console.log(res.user)
        }).catch(err => console.error(err));


    }
    return (
       
            <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
                 <h3 className="text-3xl text-center">Welcome Back</h3>
      <p className='text-center'>Please Register</p>
                 <form className='card-body'
                 onSubmit={handleSubmit(handleRegistration)}>
                    <fieldset className="fieldset">
                 <label className="label">Email</label>
                 <input type="email"
                  {...register('email',{required:true})} 
                  className="input" placeholder="Email" />
                  {errors.email?.type==='required'&&<p className='text-red-500'>Email Required</p>}
       
       
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
                      <p>Already have an account<Link
         className='underline text-blue-400' to='/login'>Login</Link></p>
            </form>
            <SocialLogin></SocialLogin>
            </div>
       
    );
};

export default Register;