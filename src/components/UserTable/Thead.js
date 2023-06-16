import React from 'react'

const Thead = (props) => {
    const { theaddata } = props;
    // console.log("theaddata", theaddata)
    return (
        <>
            {
                theaddata && theaddata.length > 0 && theaddata.map((item, key) => {
                    return (
                        <>
                            <th className="border-2 font-semibold text-center p-2 bg-gray-100 h-20" key={key}>
                                {item.name}
                            </th>
                        </>
                    )
                })
            }
        </>
        // theaddata && theaddata.length > 0 && theaddata.map((item, key) => {
        //     <thead className="border h-20 bg-gray-50">
        //         return (
        //         <th className="p-2 border-2" key={key}>
        //             <div className="font-semibold text-center">{item.name}</div>
        //         </th>
        //         )
        //     </thead>
        // })

    )
}

export default Thead;
