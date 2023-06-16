import React, { useState } from 'react'
import component from '../Component'
import { BiLogIn, BiKey, BiUser } from "react-icons/bi";
import { AiOutlineDashboard } from "react-icons/ai";
import { BsBag } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { FiBook } from "react-icons/fi";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';

const Sideandnav = (props) => {

    // const [isClicked, setIsClicked] = useState(false);

    const handleOnClick = () => {
        setMobileNavOpen(!mobileNavOpen);
    };

    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [openprofile, setOpenprofile] = useState(false);
    const [openproduct, setProduct] = useState(false);
    const [openuser, setUser] = useState(false);
    const [opencategory, setCategory] = useState(false);
    const [openorder, setOrder] = useState(false);
    const [activeLink, setActiveLink] = useState("");
    const navigate = useNavigate();
    const location = useLocation();


    const Logout = () => {
        localStorage.removeItem("token");
        toast.success("Logout successfully", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })
        navigate("/login");
    }

    const handleLinkClick = (link) => {
        setActiveLink(link); // Update active link state when a link is clicked
    };

    return (
        <>
            <div className='min-h-screen w-full bg-gray-100 text-black'>
                <div className='flex w-full items-center justify-between border-b-2 border-gray-200 text-red-50 bg-gray-900 p-2 sticky top-0'>
                    <div className='flex items-center space-x-2'>
                        <button
                            className="flex flex-col justify-around h-6 w-6 focus:outline-none"
                            onClick={handleOnClick}
                        >
                            <div
                                className={`w-full h-1 bg-white transition duration-500 ease-in-out transform ${mobileNavOpen ? 'rotate-45 translate-y-2' : ''
                                    }`}
                            />
                            <div
                                className={`w-full h-1 bg-white transition duration-500 ease-in-out transform ${mobileNavOpen ? 'opacity-0' : ''
                                    }`}
                            />
                            <div
                                className={`w-full h-1 bg-white transition duration-500 ease-in-out transform ${mobileNavOpen ? '-rotate-45 -translate-y-2' : ''
                                    }`}
                            />
                        </button>
                        {/* <div><img width={50} src={require("../images/logo.png")} alt="" /></div> */}
                    </div>
                    <div onClick={() => setOpenprofile(!openprofile)}>
                        <button className='flex items-center'>
                            <img className='mr-5' style={{ width: "30px" }} src={require("../images/logo.png")} alt="" />
                            {component.admin}
                            <div>
                                {
                                    openprofile === true ?
                                        <AiOutlineCaretUp /> :
                                        <AiOutlineCaretDown />
                                }
                            </div>
                        </button>
                    </div>
                    <div className='absolute right-2 mt-40 w-48 divide-y divide-gray-200 rounded-md border-gray-200 bg-white shadow-md'>
                        <div className={` ${openprofile ? "hideen" : "hidden"
                            }`}>
                            <div className='flex flex-col space-y-3 p-2 text-black'>
                                <div>
                                    <div className='transition hover:text-blue-600 flex items-center'>
                                        <BiKey />
                                        <div className='ml-2'>{component.Passwordchange}</div>
                                    </div>
                                </div>
                                {/* <Link to='/login'> */}
                                <div>
                                    <div className='transition hover:text-blue-600 flex items-center'>
                                        <BiLogIn />
                                        <div className='ml-2' onClick={Logout} >{component.logout}</div>
                                    </div>
                                </div>
                                {/* </Link> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex'>
                    <div className={` ${mobileNavOpen ? "open" : "hidden"
                        }`}>
                        <div className='flex w-72 h-full flex-col space-y-2 border-r-2 border-gray-200 bg-gray-900 text-white p-2'>
                            <div className='p-2'>MENU</div>
                            <Link to='/Dashboard' className={`text-white rounded-sm hover:bg-gray-700 ${activeLink === "link1" ? "bg-red-500" : ""}`} onClick={() => handleLinkClick("link1")} >
                                <div className='flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600 hover:scale-105  ease duration-300'>
                                    <div className='flex items-center'  >
                                        <AiOutlineDashboard />
                                        <div className='ml-2'>
                                            {component.Dashboard}

                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <div onClick={() => setUser(!openuser)}>
                                <div className='flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600 hover:scale-105  ease duration-300'>
                                    <div className='flex items-center'>
                                        <BiUser />
                                        <div className='ml-2 flex items-center'>
                                            {component.user}
                                            <div>
                                                <AiOutlineCaretDown />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={` ${openuser ? "hideen" : "hidden"
                                }`}>
                                <div className='flex flex-col'>
                                    <Link to='/alluser' className={`text-white rounded-sm hover:bg-gray-700 ${activeLink === "link2" ? "bg-red-500" : ""}`} onClick={() => handleLinkClick("link2")}>
                                        <div className='rounded-md text-white py-3 px-2 items-start space-x-1 hover:bg-gray-100 hover:text-blue-600 hover:scale-105  ease duration-300 '>
                                            <button className='ml-5'>{component.dashuser}</button>
                                        </div>
                                    </Link>
                                    <Link to='/adduser' className={`text-white rounded-sm hover:bg-gray-700 ${activeLink === "link3" ? "bg-red-500" : ""}`} onClick={() => handleLinkClick("link3")}>
                                        <div className='rounded-md text-white py-3 px-2 items-start space-x-1 hover:bg-gray-100 hover:text-blue-600 hover:scale-105  ease duration-300'>
                                            <button className='ml-5'>{component.dashAdduser}</button>
                                        </div>
                                    </Link>
                                    {/* <div className='rounded-md text-white py-3 px-2 items-start space-x-1 hover:bg-gray-100 hover:text-blue-600 '>
                                        <Link to='allproduct'>
                                            <button className='ml-5'>{component.dropAllpro}</button>
                                        </Link>
                                    </div> */}
                                </div>
                            </div>
                            <div onClick={() => setProduct(!openproduct)}>
                                <div className='flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600 hover:scale-105  ease duration-300'>
                                    <div className='flex items-center'>
                                        <BsBag />
                                        <div className='ml-2 flex items-center'>
                                            {component.product}
                                            <div>
                                                <AiOutlineCaretDown />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={` ${openproduct ? "hideen" : "hidden"
                                }`}>
                                <div className='flex flex-col'>
                                    <Link to='/addproduct' className={`text-white rounded-sm hover:bg-gray-700 ${activeLink === "link4" ? "bg-red-500" : ""}`} onClick={() => handleLinkClick("link4")}>
                                        <div className='rounded-md text-white py-3 px-2 items-start space-x-1 hover:bg-gray-100 hover:text-blue-600 hover:scale-105  ease duration-300'>
                                            <button className='ml-5'>{component.dropaddpro}</button>
                                        </div>
                                    </Link>
                                    <Link to='allproduct' className={`text-white rounded-sm hover:bg-gray-700 ${activeLink === "link5" ? "bg-red-500" : ""}`} onClick={() => handleLinkClick("link5")}>
                                        <div className='rounded-md text-white py-3 px-2 items-start space-x-1 hover:bg-gray-100 hover:text-blue-600 hover:scale-105  ease duration-300'>
                                            <button className='ml-5'>{component.dropAllpro}</button>
                                        </div>
                                    </Link>
                                    {/* <button>Programming</button>
                                    <button>Programming</button> */}
                                </div>
                            </div>
                            <div onClick={() => setCategory(!opencategory)}>
                                <div className='flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600 hover:scale-105  ease duration-300'>
                                    <div className='flex items-center'>
                                        <BiCategoryAlt />
                                        <div className='ml-2 flex items-center'>
                                            {component.category}
                                            <div>
                                                <AiOutlineCaretDown />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={` ${opencategory ? "hideen" : "hidden"
                                }`}>
                                <div className='flex flex-col'>
                                    <Link to="/category" className={`text-white rounded-sm hover:bg-gray-700 ${activeLink === "link6" ? "bg-red-500" : ""}`} onClick={() => handleLinkClick("link6")}>
                                        <div className='rounded-md text-white py-3 px-2 items-start space-x-1 hover:bg-gray-100 hover:text-blue-600 hover:scale-105  ease duration-300'>
                                            <button className='ml-5'>{component.dascategory}</button>
                                        </div>
                                    </Link>
                                    {/* <div className='rounded-md text-white py-3 px-2 items-start space-x-1 hover:bg-gray-100 hover:text-blue-600 '>
                                        <Link to='allproduct'>
                                            <button className='ml-5'>{component.dropAllpro}</button>
                                        </Link>
                                    </div> */}
                                </div>
                            </div>
                            <div onClick={() => setOrder(!openorder)}>
                                <div className='flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600 hover:scale-105  ease duration-300'>
                                    <div className='flex items-center'>
                                        <FiBook />
                                        <div className='ml-2 flex items-center'>
                                            {component.order}
                                            <div>
                                                <AiOutlineCaretDown />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={` ${openorder ? "hideen" : "hidden"
                                }`}>
                                <div className='flex flex-col'>
                                    <Link className={`text-white rounded-sm hover:bg-gray-700 ${activeLink === "link7" ? "bg-red-500" : ""}`} onClick={() => handleLinkClick("link7")}>
                                        <div className='rounded-md text-white py-3 px-2 items-start space-x-1 hover:bg-gray-100 hover:text-blue-600 hover:scale-105  ease duration-300'>
                                            <button className='ml-5'>{component.dashorder}</button>
                                        </div>
                                    </Link>
                                    <Link className={`text-white rounded-sm hover:bg-gray-700 ${activeLink === "link8" ? "bg-red-500" : ""}`} onClick={() => handleLinkClick("link8")}>
                                        <div className='rounded-md text-white py-3 px-2 items-start space-x-1 hover:bg-gray-100 hover:text-blue-600 hover:scale-105  ease duration-300'>
                                            <button className='ml-5'>{component.dashpikuporder}</button>
                                        </div>
                                    </Link>
                                    <Link className={`text-white rounded-sm hover:bg-gray-700 ${activeLink === "link9" ? "bg-red-500" : ""}`} onClick={() => handleLinkClick("link9")}>
                                        <div className='rounded-md text-white py-3 px-2 items-start space-x-1 hover:bg-gray-100 hover:text-blue-600 hover:scale-105  ease duration-300'>
                                            <button className='ml-5'>{component.dashdelivery}</button>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <Link className={`text-white rounded-sm hover:bg-gray-700 ${activeLink === "link10" ? "bg-red-500" : ""}`} onClick={() => handleLinkClick("link10")}>
                                <div className='flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600 hover:scale-105  ease duration-300'>
                                    <div className='flex items-center'>
                                        <MdOutlineNotificationsNone />
                                        <div className='ml-2'>{component.noti}</div>
                                    </div>
                                </div>
                            </Link>
                            <Link to='/'>
                                <div className='flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600 hover:scale-105  ease duration-300'>
                                    <div className='flex items-center'>
                                        <BiLogIn />
                                        <div className='ml-2'>{component.logout}</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className='w-full p-1 overflow-hidden overflow-y-scroll'>
                        {props.children}
                    </div>
                </div>
            </div >
        </>
    )
}

export default Sideandnav