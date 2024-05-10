import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../store/authSlice';
import Button from './Button';
import Input from './Input';
import Logo from './Logo';
import { useDispatch } from 'react-redux';

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [register, handleSubmit] = useForm();
    const dispatch = useDispatch();

    const create = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const user = await authService.getCurrentUser();
                if (user) dispatch(login(user));
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <div className='flex items-center justify-center'>
            <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-right'>Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {
                    error && <p className='text-red-600 text-center mt-8'>{error}</p>
                }
                <form onSubmit={handleSubmit(create)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            lable='Full Name: '
                            placeholder="Enter your Full Name"
                            {...register('fullName', { required: true })}
                        />
                        <Input
                            lable="Email: "
                            placeholder="Enter your Email"
                            type="text"
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPattern: () => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address"
                                }
                            })
                            }
                        />
                        <Input
                            lable='Passwrod: '
                            type='password'
                            placeholder="Enter your Password"
                            {...register('password'), { required: true }}
                        />
                        <Button type='submit' className='w-full'>Create Account</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup