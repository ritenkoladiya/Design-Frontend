import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';


const Producteditmodal = (props) => {
    const imageInputRef = React.useRef();
    const { show, setEditModal, allsubcategory, allcategory, subcategory, defaultValues, submit, singelpro, validationSchema } = props;
    // console.log("defaultValues", defaultValues)

    return (
        <div className={show ? "" : "hidden"}>
            <Formik
                initialValues={defaultValues}
                validationSchema={validationSchema}
                onSubmit={submit}
                enableReinitialize
            >
                {({ values, handleChange, handleSubmit, setFieldValue }) => {
                    return (
                        <form
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                        >
                            <div className="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster backdrop-brightness-90">
                                <div
                                    className=" shadow-lg modal-container bg-white w-11/12 md:w-[500px] mx-auto rounded z-50 overflow-y-auto">
                                    <div className="modal-content py-4 text-left px-6">
                                        <div className="flex justify-between items-center pb-3">
                                            <div className="text-2xl font-bold">EDIT USER</div>
                                            <div className="modal-close cursor-pointer z-50" onClick={() => { setEditModal(false) }}>
                                                <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                    viewBox="0 0 18 18">
                                                    <path
                                                        d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z">
                                                    </path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="my-5 text-black font-bold">
                                            <div className='grid grid-cols-2 justify-items-center gap-5'>
                                                <div><input className='border rounded-md py-2 px-2' type="text" placeholder='productname' name='productname' id='productname' value={values.productname} onChange={(e) => {
                                                    handleChange(e);
                                                }} />
                                                    <div className='text-red-600 text-xs'>< ErrorMessage name='productname' /></div>
                                                </div>
                                                <div className='w-full'>
                                                    <select onChange={(e) => { allsubcategory(e.target.value); handleChange(e); }} value={values?.category} name='category' as="selected" className='border border-none focus:outline-blue-400 bg-blue-50 rounded-md w-full py-2 pl-2 shadow-md'>
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
                                                    <div className='text-red-600 text-xs '>< ErrorMessage name='category' /></div>
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-2 gap-5 justify-items-center mt-5'>
                                                <div className='w-full'>
                                                    <select id="cars" onChange={handleChange} value={values?.subcategory} name='subcategory' as="selected" className='border border-none focus:outline-blue-400 bg-blue-50 rounded-md w-full py-2 pl-2 shadow-md'>
                                                        <option label="select" selected disabled>select</option>
                                                        {
                                                            subcategory?.map((e) => {
                                                                return (
                                                                    <>

                                                                        <option value={e.id} >{e.category}</option>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                    <div className='text-red-600 text-xs '>< ErrorMessage name='subcategory' /></div>
                                                </div>
                                                <div><input className='border rounded-md py-2 px-2' type="text" placeholder='price' name='price' id='price' value={values.price} onChange={(e) => {
                                                    handleChange(e);

                                                }} />
                                                    <div className='text-red-600 text-xs '>< ErrorMessage name='price' /></div>
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-2 gap-5 justify-items-center mt-5'>
                                                <div><input className='border rounded-md py-2 px-2' type="text" placeholder='quantity' name='quantity' id='quantity' value={values.quantity} onChange={(e) => {
                                                    handleChange(e);

                                                }} />
                                                    <div className='text-red-600 text-xs '>< ErrorMessage name='quantity' /></div>
                                                </div>
                                                <div><input className='border rounded-md py-2 px-2' type="text" placeholder='Description' name='Description' id='Description' value={values.Description} onChange={(e) => {
                                                    handleChange(e);

                                                }} />
                                                    <div className='text-red-600 text-xs '>< ErrorMessage name='Description' /></div>
                                                </div>
                                            </div>
                                            <div className=' justify-center mt-5'>
                                                <div>
                                                    <input className='border border-none focus:outline-blue-400 bg-blue-50 rounded-md  w-full' type="file" name='image' id="image" ref={imageInputRef} onChange={(event) => {
                                                        setFieldValue("image", event.currentTarget.files[0]);
                                                    }} />
                                                </div>
                                            </div>
                                            <div className=' justify-center mt-5'>
                                                <div>
                                                    <div className='flex mt-10'>
                                                        <div className='flex  items-center'>
                                                            <input className='mr-2 hover:scale-105  ease duration-300 ' type="radio" checked={values.Inventory == 'yes' ? true : false} value="yes" name='Inventory' onChange={(e) => { handleChange(e) }} />
                                                            <div>Need Prepairing</div>
                                                        </div>
                                                        <div className='flex  items-center ml-20'>
                                                            <input className='mr-2 hover:scale-105  ease duration-300' type="radio" checked={values.Inventory == 'no' ? true : false} value="no" name='Inventory' onChange={(e) => { handleChange(e) }} />
                                                            <div>Is Inventory</div>
                                                        </div>
                                                    </div>
                                                    <div className='text-red-600 text-xs '>< ErrorMessage name='Inventory' /></div>
                                                </div>
                                                <div className='flex mt-5'>
                                                    <div>
                                                        <div className='font-bold'>Is Redeemable :</div>
                                                    </div>
                                                    <div>
                                                        <input type="radio" className=' ml-2 h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300' checked={values.Redeemable == 'yes' ? true : false} value="yes" name='Redeemable' onChange={(e) => { handleChange(e) }} />
                                                        <label className='text-sm font-medium text-gray-900 ml-1'> YES</label>
                                                        <input type="radio" className=' ml-2 h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300' checked={values.Redeemable == 'no' ? true : false} value="no" name='Redeemable' onChange={(e) => { handleChange(e) }} />
                                                        <label className='text-sm font-medium text-gray-900 ml-1'> NO</label>
                                                    </div>
                                                    <div className='text-red-600 text-xs '>< ErrorMessage name='Redeemable' /></div>
                                                </div>
                                                <div className='flex mt-5'>
                                                    <div>
                                                        <div className='font-bold'>Count Free Cup :</div>
                                                    </div>
                                                    <div>
                                                        <input type="radio" className=' ml-2 h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300' checked={values.Count == 'yes' ? true : false} value="yes" name='Count' onChange={(e) => { handleChange(e) }} />
                                                        <label className='text-sm font-medium text-gray-900 ml-1'>YES</label>
                                                        <input type="radio" className=' ml-2 h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300' checked={values.Count == 'no' ? true : false} value="no" name='Count' onChange={(e) => { handleChange(e) }} />
                                                        <label className='text-sm font-medium text-gray-900 ml-1'>No</label>
                                                    </div>
                                                    <div className='text-red-600 text-xs '>< ErrorMessage name='Count' /></div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="flex justify-end pt-2">
                                            <button
                                                type='button' className="focus:outline-none modal-close px-4 bg-white p-3 rounded-lg text-black hover:bg-red-300" onClick={() => { setEditModal(false) }} >Cancel</button>
                                            <button
                                                type='submit' className="focus:outline-none px-4 bg-teal-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400">Confirm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default Producteditmodal