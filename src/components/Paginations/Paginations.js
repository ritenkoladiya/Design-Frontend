import React from 'react'
import { Pagination } from '@mui/material';

const Paginations = (props) => {
    const { data, datalength, size } = props
    // console.log("-----------------------", datalength)
    // console.log('count', count)
    return (
        <div className='flex items-center justify-center mt-10'>
            <Pagination onChange={(event, page) => data(event, page)} count={Math.ceil(datalength / size)} color="secondary" variant="outlined" shape="rounded" />
        </div>
    )
}

export default Paginations