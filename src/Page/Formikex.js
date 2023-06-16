import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import CategoryTable from '../components/CategoryTabel/CategoryTable';
import SubcategoryTable from '../components/Subcategory/SubcategoryTable';

const Category = () => {

    const [category, setCategory] = useState([]);
    const [SubCategory, setSubcategory] = useState({});
    const [categoryid, setCategoryid] = useState([]);
    const [allcategory, setAllcategory] = useState();
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [formErrorssub, setFormErrorssub] = useState({});
    const [allsubcty, setAllsubcty] = useState();
    const [submit, setSubmit] = useState(false);
    const [editmodal, setEditModal] = useState(false);
    const [deletmodal, setDeletModal] = useState(false);
    const [subctyeditmodal, setSubeditModal] = useState(false);
    const [subctydeletmodal, setSubctydeletModal] = useState(false);
    const [delcategoryid, setDelcategoryid] = useState();
    const [deletesubcty, setDeletesubcty] = useState();
    const [categoryvalue, setCategoryvalue] = useState();
    const [updateid, setUpdateid] = useState();
    const [subctyupdateid, setSubctyupdateid] = useState();
    const [subctyvalue, setSubctyvalue] = useState();
    // console.log(categoryid)

    const theaddata1 = [
        {
            name: "ID"
        },
        {
            name: "CATEGORY"
        },
        {
            name: "ACTION"
        }
    ]

    const theaddata2 = [
        {
            name: "ID"
        },
        {
            name: "CATEGORY_ID"
        },
        {
            name: "SUBCATEGORY"
        },
        {
            name: "ACTION"
        }
    ]

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        // console.log(value)
        setCategory({ ...category, [name]: value })
        setSubcategory({ ...SubCategory, [name]: value })
        if (isSubmit) {
            setFormErrors(validate({ ...category, [name]: value }));
        }
        if (submit) {
            setFormErrorssub(validate2({ ...SubCategory, [name]: value }));
        }
    }

    const validate = (value) => {
        const errors = {};
        if (!value?.category) {
            errors.category = "Category is required"
        } else if (!value?.category.match(/^[A-Za-z]+$/)) {
            errors.category = "please add valid Category"
        }
        return errors;
    }

    const validate2 = (value) => {
        const errors = {};

        if (!value?.SubCategory) {
            errors.SubCategory = "SubCategory is required"
        } else if (!value?.SubCategory.match(/^[A-Za-z]+$/)) {
            errors.SubCategory = "please add valid SubCategory"
        }
        return errors;
    }

    const handelsubmit = async () => {
        setFormErrors(validate(category));
        setIsSubmit(true);
        const errors = validate(category);

        if (Object.keys(errors).length === 0) {
            await axios.post('http://localhost:8000/addcategory', category).then(resp => {
                console.log("addcategory::::", resp.data.data.id)
                setCategory("");
                toast.success(resp.data.message, {
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                getallcategory();
                // setCategoryid(resp.data.data.id)
            }).catch(err => {
                const error = err.response?.data.message;
                // console.log("err", err);
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
    }

    const handelclick = async () => {
        setFormErrorssub(validate2(SubCategory));
        setSubmit(true);
        const errors = validate2(SubCategory);

        if (Object.keys(errors).length === 0) {
            await axios.post('http://localhost:8000/addsubcategory', { category: SubCategory.SubCategory, category_id: categoryid }).then(resp => {
                console.log("addcategory::::", resp)
                toast.success(resp.data.message, {
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                Allsubcategory();
            }).catch(err => {
                const error = err.response?.data.message;
                // console.log("err", err);
                toast.error(error, {
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })``
            })
        }
    }

    const getallcategory = async () => {
        await axios.get(`http://localhost:8000/allcategory`).then(resp => {
            setAllcategory(resp.data);
        }).catch(err => {
            console.log(err)
        })
    }

    const Allsubcategory = async () => {
        await axios.get(`http://localhost:8000/maincategory`).then(resp => {
            // console.log("allsubcategory::", resp)
            setAllsubcty(resp.data.data)
            getallcategory()
        }).catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        getallcategory();
        Allsubcategory();
    }, [])

    const Deletecategory = async () => {
        await axios.delete(`http://localhost:8000/Deletecategory/${delcategoryid}`).then(resp => {
            // console.log("deletecategory::", resp)
            setDeletModal(false)
            getallcategory();
            Allsubcategory();
        }).catch((err) => {
            console.log(err)
        })
    }

    const Deletesubcategory = async () => {
        await axios.delete(`http://localhost:8000/deletesubcategory/${deletesubcty}`).then(resp => {
            // console.log("deletecategory::", resp)
            setSubctydeletModal(false)
            getallcategory();
            Allsubcategory();
        }).catch((err) => {
            console.log(err)
        })
    }

    const allsubcategory = async (cty) => {
        setCategoryid(cty.target.value)
    }


    const singelcategory = async (id) => {
        await axios.get(`http://localhost:8000/singelcategory/${id}`).then(resp => {
            // console.log("singelcategory::", resp.data.singelcategory);
            setCategoryvalue(resp.data.singelcategory.category)
        }).catch((err) => {
            console.log(err)
        })
    }

    const singelsubcategory = async (id) => {
        await axios.get(`http://localhost:8000/singelsubcategory/${id}`).then(resp => {
            // console.log("singelsubcategory::", resp.data.subcategory.category);
            setSubctyvalue(resp.data.subcategory.category)
        }).catch((err) => {
            console.log(err)
        })
    }

    const updatecategory = async () => {
        await axios.put(`http://localhost:8000/updatecategory/${updateid}`, { category: categoryvalue }).then(resp => {
            // console.log("updatecategory::", resp);
            setEditModal(false)
            getallcategory();
            Allsubcategory();
        }).catch((err) => {
            console.log(err)
        })
    }

    const updatesubcategory = async () => {
        await axios.put(`http://localhost:8000/updatesubcategory/${subctyupdateid}`, { category: subctyvalue, category_id: categoryid }).then(resp => {
            // console.log("updatecategory::", resp);
            setSubeditModal(false)
            getallcategory();
            Allsubcategory();
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            <div className='bg-gray-200 h-screen'>
                <div>
                    <div className='p-5 flex justify-between'>
                        <div className='font-bold text-lg'>ADD CATEGORY</div>
                        <div>Dashboard / Add Category</div>
                    </div>
                </div>
                <div className='p-5'>
                    <div className='bg-white w-full rounded-sm p-5'>
                        <div className='font-bold mb-5'>Add Category</div>
                        <div>
                            <div>Category name</div>
                            <div className='mt-2'>
                                <input className=' border border-none focus:outline-blue-400 bg-blue-50 rounded-md w-full py-2 pl-2 shadow-md' type="text" placeholder='Category' name='category' onChange={handleInputChange} />
                                <div className='text-red-600 font-bold'>{formErrors.category}</div>
                            </div>
                            <div className='flex justify-center mt-10'>
                                <div><button className='border rounded-md py-2 px-5 font-bold text-white bg-blue-700 hover:scale-105  ease duration-300' onClick={handelsubmit} >ADD CATEGORY</button></div>
                            </div>
                        </div>
                        <div className='mt-10'>
                            <div>Add Sub Category</div>
                            <select onChange={(cty) => { allsubcategory(cty) }} className='border border-none focus:outline-blue-400 bg-blue-50 rounded-md w-full py-2 pl-2 shadow-md'>
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
                            <div className='mt-2'>
                                <input className='border border-none focus:outline-blue-400 bg-blue-50 rounded-md w-full py-2 pl-2 shadow-md' type="text" name='SubCategory' placeholder='Sub Category' onChange={handleInputChange} />
                                <div className='text-red-600 font-bold'>{formErrorssub.SubCategory}</div>
                            </div>
                            <div className='flex justify-center mt-10'>
                                <div><button className='border rounded-md py-2 px-5 font-bold text-white bg-blue-700 hover:scale-105  ease duration-300' onClick={handelclick} >ADD SUB CATEGORY</button></div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <CategoryTable theaddata1={theaddata1} allcategory={allcategory} editmodal={editmodal} setEditModal={setEditModal} setDeletModal={setDeletModal} deletmodal={deletmodal} setDelcategoryid={setDelcategoryid} singelcategory={singelcategory} setUpdateid={setUpdateid} />
                                <div className={` ${editmodal ? "hideen" : "hidden"}`}>
                                    <div className="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster backdrop-brightness-90">
                                        <div
                                            className=" shadow-lg modal-container bg-white w-11/12 md:w-[500px] mx-auto rounded z-50 overflow-y-auto">
                                            <div className="modal-content py-4 text-left px-6">
                                                <div className="flex justify-between items-center pb-3">
                                                    <div className="text-2xl font-bold">EDIT CATEGORY</div>
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
                                                    <div className='grid grid-cols-1 justify-items-center gap-5'>
                                                        <div><input className='border rounded-md py-2 px-2' type="text" placeholder='Category' name='FirstName' id='FirstName' value={categoryvalue} onChange={(e) => setCategoryvalue(e.target.value)} />
                                                        </div>
                                                        {/* <div><input className='border rounded-md py-2 px-2' type="text" placeholder='LastName' name='LastName' id='LastName' />
                                                        </div> */}
                                                    </div>
                                                </div>
                                                <div className="flex justify-end pt-2">
                                                    <button
                                                        className="focus:outline-none modal-close px-4 bg-white p-3 rounded-lg text-black hover:bg-red-300" onClick={() => { setEditModal(false) }} >Cancel</button>
                                                    <button
                                                        className="focus:outline-none px-4 bg-teal-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400" onClick={() => { updatecategory() }}>Confirm</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={` ${deletmodal ? "hideen" : "hidden"
                                    }`}>
                                    <div className="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster backdrop-brightness-90">
                                        <div
                                            className=" shadow-lg modal-container bg-white w-11/12 md:max-w-md mx-auto rounded z-50 overflow-y-auto">
                                            <div className="modal-content py-4 text-left px-6">
                                                <div className="flex justify-between items-center pb-3">
                                                    <div className="text-2xl font-bold text-red-600">DELETE !</div>
                                                    <div className="modal-close cursor-pointer z-50" onClick={() => { setDeletModal(false); }}>
                                                        <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                            viewBox="0 0 18 18">
                                                            <path
                                                                d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z">
                                                            </path>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="my-5 font-bold">
                                                    ARE YOU SURE YOU WANT TO DELETE.?
                                                </div>
                                                <div className="flex justify-end pt-2">
                                                    <button
                                                        className="focus:outline-none modal-close px-4 bg-white p-3 rounded-lg text-black hover:bg-red-300" onClick={() => { setDeletModal(false) }} >Cancel</button>
                                                    <button
                                                        className="focus:outline-none px-4 bg-teal-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400" onClick={() => { Deletecategory() }}>Confirm</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <SubcategoryTable theaddata2={theaddata2} allcategory={allcategory} allsubcty={allsubcty} subctyeditmodal={subctyeditmodal} setSubeditModal={setSubeditModal} subctydeletmodal={subctydeletmodal} setSubctydeletModal={setSubctydeletModal} singelsubcategory={singelsubcategory} setSubctyupdateid={setSubctyupdateid} setDeletesubcty={setDeletesubcty} />
                                <div className={` ${subctyeditmodal ? "hideen" : "hidden"}`}>
                                    <div className="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster backdrop-brightness-90">
                                        <div
                                            className=" shadow-lg modal-container bg-white w-11/12 md:w-[500px] mx-auto rounded z-50 overflow-y-auto">
                                            <div className="modal-content py-4 text-left px-6">
                                                <div className="flex justify-between items-center pb-3">
                                                    <div className="text-2xl font-bold">EDIT CATEGORY</div>
                                                    <div className="modal-close cursor-pointer z-50" onClick={() => { setSubeditModal(false) }}>
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
                                                        <select onChange={(cty) => { allsubcategory(cty) }} className=' border border-none focus:outline-blue-400 bg-blue-50 rounded-md w-full py-2 pl-2 shadow-md'>
                                                            <option label="select" selected disabled>select</option>
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
                                                        <div><input className='border rounded-md py-2 px-2' type="text" placeholder='LastName' name='LastName' id='LastName' value={subctyvalue} onChange={(e) => setSubctyvalue(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-end pt-2">
                                                    <button
                                                        className="focus:outline-none modal-close px-4 bg-white p-3 rounded-lg text-black hover:bg-red-300" onClick={() => { setSubeditModal(false) }} >Cancel</button>
                                                    <button
                                                        className="focus:outline-none px-4 bg-teal-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400" onClick={() => { updatesubcategory() }}>Confirm</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={` ${subctydeletmodal ? "hideen" : "hidden"
                                    }`}>
                                    <div className="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster backdrop-brightness-90">
                                        <div
                                            className=" shadow-lg modal-container bg-white w-11/12 md:max-w-md mx-auto rounded z-50 overflow-y-auto">
                                            <div className="modal-content py-4 text-left px-6">
                                                <div className="flex justify-between items-center pb-3">
                                                    <div className="text-2xl font-bold text-red-600">DELETE !</div>
                                                    <div className="modal-close cursor-pointer z-50" onClick={() => { setSubctydeletModal(false); }}>
                                                        <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                            viewBox="0 0 18 18">
                                                            <path
                                                                d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z">
                                                            </path>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="my-5 font-bold">
                                                    ARE YOU SURE YOU WANT TO DELETE.?
                                                </div>
                                                <div className="flex justify-end pt-2">
                                                    <button
                                                        className="focus:outline-none modal-close px-4 bg-white p-3 rounded-lg text-black hover:bg-red-300" onClick={() => { setSubctydeletModal(false) }} >Cancel</button>
                                                    <button
                                                        className="focus:outline-none px-4 bg-teal-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400" onClick={() => { Deletesubcategory() }}>Confirm</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Category
    < tr key = { item.key } className = { 'accordion-toggle'} >
    {
        theaddata.map((el, index) => {
            return (
                <td
                    key={index}
                    className="p-2 whitespace-nowrap border-2"
                >
                    {item.render
                        ? item.render(item[el.key], { ...item, index }, el)
                        : el.render
                            ? el.render(item[el.key], {
                                ...item,
                                index
                            })
                            : item[el.key]}
                </td>
            );
        })
    }
            </tr >