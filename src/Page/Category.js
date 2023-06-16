import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Deletemodal from '../Model/Deletemodal';
import UserTable from '../components/UserTable/UserTable';
import { BiEdit } from 'react-icons/bi';
import { MdOutlineDelete } from 'react-icons/md';
import Categoryeditmodel from '../Model/Categoryeditmodal';
import Subcategoryeditmodal from '../Model/Subcategoryeditmodal';
import Paginations from '../components/Paginations/Paginations';
import { allcategoryget, allcty, allsubcategoryget, categoryadd, categorydelete, ctyupdate, singelcty, singelsubcty, subcategoryadd, subctyupdate } from '../http/api';
import axios from 'axios';

const Category = () => {
    //form valideti..
    const [category, setCategory] = useState([]);
    const [SubCategory, setSubcategory] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [formErrorssub, setFormErrorssub] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [submit, setSubmit] = useState(false);
    //model
    const [ctyeditmodal, setCtyeditModal] = useState(false);
    const [subctyeditmodal, setSubctyeditModal] = useState(false);
    const [deletmodal, setDeletModal] = useState(false);
    //category
    const [categoryid, setCategoryid] = useState([]);
    const [maincategoryid, setMiancategotyid] = useState();
    const [deletesubcty, setDeletesubcty] = useState();
    const [selectedItem, SetSelectedItem] = useState('');
    const [allcategory, setAllcategory] = useState();
    const [subcty, setSubcty] = useState();
    const [allsubcty, setAllsubcty] = useState();
    const [categoryvalue, setCategoryvalue] = useState();
    //paginations
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [datalength, setDatalength] = useState();
    const [subctypage, setSubctypage] = useState(1);
    const [subctysize, setSubctysize] = useState(5);
    const [subdatalength, setSubdatalength] = useState();
    // console.log(datalength)


    const categoryheaddata = [
        {
            name: "ID",
            key: 'id'
        },
        {
            name: "CATEGORY",
            key: 'category'
        },
        {
            name: "ACTION",
            key: 'action',
            render: (item, record) => {
                // console.log("teswtsdsd", record)
                return (
                    <>
                        <div className='flex justify-center'>
                            <div onClick={() => { setCtyeditModal(true) }}>
                                <button className='border rounded-md px-2 py-2 bg-green-400 hover:bg-green-700 hover:scale-105  ease duration-300' onClick={() => { fetchsingleData(record.id); SetSelectedItem(record.id); }}><BiEdit /></button>
                            </div>
                            <div onClick={() => { setDeletModal(true) }}>
                                <button className='border rounded-md px-2 py-2 bg-red-400 hover:bg-red-700 hover:scale-105  ease duration-300' onClick={() => { SetSelectedItem(record.id) }}><MdOutlineDelete /></button>
                            </div>
                        </div>
                    </>
                )
            }
        }
    ]

    const subcategoryheaddata = [
        {
            name: "ID",
            key: "id"
        },
        {
            name: "CATEGORY_ID",
            key: "category_detail",
            render: (item, record) => {
                //    console.log("record",record,item)
                return (<p>{record?.category_detail?.category}</p>)
            }


        },
        {
            name: "SUBCATEGORY",
            key: "category"
        },
        {
            name: "ACTION",
            render: (item, record) => {
                return (
                    <>
                        <div className='flex justify-center'>
                            <div onClick={() => { setSubctyeditModal(true) }}>
                                <button className='border rounded-md px-2 py-2 bg-green-400 hover:bg-green-700 hover:scale-105  ease duration-300' onClick={() => { singelsubcategory(record.id); SetSelectedItem(record.id) }}  ><BiEdit /></button>
                            </div>
                            <div onClick={() => { setDeletModal(true) }}>
                                <button className='border rounded-md px-2 py-2 bg-red-400 hover:bg-red-700 hover:scale-105  ease duration-300' onClick={() => { setDeletesubcty(record.id) }}><MdOutlineDelete /></button>
                            </div>
                        </div>
                    </>
                )
            }
        }
    ]

    const getctydata = (event, page) => {
        setPage(page);
        setSize(size);
    }
    const getsubctydata = (event, page) => {
        setSubctypage(page);
        setSubctysize(subctysize)
    }

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
        } else if (!value?.category.match(/^[a-zA-Z0-9\s&+_,.-]+$/)) {
            errors.category = "please add valid Category"
        }
        return errors;
    }

    const validate2 = (value) => {
        const errors = {};

        if (!value?.SubCategory) {
            errors.SubCategory = "SubCategory is required"
        } else if (!value?.SubCategory.match(/^[a-zA-Z0-9\s&+_,.-]+$/)) {
            errors.SubCategory = "please add valid SubCategory"
        }
        return errors;
    }

    //category
    const handelsubmit = async () => {
        setFormErrors(validate(category));
        setIsSubmit(true);
        const errors = validate(category);

        if (Object.keys(errors).length === 0) {
            // await categoryadd(category)
            axios.post("http://localhost:8000/addcategory", category).then(resp => {
                console.log("addcategory::::", resp.data.data.id)
                // setCategory("");
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
            }).catch(err => {
                // console.log("error", err.response?.data.message)
                const error = err.response?.data.message;
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

    const getallcategory = async () => {
        await allcategoryget(page, size).then(resp => {
            // console.log("getallcategory", resp)
            setAllcategory(resp.data.data);
            setDatalength(resp.data.datalength)
        }).catch(err => {
            console.log(err)
        })
    }

    const categoryall = async () => {
        await allcty().then(resp => {
            // console.log("cty::::::", resp.data.data);
            setSubcty(resp.data.data);
        }).catch(err => {
            console.log(err)
        })
    }

    const fetchsingleData = async (id) => {
        await singelcty(id).then(resp => {
            console.log("first", resp.data.singelcategory.category)
            setCategoryvalue(resp.data.singelcategory.category)
        }).catch((err) => {
            console.log(err)
        })


        const getallcategory = async () => {
            await allcty().then(resp => {
                // console.log("cty::::::", resp.data.data);
                setAllcategory(resp.data.data);
            }).catch(err => {
                console.log(err)
            })
        }
        getallcategory()
    }

    const updatecategory = async () => {
        console.log({ category: categoryvalue })
        await ctyupdate(selectedItem, { category: categoryvalue }).then(resp => {
            toast.success(resp.data.message, {
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            setCtyeditModal(false)
            getallcategory();
            Allsubcategory();
        }).catch((err) => {
            console.log(err)
        })
    }

    //subcategory
    const handelclick = async () => {
        setFormErrorssub(validate2(SubCategory));
        setSubmit(true);
        const errors = validate2(SubCategory);
        console.log("first", SubCategory.SubCategory, categoryid)
        if (Object.keys(errors).length === 0) {
            // await subcategoryadd({ category: SubCategory.SubCategory, category_id: categoryid })
            axios.post("http://localhost:8000/addsubcategory", { category: SubCategory.SubCategory, category_id: categoryid }).then(resp => {
                console.log("addcategory::::", resp)
                // setSubcategory("")
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

    const Allsubcategory = async () => {
        await allsubcategoryget(subctypage, subctysize).then(resp => {
            console.log("allsubcategory::", resp)
            setAllsubcty(resp.data.data)
            setSubdatalength(resp.data.datalength)
            getallcategory()
        }).catch(err => {
            console.log(err)
        })
    }

    const singelsubcategory = async (id) => {
        await singelsubcty(id).then(resp => {
            // console.log("singelsubcategory::", resp.data.subcategory.category_detail.id);
            setCategoryvalue(resp.data.subcategory.category);
            setMiancategotyid(resp.data.subcategory.category_detail.id)
        }).catch((err) => {
            console.log(err)
        })
    }

    const updatesubcategory = async () => {
        const ID = categoryid == categoryid ? maincategoryid : ""
        // console.log("first", categoryvalue, ID)
        // await subctyupdate(selectedItem, { category: categoryvalue, category_id: ID })
        axios.put(`http://localhost:8000/updatesubcategory/${selectedItem}`, { category: categoryvalue, category_id: ID }).then(resp => {
            toast.success(resp.data.message, {
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            setSubctyeditModal(false)
            getallcategory();
            Allsubcategory();
        }).catch((err) => {
            console.log(err)
        })
    }

    //cty and subcty delete
    const Deletecategory = async () => {
        const DELETE_API = selectedItem ? 'Deletecategory' : 'deletesubcategory';
        const ID = selectedItem ? selectedItem : deletesubcty;
        // axios.delete(`http://localhost:8000/${DELETE_API}/${ID}`)
        await categorydelete(DELETE_API, ID).then(resp => {
            // console.log("deletecategory::", resp)
            toast.success(resp.data.message, {
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            setDeletModal(false)
            getallcategory();
            Allsubcategory();
        }).catch((err) => {
            console.log(err)
        })
    }

    //fetchid
    const Categoryid = async (cty) => {
        setCategoryid(cty.target.value);
        setMiancategotyid(cty.target.value)
        console.log("first----", cty.target.value);
    }

    useEffect(() => {
        getallcategory(page, size);
    }, [page, size])
    useEffect(() => {
        Allsubcategory(subctypage, subctysize);
    }, [subctypage, subctysize])
    useEffect(() => {
        categoryall()
    }, [])

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
                            <select onChange={(cty) => { Categoryid(cty) }} className='border border-none focus:outline-blue-400 bg-blue-50 rounded-md w-full py-2 pl-2 shadow-md'>
                                <option label="select" selected disabled>select</option>
                                {
                                    subcty?.map((e, index) => {
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
                            <UserTable
                                theaddata={categoryheaddata}
                                tbodydata={allcategory}
                            />
                            <Paginations
                                data={getctydata}
                                size={size}
                                datalength={datalength}
                            />
                            <Categoryeditmodel
                                show={ctyeditmodal}
                                setCtyeditModal={setCtyeditModal}
                                categoryvalue={categoryvalue}
                                setCategoryvalue={setCategoryvalue}
                                updatecategory={updatecategory}
                            />
                            <UserTable
                                theaddata={subcategoryheaddata}
                                tbodydata={allsubcty}
                            />
                            <Paginations
                                data={getsubctydata}
                                size={subctysize}
                                datalength={subdatalength}
                            />
                            <Subcategoryeditmodal
                                show={subctyeditmodal}
                                setSubctyeditModal={setSubctyeditModal}
                                Categoryid={Categoryid}
                                allcategory={allcategory}
                                setCategoryvalue={setCategoryvalue}
                                categoryvalue={categoryvalue}
                                updatesubcategory={updatesubcategory}
                                maincategoryid={maincategoryid}
                            />
                            <Deletemodal
                                show={deletmodal}
                                setDeletModal={setDeletModal}
                                Deletecategory={Deletecategory}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Category