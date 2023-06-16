import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import component from '../Component'
import Component from '../Component'
import { login } from '../http/api';
import { toast } from 'react-toastify';

const Login = () => {

    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    })
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const naviget = useNavigate();
    let token = JSON.parse(localStorage.getItem('token'))

    // const errors = {};

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
        if (isSubmit) {
            setFormErrors(validate({ ...formValues, [name]: value }));
        }
    };

    const validate = (value) => {
        const errors = {};
        if (!value?.email) {
            errors.email = "Email is required";
        } else if (!value?.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i)) {
            errors.email = "please add valid email"
        }

        if (!value.password) {
            errors.password = "Password is required";
        } else if (!value.password.match(/[0-9]/)) {
            errors.password = "please add valid password"
        }

        return errors;
    }

    const Login = async (e) => {
        console.log("login user::", formValues);

        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        const errors = validate(formValues);

        if (Object.keys(errors).length === 0) {
            await login(formValues).then(resp => {
                console.log("success", resp);
                localStorage.setItem("token", JSON.stringify(resp.data.data.token))
                toast.success(resp.data.message, {
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                // setFormValues("");
                naviget("/Dashboard");
                // window.location.reload();
            }).catch(err => {
                // console.log("Eroor", err.response?.data.message);
                const error = err.response?.data.error;
                toast.error(error, {
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            });
        }
    }

    return (
        <>
            <div className='h-screen flex flex-col items-center justify-center bg-gray-300'>
                <div className='flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-0 rounded-md w-full max-w-md'>
                    <div className='bg-blue-200 rounded-t-md p-8 h-full w-full'>
                        <div className='text-2xl'>{Component.loginwelcome}</div>
                        <div className='py-1 mb-10'>{Component.loginsing}</div>
                    </div>
                    <div className='absolute mt-28 ml-5'><img width={100} src={require('../images/loginuser.png')} alt="" /></div>
                    <div className='mt-10 p-8'>
                        <div className='mb-10'>
                            <div className='text-sm mb-3'>{component.email}</div>
                            <input className='py-2 pl-2 w-full border rounded-md shadow-md' type="email" placeholder='Your Email Address' name='email' value={formValues.email} onChange={handleInputChange} />
                            <div className='text-red-600 font-bold'>{formErrors.email}</div>
                        </div>
                        <div className='mb-10'>
                            <div className='text-sm mb-3'>{component.password}</div>
                            <input className='py-2 pl-2 w-full border rounded-md shadow-md' type="password" placeholder='Password' name='password' value={formValues.password} onChange={handleInputChange} />
                            <div className='text-red-600 font-bold'>{formErrors.password}</div>
                        </div>
                        <div className='flex flex-col items-center'>
                            <button className='bg-blue-600 border rounded-md p-2 w-full text-white' onClick={Login} >{component.Sign}</button>
                            <button className='mt-2 hover:text-blue-900' onClick={() => naviget("/")}>Registration</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login