import React from 'react';

const Tbody = (props) => {
    const { theaddata, item, tbodydata, setEditModal, editmodal, singeluser, setUserid, setDeletModal, deletmodal, setDeleteuserid } = props
    // console.log("datatatataa", item)

    // const headArray = () => {
    //     let array = theaddata ? theaddata.filter((el) => Object.keys(item).includes(el.key)) : [];
    //     return array;

    // };

    return (
        <>
            <tr key={item.key} className={'accordion-toggle'}>
                {theaddata.map((el, index) => {
                    return (
                        <td
                            key={index}
                            className="p-2 whitespace-nowrap border-2"
                        >
                            {el.render
                                ? el.render(item[el.key], {
                                    ...item,
                                    index
                                })
                                : item[el.key]}
                        </td>
                    );
                })}
            </tr>



            {/* <tr key={index}>
                            <td className='p-2 whitespace-nowrap border-2'>
                                <div className='text-center'>{e.id}</div>
                            </td>
                           
                        </tr> */}


        </>
    )
}

export default Tbody