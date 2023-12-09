import axios from 'axios';
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


export default function EsewaSuccess() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const data = searchParams.get('data');
    
    const navigate = useNavigate();

    const gotoOrderDetails = () => {
       // navigate(`/users/orders/${oid}`)
       console.log("i am in gotoorder")
    }

    useEffect(() => {
        const verifyEsewaPayment = () => {
            axios.post(`${process.env.REACT_APP_API_URL}/payment/verify-payment
            `,  {data} )
                .then(res => {
                    gotoOrderDetails()
                }).catch(err => {
                    console.log(err);
                })
        }
        console.log(data);

        if (data) {
            verifyEsewaPayment()
        }
    }, [data])

    return (
        <div className="mx-auto max-w-7xl px-2 lg:px-0">
            <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                <div>Esewa Success</div>
            </div>
        </div>
    )
}
