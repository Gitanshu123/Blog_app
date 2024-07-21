import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import Input  from './Input'
import Logo from './Logo'
import Button from "./Button"
import {useDispatch} from "react-redux"
import service from '../appwrite/auth'
import {useForm} from "react-hook-form"


function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
          const session  =  await service.login(data)
           
          if(session) {
            const userData = await service.getCurrentUser()

            if(userData) dispatch(authLogin(userData));
             navigate("/")
          }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className='flex items-center justify-center w-full h-auto mt-[3rem] mb-[3rem]'>
         <div className={`mx-auto w-full max-w-lg bg-gray-300 rounded-xl p-10 border border-black/10`}>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo widht="100%" />
                </span>
            </div>

            <h2 className='text-center text-2xl font-bold leading-tight text-gray-700'> Sign in to your account</h2>
            <p className='mt-2 text-center text-base text-gray-700 '>
            Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline text-black/60"
                    >
                        Sign Up
                    </Link>
            </p>

            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

           <form onSubmit={handleSubmit(login)} className='mt-8
           '>
            <div className='space-y-5 text-gray-700'>
                <Input 
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                  <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full hover:bg-blue-900 hover:border-blue-500 "
                >Sign in</Button>

            </div>
            </form> 
         </div>
        </div>
    )
  
}



export default Login