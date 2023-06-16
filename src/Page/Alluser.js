import React, { useEffect, useState } from 'react'
import Input from '../components/Input/Input';
import { SearchAlluser, deleteuser, edituser, getalluse } from '../http/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserTable from '../components/UserTable/UserTable';
import * as yup from "yup";
import Paginations from '../components/Paginations/Paginations';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { BiEdit } from 'react-icons/bi';
import { MdOutlineDelete } from 'react-icons/md';
import Deletemodal from '../Model/Deletemodal';
import Usereditmodal from '../Model/Usereditmodal';


const Alluser = () => {

    const [deletmodal, setDeletModal] = useState(false);
    const [editmodal, setEditModal] = useState(false);
    const [alluser, setAllUser] = useState();
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(2);
    const [userdata, setUserdata] = useState();
    const [datalength, setDatalength] = useState();
    const [selectedId, setSelectedId] = useState();
    const imageInputRef = React.useRef();
    const naviget = useNavigate();
    let token = JSON.parse(localStorage.getItem('token'))


    const getdata = (event, page) => {
        getAllUser();
        setPage(page)
        setSize(size)
        // console.log(size)
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
    }

    const theaddata = [
        {
            name: "ID",
            key: "id"
        },
        {
            name: "IMAGE",
            // key: "image",
            render: (item, record) => {
                // console.log("record", record)
                return (
                    <>
                        <div className='flex justify-center items-center'>
                            <img src={record.image} width={100} alt="" />
                        </div>
                    </>
                )
            }
        },
        {
            name: "NAME",
            key: "FirstName"
        },
        {
            name: "NAME",
            key: "LastName"
        },
        {
            name: "Email",
            key: "email"
        },
        {
            name: "Phone",
            key: "ContactNumber"
        },
        {
            name: "City",
            key: "city"
        },
        {
            name: "State",
            key: "state"
        },
        {
            name: "Postcode",
            key: "postcode"
        },
        {
            name: "ACTION",
            render: (item, record) => {
                // console.log("item::", item, record.id)
                return (
                    <>
                        <div className='flex justify-center'>
                            <div onClick={() => { setEditModal(true) }}>
                                <button className='border rounded-md px-2 py-2 bg-green-400 hover:bg-green-700 hover:scale-105  ease duration-300' onClick={() => { singeluser(record.id); setSelectedId(record.id) }} ><BiEdit /></button>
                            </div>
                            <div onClick={() => { setDeletModal(true) }}>
                                <button className='border rounded-md px-2 py-2 bg-red-400 hover:bg-red-700 hover:scale-105  ease duration-300' onClick={() => { setSelectedId(record.id) }}><MdOutlineDelete /></button>
                            </div>
                        </div>
                    </>
                )
            }
        }
    ]


    const singeluser = (id) => {
        axios.get(`http://localhost:8000/singeluser/${id}`, { headers: headers }).then(resp => {
            setUserdata(resp.data.Users)
        }).catch(err => {
            console.log(err)
        })
    }

    const defaultValues = {
        FirstName: userdata?.FirstName,
        LastName: userdata?.LastName,
        email: userdata?.email,
        ContactNumber: userdata?.ContactNumber,
        ADDRESS_LINE_1: userdata?.ADDRESS_LINE_1,
        ADDRESS_LINE_2: userdata?.ADDRESS_LINE_2,
        image: null,
        city: userdata?.city,
        state: userdata?.state,
        postcode: userdata?.postcode
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

    const editUser = async (values, event) => {
        // event.preventDefault();
        console.log("Form DAta", values)
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

        console.log("image ", formData.get('image'))

        const edituse = await edituser(formData, selectedId).then(resp => {
            toast.success(resp.data.message, {
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            setEditModal(false);
            getAllUser()
        }).catch(err => {
            console.log("errr::", err)
            toast.error(err, {
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        })
        // }
    }

    const deleteUser = async () => {
        const deltuser = await deleteuser(selectedId).then(resp => {
            toast.success(resp.data.message, {
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            setDeletModal(false);
            getAllUser();
        }).catch(err => {
            console.log("err----", err)
        })
    }

    const getAllUser = async () => {
        const Userdata = await getalluse(page, size)
        // console.log("userrr", Userdata.data);
        setAllUser(Userdata.data?.data)
        setDatalength(Userdata.data)
    }
    // console.log(formValues)

    const searchUser = async (e) => {
        const searchkey = e.target.value;
        await SearchAlluser(searchkey).then(resp => {
            console.log("respones===", resp.data.results);
            setAllUser(resp.data.results);
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getAllUser(page, size);
    }, [page, size])

    return (
        <>
            <div className='bg-gray-200 h-screen'>
                <div className='flex justify-between p-5'>
                    <div className='text-lg font-bold'>ALL USERS</div>
                    <div>Dashboard / All users</div>
                </div>
                <div className='p-5'>
                    <div className='bg-white w-full rounded-md p-5'>
                        <div className='flex justify-end'>
                            <div><button className='border rounded-3xl py-2 px-5 text-white bg-green-500 font-bold hover:scale-105  ease duration-300' onClick={() => naviget("/adduser")} >+ ADD USER</button></div>
                        </div>
                        <div className='flex justify-between'>
                            <div>
                                <div>Show</div>
                                <div><Input className='border rounded-xl py-2 px-2' type="text" placeholder='number' /></div>
                                <div>entries</div>
                            </div>
                            <div>
                                <div>Search :</div>
                                <div><input className='border rounded-xl py-2 px-2' type="text" placeholder='Search..' onKeyUp={(e) => searchUser(e)} /></div>
                            </div>
                        </div>
                        <div>
                            <UserTable
                                theaddata={theaddata}
                                tbodydata={alluser}
                                editUser={editUser}
                                setEditModal={setEditModal}
                                editmodal={editmodal}
                                validationSchema={validationSchema}
                                defaultValues={defaultValues}
                                imageInputRef={imageInputRef}
                                setDeletModal={setDeletModal}
                                deletmodal={deletmodal}
                            />
                            <Usereditmodal
                                show={editmodal}
                                setEditModal={setEditModal}
                                defaultValues={defaultValues}
                                validationSchema={validationSchema}
                                submit={editUser}
                            />
                            <Deletemodal
                                show={deletmodal}
                                setDeletModal={setDeletModal}
                                Deletecategory={deleteUser}
                            />
                            <Paginations
                                data={getdata}
                                datalength={datalength?.datalength}
                                size={size}
                            />
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Alluser