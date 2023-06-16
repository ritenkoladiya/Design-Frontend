import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import Input from '../components/Input/Input';
import UserTable from '../components/UserTable/UserTable';
import { Searchproduct, allcty, deletepro, getsingelproduct, productall, subcty } from '../http/api';
import moment from 'moment/moment';
import Deletemodal from '../Model/Deletemodal';
import Producteditmodal from '../Model/Producteditmodal';
import axios from 'axios';
import Paginations from '../components/Paginations/Paginations';
import * as yup from "yup";
import { toast } from 'react-toastify';

const Allproduct = () => {
    const [active1, setActive1] = useState(true);
    const [editmodal, setEditModal] = useState(false);
    const [allproduct, setAllproduct] = useState();
    const [deletmodal, setDeletModal] = useState(false);
    const [allcategory, setAllcategory] = useState();
    const [subcategory, setSubcategory] = useState();
    const [singelpro, setSingelpro] = useState();
    const [ctyid, setCty] = useState();
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(4);
    const [datalength, setDatalength] = useState();

    const theaddata = [
        {
            name: "ID",
            key: "id"
        },
        {
            name: "IMAGE",
            render: (item, record) => {
                // console.log("helooooo", item, record);
                return (
                    <div className='flex justify-center items-center'>
                        <img src={record.image} width={100} alt="" />
                    </div>
                )
            }
        },
        {
            name: "Name",
            key: "productname"
        },
        {
            name: "Price",
            key: "price"
        },
        {
            name: "Qty",
            key: "quantity"
        },
        {
            name: "Category",
            render: (item, record) => {
                // console.log("helooooo", item, record);
                return (
                    <div>
                        <div>{record.Category?.category}</div>
                    </div>
                )
            }
        },
        {
            name: "SubCategory",
            render: (item, record) => {
                return (
                    <div>
                        <div>{record.Subcategory?.category}</div>
                    </div>
                )
            }
        },
        {
            name: "Inventory",
            key: "Inventory"
        },
        {
            name: "CountFreeCup",
            key: "Count"
        },
        {
            name: "Is Reedme",
            key: "Redeemable"
        },
        {
            name: "Status",
            render: (item, record) => {
                return (
                    <div className="text-lg text-center" onClick={() => setActive1(!active1)}>
                        {
                            active1 ?
                                <button className='border-2 rounded-2xl px-5 py-1 bg-green-600 text-white text-sm font-bold' >Active</button>
                                : <button className='border-2 rounded-2xl px-5 py-1 bg-red-600 text-white text-sm font-bold' >Inactive</button>
                        }
                    </div>
                )
            }
        },
        {
            name: "Date",
            render: (item, record) => {
                return (
                    <div>
                        {moment(record.date).format('DD/MM/YYYY')}
                    </div>
                )
            }
        },
        {
            name: "ACTION",
            render: (item, record) => {
                // console.log("item::", item, record.id)
                return (
                    <>
                        <div className='flex justify-center'>
                            <div onClick={() => { setEditModal(true) }}>
                                <button className='border rounded-md px-2 py-2 bg-green-400 hover:bg-green-700 hover:scale-105  ease duration-300' onClick={() => { Singelproduct(record.id); setCty(record.id); }}><BiEdit /></button>
                            </div>
                            <div onClick={() => { setDeletModal(true) }}>
                                <button className='border rounded-md px-2 py-2 bg-red-400 hover:bg-red-700 hover:scale-105  ease duration-300' onClick={() => { setCty(record.id); }}><MdOutlineDelete /></button>
                            </div>
                        </div>
                    </>
                )
            }
        }
    ]

    const defaultValues = {
        productname: singelpro?.productname,
        category: singelpro?.category,
        subcategory: singelpro?.subcategory,
        price: singelpro?.price,
        image: null,
        quantity: singelpro?.quantity,
        Description: singelpro?.Description,
        Inventory: singelpro?.Inventory,
        Redeemable: singelpro?.Redeemable,
        Count: singelpro?.Count,
    }

    const getdata = (event, page) => {
        Allproduct();
        setPage(page)
        setSize(size)
        // console.log(size)
    }

    useEffect(() => {
        const getallcategory = async () => {
            await allcty().then(resp => {
                // console.log("cty::::::", resp.data.data);
                setAllcategory(resp.data.data);
            }).catch(err => {
                console.log(err)
            })
        }
        getallcategory()
    }, [])


    const allsubcategory = async (id) => {

        await subcty(id).then(resp => {
            // console.log("getallsubcategory::", resp)
            // console.log("test", resp, id)
            setSubcategory(resp.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const Allproduct = async () => {
        await productall(page, size).then(resp => {
            // console.log("respones", resp.data);
            setAllproduct(resp.data.data)
            setDatalength(resp.data.datalength)
        }).catch((err) => {
            console.log("error", err);
        });
    }

    useEffect(() => {
        Allproduct(page, size);
    }, [page, size])

    const Productdelete = async () => {
        await deletepro(ctyid).then(resp => {
            // console.log("respones", resp)
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
            Allproduct();
        }).catch((err) => {
            console.log("error", err)
        });
    }

    const Singelproduct = async (id) => {
        await getsingelproduct(id).then(resp => {
            // console.log("singelproduct", resp.data.data);
            setSingelpro(resp.data.data);
            allsubcategory(resp.data.data.category);
        }).catch((err) => {
            console.log("error", err);
        })
    }

    const productupdate = async (values) => {
        console.log("values", values)
        const formData = new FormData();
        formData.append("image", values.image);
        formData.append("productname", values.productname);
        formData.append("category", values.category);
        formData.append("subcategory", values.subcategory);
        formData.append("price", values.price);
        formData.append("quantity", values.quantity);
        formData.append("Description", values.Description);
        formData.append("Inventory", values.Inventory);
        formData.append("Redeemable", values.Redeemable);
        formData.append("Count", values.Count);

        // console.log("formdata ", formData.get('image'), formData.get('productname'), formData.get('category'), formData.get('subcategory'), formData.get('price'), formData.get('quantity'), formData.get('Description'), formData.get('Inventory'), formData.get('Redeemable'), formData.get('Count'))

        // console.log("value", values)
        // await updateproduct(formData, ctyid)
        await axios.put(`http://localhost:8000/productupdate/${ctyid}`, formData).then(resp => {
            // console.log("updateproduct", resp);
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
            Allproduct();
        }).catch((err) => {
            console.log("error", err);
        })
    }

    const validationSchema = yup.object().shape({
        productname: yup.string().required("please enter yours productname").matches(/^[A-Za-z]+$/, "productname must contain only letters"),
        category: yup.string().required("please enter yours category"),
        subcategory: yup.string().required("subcategory is required"),
        price: yup.string().required("price is required").min(1, 'Price must be at least 1').max(1000, 'Price cannot exceed 1000').matches(/^[0-9]+$/, "Price must be a number"),
        // image: yup.string().required("image is redquired"),
        quantity: yup.string().required("quantity is required").matches(/^[0-9]+$/, "quantity must be a number"),
        Description: yup.string().required("Description is required").matches(/^[A-Za-z]+$/, "Description must be a letters").min(10, "Description must be at 10 letters").max(1000, "Description cannot exceed 1000"),
        Inventory: yup.string().required("please selected"),
        Redeemable: yup.string().required("please selected"),
        Count: yup.string().required("please selected")
    })

    const Productsearch = async (e) => {
        const value = e.target.value;
        await Searchproduct(value).then(resp => {
            console.log("searchproduct", resp.data.results)
            setAllproduct(resp.data.results)
        }).catch((err) => {
            console.log("error", err);
        });
    }

    return (
        <>
            <div className='bg-gray-200 h-screen'>
                <div className='flex justify-between p-5'>
                    <div className='font-bold'>PRODUCT LIST</div>
                    <div>Dashboard / Product list</div>
                </div>
                <div className='p-5'>
                    <div className='bg-white w-full p-5 rounded-md'>
                        <div className='flex justify-end'>
                            <div>
                                <Link to='/addproduct'>
                                    <button className='border-2 rounded-3xl px-5 py-2 bg-green-700 text-white font-bold hover:scale-105  ease duration-300'>+ Add Product</button>
                                </Link>
                            </div>
                        </div>
                        <div className='flex justify-between mt-5'>
                            <div>
                                <div>Show</div>
                                <div><Input className='border rounded-md shadow-sm px-5 py-1' type="number" placeholder='number' /></div>
                                <div>entries</div>
                            </div>
                            <div>
                                <div>Search :</div>
                                <div><input className='border rounded-md shadow-sm px-5 py-1' type="text" placeholder='Search..' onKeyUp={(e) => Productsearch(e)} /></div>
                            </div>
                        </div>
                        <div>
                            <div className="p-3">
                                <div className="overflow-x-auto ">
                                    <UserTable
                                        theaddata={theaddata}
                                        tbodydata={allproduct}
                                    />
                                    <Deletemodal
                                        show={deletmodal}
                                        setDeletModal={setDeletModal}
                                        Deletecategory={Productdelete}
                                    />
                                    <Producteditmodal
                                        show={editmodal}
                                        setEditModal={setEditModal}
                                        allsubcategory={allsubcategory}
                                        allcategory={allcategory}
                                        subcategory={subcategory}
                                        defaultValues={defaultValues}
                                        submit={productupdate}
                                        singelpro={singelpro}
                                        validationSchema={validationSchema}
                                    />
                                    <Paginations
                                        data={getdata}
                                        datalength={datalength}
                                        size={size}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Allproduct