import React from 'react'
import Thead from './Thead';
import Tbody from './Tbody';

export default function UserTable(props) {
    const { theaddata, tbodydata, editUser, setEditModal, editmodal, singeluser, setUserid, validationSchema, defaultValues, imageInputRef, setDeletModal, deletmodal, setDeleteuserid, deleteUser } = props;
    // console.log("first", tbodydata)
    return (
        <>
            <table className='table-auto w-full border mt-10'>
                <thead>
                    <tr>
                        <Thead theaddata={theaddata} />
                    </tr>
                </thead>
                <tbody className='text-sm divide-y divide-gray-100 text-center'>
                    {tbodydata && tbodydata.length > 0 && tbodydata.map((item) => {
                        return (
                            <Tbody theaddata={theaddata} item={item} tbodydata={tbodydata} editUser={editUser} setEditModal={setEditModal} editmodal={editmodal} singeluser={singeluser} setUserid={setUserid} validationSchema={validationSchema} defaultValues={defaultValues} imageInputRef={imageInputRef} setDeletModal={setDeletModal} deletmodal={deletmodal} setDeleteuserid={setDeleteuserid} deleteUser={deleteUser} />
                        )
                    })
                    }
                </tbody>
            </table>
        </>
    )
}
