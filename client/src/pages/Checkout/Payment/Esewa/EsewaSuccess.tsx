import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { State } from '../../../../state';


export default function EsewaSuccess() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const data = searchParams.get('data');
    
  
    const { orderCreate } = useSelector(
        (state: State) => state.orderCreate
      );
    

    const gotoOrderDetails = (orderId : any) => {
        navigate(`/order/${orderId}`)
       
    }

    useEffect(() => {
        const verifyEsewaPayment = () => {
            axios.post(`${process.env.REACT_APP_API_URL}/payment/verify-payment
            `,  {data} )
                .then((req : any) => {
                    gotoOrderDetails(req.data.orderId )
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
