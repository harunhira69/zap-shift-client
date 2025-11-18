import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hook/useAuth';
import { Link } from 'react-router';
import SocialLogin from './SocialLogin';


const Login = () => {
  const {signIn,} = useAuth()
  
  const {register,handleSubmit,formState: { errors }} = useForm();
  const handleLogin =(data)=>{
    console.log('after Login',data)
  signIn(data.email,data.password).then(res=>console.log(res.user)).catch(err=>console.log(err));


  }
    return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center">Welcome Back</h3>
      <p className='text-center'>Please Login</p>
      <form onSubmit={handleSubmit(handleLogin)} className="card-body">
        <fieldset className="fieldset">
          <label className="label">Email</label>

          <input type="email"
           className="input" {...register('email',{required:true})}
          placeholder="Email" />
{errors.email?.type==='required'&&<p className='text-red-500'>Email are required</p>}


          <label className="label">Password</label>

          <input type="password"
           className="input" {...register('password',{required:true,minLength:6})}
           placeholder="Password" />

{errors.password?.type==='minLength'&&<p className='text-red-500'>Password must be 6 charcter or longer</p>}

          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
        <p>New to zapshift?<Link
         className='underline text-blue-400' to='/register'>Register</Link></p>
         
      </form>
      <SocialLogin></SocialLogin>
    </div>

    );
};

export default Login;