import React, { useEffect } from 'react'
import { useState } from 'react';

const Subcategoryeditmodal = (props) => {
    const { show, setSubctyeditModal, Categoryid, allcategory, setCategoryvalue, categoryvalue, updatesubcategory, maincategoryid } = props;

    return (
        <div className={show ? "" : "hidden"}>
            <div className="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster backdrop-brightness-90">
                <div
                    className=" shadow-lg modal-container bg-white w-11/12 md:w-[500px] mx-auto rounded z-50 overflow-y-auto">
                    <div className="modal-content py-4 text-left px-6">
                        <div className="flex justify-between items-center pb-3">
                            <div className="text-2xl font-bold">EDIT CATEGORY</div>
                            <div className="modal-close cursor-pointer z-50" onClick={() => { setSubctyeditModal(false) }}>
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
                                <select onChange={(cty) => { Categoryid(cty); }} value={maincategoryid} className=' border border-none focus:outline-blue-400 bg-blue-50 rounded-md w-full py-2 pl-2 shadow-md'>
                                    <option label="select" disabled>select</option>
                                    {
                                        allcategory?.map((e, index) => {
                                            return (
                                                <>
                                                    <option className='' key={index} value={e.id}>{e.category}</option>
                                                </>
                                            )
                                        })
                                    }
                                </select>
                                <div><input className='border rounded-md py-2 px-2' type="text" placeholder='LastName' name='LastName' id='LastName' value={categoryvalue} onChange={(e) => setCategoryvalue(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end pt-2">
                            <button
                                className="focus:outline-none modal-close px-4 bg-white p-3 rounded-lg text-black hover:bg-red-300" onClick={() => { setSubctyeditModal(false) }} >Cancel</button>
                            <button
                                className="focus:outline-none px-4 bg-teal-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400" onClick={() => { updatesubcategory() }}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subcategoryeditmodal