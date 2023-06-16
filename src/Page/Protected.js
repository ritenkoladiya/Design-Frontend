import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Protected = (props) => {
    const { Pro } = props;
    const naviget = useNavigate();

    useEffect(() => {
        let login = JSON.parse(localStorage.getItem('token'))
        console.log('login', login)
        if (!login) {
            naviget('/login')
        }
    }, [])


    return (
        <div>
            <Pro />
        </div>
    )
}

export default Protected