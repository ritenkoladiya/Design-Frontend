import { Link, useNavigate } from 'react-router-dom';
import Component from '../Component'
import { useState } from 'react';
import { Regi } from '../http/api';
import { toast } from 'react-toastify';

const Registration = () => {

    const [formValues, setFormValues] = useState({
        FirstName: "",
        LastName: "",
        ContactNumber: "",
        email: "",
        password: ""
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const naviget = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
        if (isSubmit) {
            setFormErrors(validate({ ...formValues, [name]: value }));
        }
    }

    const validate = (value) => {
        const errors = {};
        if (!value.FirstName) {
            errors.FirstName = "FirstName Is Required";
        } else if (!value.FirstName.match(/^[A-Za-z]+$/)) {
            errors.FirstName = " FirstName Must String";
        }

        if (!value.LastName) {
            errors.LastName = "LastName Is Required";
        } else if (!value.LastName.match(/^[A-Za-z]+$/)) {
            errors.LastName = " LastName Must String";
        }

        if (!value.ContactNumber) {
            errors.ContactNumber = " ContactNumber is Required ";
        } else if (!value.ContactNumber.match(/^[0-9]*$/)) {
            errors.ContactNumber = "Mobile Number Must  Be A Number";
        } else if (!value.ContactNumber.match(/^\d{10}$/)) {
            errors.ContactNumber = "Please Add Valid Mobile Number"
        }

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

    const Rgi = async (e) => {
        console.log('RGI:', formValues);

        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        const errors = validate(formValues);

        if (Object.keys(errors).length === 0) {
            const Regist = await Regi(formValues).then(resp => {
                // console.log("success", resp);
                toast.success(resp.data.message, {
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                naviget("/login")
            }).catch(err => {
                console.log("error", err);
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
                        <div className='text-2xl'>Welcome</div>
                    </div>
                    <div className='mt-10 p-8'>
                        <div className='mb-10 grid grid-cols-2 gap-3'>
                            <div className='text-sm mb-3'>FirstName
                                <input className='py-2 pl-2 w-full border rounded-md shadow-md' type="email" placeholder='Your Name' name='FirstName' value={formValues.FirstName} onChange={handleInputChange} />
                                <div className='text-red-600 font-bold'>{formErrors.FirstName}</div>
                            </div>
                            <div className='text-sm mb-3'>LastName
                                <input className='py-2 pl-2 w-full border rounded-md shadow-md' type="email" placeholder='Your Name' name='LastName' value={formValues.LastName} onChange={handleInputChange} />
                                <div className='text-red-600 font-bold'>{formErrors.LastName}</div>
                            </div>
                        </div>
                        <div className='mb-10'>
                            <div className='text-sm mb-3'>ContactNumber</div>
                            <input className='py-2 pl-2 w-full border rounded-md shadow-md' type="email" placeholder='contact' name='ContactNumber' value={formValues.ContactNumber} onChange={handleInputChange} />
                            <div className='text-red-600 font-bold'>{formErrors.ContactNumber}</div>
                        </div>
                        <div className='mb-10'>
                            <div className='text-sm mb-3'>{Component.email}</div>
                            <input className='py-2 pl-2 w-full border rounded-md shadow-md' type="email" placeholder='Your Email Address' name='email' value={formValues.email} onChange={handleInputChange} />
                            <div className='text-red-600 font-bold'>{formErrors.email}</div>
                        </div>
                        <div className='mb-10'>
                            <div className='text-sm mb-3'>{Component.password}</div>
                            <input className='py-2 pl-2 w-full border rounded-md shadow-md' type="Password" placeholder='Password' name='password' value={formValues.password} onChange={handleInputChange} />
                            <div className='text-red-600 font-bold'>{formErrors.password}</div>
                        </div>
                        <div className='flex flex-col items-center'>
                            {/* <Link to='/Dashboard'> */}
                            <button className='bg-blue-600 border rounded-md p-2 w-full text-white' onClick={Rgi} >Registration</button>
                            <button className='mt-2 hover:text-blue-900' onClick={() => naviget("/login")}>{Component.Sign}</button>
                            {/* </Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Registration