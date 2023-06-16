import React from 'react'
// import { Adduse, adduser } from '../http/api';
import { toast } from 'react-toastify';
import { Formik, ErrorMessage } from 'formik';
import axios from 'axios';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';

const Adduser = () => {

    const imageInputRef = React.useRef();
    const naviget = useNavigate();

    let token = JSON.parse(localStorage.getItem('token'))
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
            "Content-Type": "multipart/form-data"
        }
    }

    const defaultValues = {
        FirstName: "",
        LastName: "",
        email: "",
        ContactNumber: "",
        ADDRESS_LINE_1: "",
        ADDRESS_LINE_2: "",
        image: null,
        city: "",
        state: "",
        postcode: ""
    }

    const validationSchema = yup.object().shape({
        FirstName: yup.string().required("Please enter your FirstName").matches(/^[A-Za-z]+$/, "Name must contain only letters"),
        LastName: yup.string().required("Please enter your LastName").matches(/^[A-Za-z]+$/, "Name must contain only letters"),
        email: yup.string().required("Email is required").matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Please Add Valid Email"),
        ContactNumber: yup.string().required("ContactNumber Is Required").matches(/^[0-9]*$/, "Mobile Number Must  Be A Number").matches(/^\d{10}$/, "Please Add Valid Mobile Number"),
        ADDRESS_LINE_1: yup.string().required("Address Is Required").max(50, "Address must not exceed 50 characters"),
        ADDRESS_LINE_2: yup.string().required("Address Is Required").max(50, "Address must not exceed 50 characters"),
        city: yup.string().required("City Is Required").matches(/^(?!.*\b\w+\s\w+\b)[a-zA-Z\s']+$/u, "Invalid City"),
        state: yup.string().required("State Is Required").matches(/^(?:Andhra Pradesh|Arunachal Pradesh|Assam|Bihar|Chhattisgarh|Goa|Gujarat|Haryana|Himachal Pradesh|Jharkhand|Karnataka|Kerala|Madhya Pradesh|Maharashtra|Manipur|Meghalaya|Mizoram|Nagaland|Odisha|Punjab|Rajasthan|Sikkim|Tamil Nadu|Telangana|Tripura|Uttar Pradesh|Uttarakhand|West Bengal|Andaman and Nicobar Islands|Chandigarh|Dadra and Nagar Haveli|Daman and Diu|Lakshadweep|Delhi|Puducherry)$/, "Invalid State"),
        postcode: yup.string().required("Postcode Is Required").matches(/^\d{6}(?:-\d{4})?$/, "Please Add Valid Postcode"),
        // image: yup.string().required("Image Is Required")
    })

    const handleFormSubmit = async (values) => {
        // e.preventDefault();
        console.log("first", values)
        const formData = new FormData();
        formData.append("image", values.file)
        formData.append("FirstName", values.FirstName);
        formData.append("LastName", values.LastName)
        formData.append("email", values.email)
        formData.append("ContactNumber", values.ContactNumber)
        formData.append("ADDRESS_LINE_1", values.ADDRESS_LINE_1)
        formData.append("ADDRESS_LINE_2", values.ADDRESS_LINE_2)
        formData.append("city", values.city)
        formData.append("state", values.state)
        formData.append("postcode", values.postcode)
        console.log("first", formData.get('image'))

        axios.post("http://localhost:8000/adduser", formData, config).then(resp => {
            // console.log("respppppp", resp)
            naviget("/alluser")
            toast.success(resp.data.message, {
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }).catch(err => {
            // console.log("errrrrrrrrrrrr", err)
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

    return (
        <>
            <div className='bg-gray-200 h-screen'>
                <div>
                    <div className='p-5 flex justify-between'>
                        <div className='font-bold text-lg'>ADD USER</div>
                        <div>Dashboard / Add user</div>
                    </div>
                </div>
                <div className='p-5'>
                    <Formik
                        initialValues={defaultValues}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit}
                        enableReinitialize
                    // onSubmit={(values) => {
                    //     console.log('Form values:', values);
                    // }}
                    >
                        {({ handleChange, handleSubmit, setFieldValue }) => {
                            return (
                                <form
                                    encType="multipart/form-data"
                                    onSubmit={handleSubmit}
                                >
                                    <div className='bg-white rounded-md p-10'>
                                        <div>
                                            <div className='font-bold'>ADD USER</div>
                                        </div>
                                        <div>
                                            <div className='flex justify-center mt-10'>
                                                <div className='grid grid-cols-2 gap-5'>
                                                    <div>
                                                        <div className='text-sm'>FIRST NAME</div>
                                                        <div>
                                                            {/* <Field className='border border-none focus:outline-blue-400 bg-blue-50 rounded-md py-1 px-2 w-96' type="text" placeholder='First name' /> */}
                                                            <input className='border border-none focus:outline-blue-400 bg-blue-50 rounded-md py-1 px-2 w-96' placeholder="firstname" type="text" name='FirstName' id="FirstName" onChange={(e) => {
                                                                handleChange(e);
                                                            }} />
                                                            <div className='text-red-600 '>< ErrorMessage name='FirstName' /></div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='text-sm'>LAST NAME</div>
                                                        <div>
                                                            {/* <input className='border border-none focus:outline-blue-400 bg-blue-50 rounded-md py-1 px-2 w-96' type="text" placeholder='Last name' /> */}
                                                            <input className='border border-none focus:outline-blue-400 bg-blue-50 rounded-md py-1 px-2 w-96' placeholder="Lastname" type="text" name='LastName' id="LastName" onChange={(e) => {
                                                                handleChange(e);
                                                            }} />
                                                            <div className='text-red-600 '>< ErrorMessage name='LastName' /></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='mt-10'>
                                            <div className='flex justify-center'>
                                                <div className='grid grid-cols-2 gap-5'>
                                                    <div>
                                                        <div className='text-sm'>EMAIL</div>
                                                        <div><input className='border border-none focus:outline-blue-400 bg-blue-50 rounded-md py-1 px-2 w-96' type="email" placeholder='Email' name='email' id="email" onChange={(e) => {
                                                            handleChange(e);
                                                        }} /></div>
                                                        <div className='text-red-600 '>< ErrorMessage name='email' /></div>
                                                    </div>
                                                    <div>
                                                        <div className='text-sm'>PHONE NUMBER</div>
                                                        <div><input className='border border-none focus:outline-blue-400 bg-blue-50 rounded-md py-1 px-2 w-96' type="text" placeholder='Phone' name='ContactNumber' id="ContactNumber" onChange={(e) => {
                                                            handleChange(e);
                                                        }} /></div>
                                                        <div className='text-red-600 '>< ErrorMessage name='ContactNumber' /></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex justify-center mt-10'>
                                            <div className='grid grid-cols-2 gap-5'>
                                                <div>
                                                    <div>ADDRESS LINE-1</div>
                                                    <div><input className='border border-none focus:outline-blue-400 bg-blue-50 rounded-md py-1 px-2 w-96' type="text" placeholder='Address' name='ADDRESS_LINE_1' id="ADDRESS_LINE_1" onChange={(e) => {
                                                        handleChange(e);
                                                    }} /></div>
                                                    <div className='text-red-600 '>< ErrorMessage name='ADDRESS_LINE_1' /></div>
                                                </div>
                                                <div>
                                                    <div>ADDRESS LINE-2</div>
                                                    <div><input className='border border-none focus:outline-blue-400 bg-blue-50 rounded-md py-1 px-2 w-96' type="text" placeholder='Address' name='ADDRESS_LINE_2' id="ADDRESS_LINE_2" onChange={(e) => {
                                                        handleChange(e);
                                                    }} /></div>
                                                    <div className='text-red-600 '>< ErrorMessage name='ADDRESS_LINE_2' /></div>
                                                </div>
                                                <div className='mt-5'>
                                                    <div>City</div>
                                                    <div><input className='border border-none focus:outline-blue-400 bg-blue-50 rounded-md py-1 px-2 w-96' type="text" placeholder='City' name='city' id="city" onChange={(e) => {
                                                        handleChange(e);
                                                    }} /></div>
                                                    <div className='text-red-600 '>< ErrorMessage name='city' /></div>
                                                </div>
                                                <div>
                                                    <div className='mt-5'>State</div>
                                                    <div><input className='border border-none focus:outline-blue-400 bg-blue-50 rounded-md py-1 px-2 w-96' type="text" placeholder='State' name='state' id="state" onChange={(e) => {
                                                        handleChange(e);
                                                    }} /></div>
                                                    <div className='text-red-600 '>< ErrorMessage name='state' /></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex justify-center mt-10'>
                                            <div className='grid grid-cols-2 gap-5'>
                                                <div>POSTCODE
                                                    <div><input className='border border-none focus:outline-blue-400 bg-blue-50 rounded-md py-1 px-2 w-96' type="number" placeholder='Postcode' name='postcode' id="postcode" onChange={(e) => {
                                                        handleChange(e);
                                                    }} /></div>
                                                    <div className='text-red-600'>< ErrorMessage name='postcode' /></div>
                                                </div>
                                                <div>Upload file
                                                    <div><input className='border border-none focus:outline-blue-400 bg-blue-50 rounded-md  w-96 h-8' type="file" name='image' id="image" ref={imageInputRef} onChange={(event) => {
                                                        setFieldValue("file", event.currentTarget.files[0]);
                                                    }} /></div>
                                                    <div className='text-red-600'>< ErrorMessage name='image' /></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex justify-center mt-10'>
                                            <div><button className='border rounded-md py-2 px-5 font-bold text-white bg-blue-700 hover:scale-105  ease duration-300' >ADD USER</button></div>
                                        </div>
                                    </div>
                                </form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default Adduser