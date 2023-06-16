import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';

const Editmodal = (props) => {
    const imageInputRef = React.useRef();
    const { show, setEditModal, defaultValues, validationSchema, submit } = props;

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
                                                <div><input className='border rounded-md py-2 px-2' value={values.FirstName} type="text" placeholder='FristName' name='FirstName' id='FirstName' onChange={(e) => {
                                                    handleChange(e);
                                                }} />
                                                    <div className='text-red-600 '>< ErrorMessage name='FirstName' /></div>
                                                </div>
                                                <div><input className='border rounded-md py-2 px-2' value={values.LastName} type="text" placeholder='LastName' name='LastName' id='LastName' onChange={(e) => {
                                                    handleChange(e);

                                                }} />
                                                    <div className='text-red-600 '>< ErrorMessage name='LastName' /></div>
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-2 gap-5 justify-items-center mt-5'>
                                                <div><input className='border rounded-md py-2 px-2' value={values.email} type="text" placeholder='Email' name='email' id='email' onChange={(e) => {
                                                    handleChange(e);

                                                }} />
                                                    <div className='text-red-600 '>< ErrorMessage name='email' /></div>
                                                </div>
                                                <div><input className='border rounded-md py-2 px-2' value={values.ContactNumber} type="text" placeholder='Phone' name='ContactNumber' id='ContactNumber' onChange={(e) => {
                                                    handleChange(e);

                                                }} />
                                                    <div className='text-red-600 '>< ErrorMessage name='ContactNumber' /></div>
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-2 gap-5 justify-items-center mt-5'>
                                                <div><input className='border rounded-md py-2 px-2' type="text" value={values.city} placeholder='City' name='city' id='city' onChange={(e) => {
                                                    handleChange(e);

                                                }} />
                                                    <div className='text-red-600 '>< ErrorMessage name='city' /></div>
                                                </div>
                                                <div><input className='border rounded-md py-2 px-2' type="text" value={values.state} placeholder='State' name='state' id='state' onChange={(e) => {
                                                    handleChange(e);

                                                }} />
                                                    <div className='text-red-600 '>< ErrorMessage name='state' /></div>
                                                </div>
                                            </div>
                                            <div className=' justify-center mt-5'>
                                                <div><input className='border rounded-md py-2 px-2 w-full' value={values.postcode} type="number" placeholder='Postcode' name='postcode' id='postcode' onChange={(e) => {
                                                    handleChange(e);

                                                }} />
                                                    <div className='text-red-600 '>< ErrorMessage name='postcode' /></div>
                                                </div>

                                            </div>
                                            <div className=' justify-center mt-5'>
                                                <div>
                                                    <input className='border border-none focus:outline-blue-400 bg-blue-50 rounded-md  w-full ' type="file" name='image' id="image" ref={imageInputRef} onChange={(event) => {
                                                        setFieldValue("file", event.currentTarget.files[0]);
                                                    }} />
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

export default Editmodal