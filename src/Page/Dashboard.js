import React from 'react'
import component from '../Component';
import Component from '../Component';

const Dashboard = () => {
    return (
        <>
            <div className='bg-gray-200 h-screen'>
                <div>
                    <div className='flex justify-between p-5'>
                        <div className='text-lg font-bold mt-5'>{Component.Dash}</div>
                        <div className='mt-5'>{Component.welcomedash}</div>
                    </div>
                    <div>
                        <div className='grid grid-cols-4 gap-10 p-10'>
                            <div className='bg-white p-4  rounded-md border-2 hover:border-blue-900 hover:scale-105  ease duration-300'>
                                <div className='flex justify-between'>
                                    <div>
                                        <div className='mb-5 font-mono font-bold text-sm'>
                                            {Component.totalcomorder}
                                        </div>
                                        <div className='text-5xl font-bold'>{Component.completedorder}</div>
                                    </div>
                                    <div className='bg-gray-900 rounded-full h-20 w-20 m-1 flex justify-center items-center border-4 hover:border-indigo-800 hover:scale-105  ease duration-300'>
                                        <div>
                                            <img className='' width={50} src={require('../images/completorder.png')} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white p-4  rounded-md border-2 hover:border-blue-900 hover:scale-105  ease duration-300'>
                                <div className='flex justify-between'>
                                    <div>
                                        <div className='mb-5 font-mono font-bold text-sm'>
                                            {component.todayorder}
                                        </div>
                                        <div className='text-5xl font-bold'>{component.todaysorder}</div>
                                    </div>
                                    <div className='bg-gray-900 rounded-full h-20 w-20 m-1 flex justify-center items-center border-4 hover:border-indigo-800 hover:scale-105  ease duration-300'>
                                        <div>
                                            <img width={50} src={require('../images/todayorder.png')} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white p-4  rounded-md border-2 hover:border-blue-900 hover:scale-105  ease duration-300'>
                                <div className='flex justify-between'>
                                    <div>
                                        <div className='mb-5 font-mono font-bold text-sm'>
                                            {component.users}
                                        </div>
                                        <div className='text-5xl font-bold'>{component.totaluser}</div>
                                    </div>
                                    <div className='bg-gray-900 rounded-full h-20 w-20 m-1 flex justify-center items-center border-4 hover:border-indigo-800 hover:scale-105  ease duration-300'>
                                        <div>
                                            <img width={50} src={require('../images/users.png')} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white p-4  rounded-md border-2 hover:border-blue-900 hover:scale-105  ease duration-300'>
                                <div className='flex justify-between'>
                                    <div>
                                        <div className='mb-5 font-mono font-bold text-sm'>
                                            {component.dascategory}
                                        </div>
                                        <div className='text-5xl font-bold'>{component.totalcty}</div>
                                    </div>
                                    <div className='bg-gray-900 rounded-full h-20 w-20 m-1 flex justify-center items-center border-4 hover:border-indigo-800 hover:scale-105  ease duration-300'>
                                        <div>
                                            <img width={50} src={require('../images/category.png')} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white p-4  rounded-md border-2 hover:border-blue-900 hover:scale-105  ease duration-300'>
                                <div className='flex justify-between'>
                                    <div>
                                        <div className='mb-5 font-mono font-bold text-sm'>
                                            {component.dasproduct}
                                        </div>
                                        <div className='text-5xl font-bold'>{component.dastotalproduct}</div>
                                    </div>
                                    <div className='bg-gray-900 rounded-full h-20 w-20 m-1 flex justify-center items-center border-4 hover:border-indigo-800 hover:scale-105  ease duration-300'>
                                        <div>
                                            <img width={50} src={require('../images/product.png')} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard