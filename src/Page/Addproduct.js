import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, ErrorMessage } from 'formik';
import { allcty, productadd, subcty } from '../http/api';
import * as yup from "yup";


const Addproduct = () => {

    const [files, setFiles] = useState([]);
    const naviget = useNavigate();
    const imageInputRef = React.useRef();
    const [redeemable, setRedeemable] = useState();
    const [cup, setCup] = useState();
    const [allcategory, setAllcategory] = useState();
    const [subcategoryid, setsubcategoryid] = useState();

    console.log(files)

    const defaultValues = {
        productname: "",
        category: "",
        subcategory: "",
        price: "",
        image: null,
        quantity: "",
        Description: "",
        Inventory: "",
        Redeemable: "",
        Count: ""
    }

    useEffect(() => {
        const getallcategory = async () => {
            await allcty().then(resp => {
                setAllcategory(resp.data.data);
            }).catch(err => {
                console.log(err)
            })
        }
        getallcategory()
    }, [])
    // console.log("getallcategory:::", allcategory)

    const allsubcategory = async (e) => {
        const ID = e.target.value;
        console.log("cty::::::", ID);
        await subcty(ID).then(resp => {
            console.log("getallsubcategory::", resp)
            setsubcategoryid(resp.data)
            // setAllcategory(resp.data);
        }).catch(err => {
            console.log(err)
        })
    }

    const validationSchema = yup.object().shape({
        productname: yup.string().required("please enter yours productname").matches(/^[a-zA-Z\s]+$/, "productname must contain only letters"),
        category: yup.string().required("please enter yours category"),
        subcategory: yup.string().required("subcategory is required"),
        price: yup.string().required("price is required").min(1, 'Price must be at least 1').max(1000, 'Price cannot exceed 1000').matches(/^[0-9]+$/, "Price must be a number"),
        image: yup.string().required("image is redquired"),
        quantity: yup.string().required("quantity is required").matches(/^[0-9]+$/, "quantity must be a number"),
        Description: yup.string().required("Description is required").matches(/^[a-zA-Z\s]+$/, "Description must be a letters").min(10, "Description must be at 10 letters").max(1000, "Description cannot exceed 1000"),
        Inventory: yup.string().required("please selected"),
        Redeemable: yup.string().required("please selected"),
        Count: yup.string().required("please selected")
    })

    const handleFormSubmit = async (values) => {
        console.log("------------", values)
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
        console.log("first", formData.get('image'))

        await productadd(formData).then(resp => {
            console.log("resp", resp);
            toast.success(resp.data.message, {
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            naviget("/allproduct")
        }).catch((err) => {
            console.log("err", err);
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
        })
    }

    return (


        <div className='bg-gray-200 h-screen'>
            <div>
                <div className='flex justify-between p-5'>
                    <div className='text-lg font-bold'>ADD PRODUCT</div>
                    <div>Dashboard / Add Product</div>
                </div>
                <div className='p-5'>
                    <Formik
                        initialValues={defaultValues}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit}
                        // enableReinitialize
                        onReset
                    >
                        {({ handleChange, handleSubmit, setFieldValue }) => {
                            return (
                                <form
                                    encType="multipart/form-data"
                                    onSubmit={handleSubmit}
                                >
                                    <div className='bg-white w-full rounded-sm p-5'>
                                        <div className='font-bold mb-5'>Add Product</div>
                                        <div className='grid grid-cols-2 gap-10'>
                                            <div>
                                                <div>Product Nmae</div>
                                                <div className='mt-2'>
                                                    <input className='border border-none focus:outline-blue-400 bg-blue-50 rounded-md w-full py-2 pl-2 shadow-md' type="text" placeholder='Product Name' name='productname' onChange={(e) => { handleChange(e) }} />
                                                    <div className='text-red-600 '>< ErrorMessage name='productname' /></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div>Select Category</div>
                                                <div className='mt-2'>


                                                    <select onChange={(e) => { allsubcategory(e); handleChange(e); }} name='category' as="selected" className='border border-none focus:outline-blue-400 bg-blue-50 rounded-md w-full py-2 pl-2 shadow-md'>
                                                        <option label="select" selected disabled>select</option>
                                                        {
                                                            allcategory?.map((e, index) => {
                                                                return (
                                                                    <>
                                                                        <option key={index} value={e.id}>{e.category}</option>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                    <div className='text-red-600 '>< ErrorMessage name='category' /></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-2 gap-10 mt-10'>
                                            <div>
                                                <div>Select SubCategory</div>
                                                <div className='mt-2'>
                                                    <select id="cars" onChange={(e) => { handleChange(e) }} name='subcategory' as="selected" className='border border-none focus:outline-blue-400 bg-blue-50 rounded-md w-full py-2 pl-2 shadow-md'>
                                                        <option label="select" selected disabled>select</option>
                                                        {
                                                            subcategoryid?.map((e) => {
                                                                return (
                                                                    <>

                                                                        <option value={e.id}>{e.category}</option>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                    <div className='text-red-600 '>< ErrorMessage name='subcategory' /></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div>Price</div>
                                                <div className='mt-2'>
                                                    <input className='border border-none focus:outline-blue-400 bg-blue-50 rounded-md w-full py-2 pl-2 shadow-md' type="price" placeholder='Price' name='price' onChange={(e) => { handleChange(e) }} />
                                                    <div className='text-red-600 '>< ErrorMessage name='price' /></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-2 gap-10'>
                                            <div>
                                                <div className='mt-10'>Image</div>
                                                <div class="flex items-center w-full">
                                                    <label for="dropzone-file" class="flex flex-col items-center justify-center  w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                            <svg class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                            <p class="text-xs text-gray-500 dark:text-gray-400">{files.name}</p>
                                                        </div>
                                                        <input id="dropzone-file" name='image' type="file" class="hidden" ref={imageInputRef} onChange={(event) => {
                                                            setFieldValue("image", event.currentTarget.files[0]);
                                                            setFiles(URL.createObjectURL(event.currentTarget.files[0]))
                                                        }} />
                                                    </label>
                                                    <label className='flex flex-col items-center justify-center ml-5  w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'>
                                                        <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                                            <img src={files} alt="" style={{ width: 200 }} />
                                                        </div>
                                                    </label>
                                                </div>
                                                <div className='text-red-600 '>< ErrorMessage name='image' /></div>
                                                {/* <Link to='/allproduct'> */}
                                                <button className='mt-5 border py-2 px-5 rounded-lg bg-blue-800 text-white font-bold hover:scale-105  ease duration-300'>Save</button>
                                                {/* </Link> */}
                                                <Link to='/allproduct'>
                                                    <button className='mt-5 border py-2 px-5 rounded-lg bg-red-800 text-white font-bold hover:scale-105  ease duration-300'>Cancel</button>
                                                </Link>
                                            </div>
                                            <div>
                                                <div className='mt-10'>
                                                    <div className='mb-1'>quantity</div>
                                                    <div>
                                                        <input type="number" placeholder='Quantity' className='border border-none focus:outline-blue-400 bg-blue-50 rounded-md w-full py-2 pl-2 shadow-md' name='quantity' onChange={(e) => { handleChange(e) }} />
                                                        <div className='text-red-600 '>< ErrorMessage name='quantity' /></div>
                                                    </div>
                                                </div>
                                                <div className='mt-10'>Description</div>
                                                <div><textarea className='mt-2 border border-none focus:outline-blue-400 bg-blue-50 rounded-md shadow-md w-full h-32 pl-2' type="text" placeholder='Description' name='Description' onChange={(e) => { handleChange(e) }} /></div>
                                                <div className='text-red-600 '>< ErrorMessage name='Description' /></div>
                                                <div className='flex mt-10'>
                                                    <div className='flex  items-center'>
                                                        <input className='mr-2 hover:scale-105  ease duration-300 ' type="radio" value="yes" name='Inventory' onChange={(e) => { handleChange(e) }} />
                                                        <div>Need Prepairing</div>
                                                    </div>
                                                    <div className='flex  items-center ml-20'>
                                                        <input className='mr-2 hover:scale-105  ease duration-300' type="radio" value="no" name='Inventory' onChange={(e) => { handleChange(e) }} />
                                                        <div>Is Inventory</div>
                                                    </div>
                                                </div>
                                                <div className='text-red-600 '>< ErrorMessage name='Inventory' /></div>
                                                <div>
                                                    <div className='flex mt-10'>
                                                        <div>
                                                            <div className='font-bold'>Is Redeemable :</div>
                                                        </div>
                                                        <div>
                                                            <input type="radio" className=' ml-2 h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300' value="yes" name='Redeemable' onChange={(e) => { handleChange(e) }} />
                                                            <label className='text-sm font-medium text-gray-900 ml-1'> YES</label>
                                                            <input type="radio" className=' ml-2 h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300' value="no" name='Redeemable' onChange={(e) => { handleChange(e) }} />
                                                            <label className='text-sm font-medium text-gray-900 ml-1'> NO</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='text-red-600 '>< ErrorMessage name='Redeemable' /></div>
                                                <div className='flex mt-5'>
                                                    <div>
                                                        <div className='font-bold'>Count Free Cup :</div>
                                                    </div>
                                                    <div>
                                                        <input type="radio" className=' ml-2 h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300' name='Count' value="yes" onChange={(e) => { handleChange(e) }} />
                                                        <label className='text-sm font-medium text-gray-900 ml-1'>YES</label>
                                                        <input type="radio" className=' ml-2 h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300' name='Count' value="no" onChange={(e) => { handleChange(e) }} />
                                                        <label className='text-sm font-medium text-gray-900 ml-1'>No</label>
                                                    </div>
                                                </div>
                                                <div className='text-red-600 '>< ErrorMessage name='Count' /></div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </div>

    )
}

export default Addproduct