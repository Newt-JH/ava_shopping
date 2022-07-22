import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie'
import jwt_decode from "jwt-decode";
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import '../cssFolder/UserProfile.css'
import Helmet from 'react-helmet';
import { loadTossPayments } from '@tosspayments/payment-sdk'
import { useLocation } from "react-router";


async function Toss() {


    const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq'
    const tossPayments = await loadTossPayments(clientKey);


        tossPayments.requestPayment('카드', {
            // 결제 수단 파라미터
            // 결제 정보 파라미터
            amount: 15000,
            orderId: 'g9_Vc0n5QV4KJa3kzREpV',
            orderName: '토스 티셔츠 외 2건',
            customerName: '박토스',
            successUrl: 'http://localhost:8080/success',
            failUrl: 'http://localhost:8080/fail',
        })



    return (
        <div>

            <html lang="en">
                <head>
                    <head>
                        <title>결제하기</title>
                        <Helmet>
                            <script src="https://js.tosspayments.com/v1">
                            </script>
                        </Helmet>

                    </head>
                    {

                    }
                </head>
            </html>
        </div>
    )

}




export default Toss;