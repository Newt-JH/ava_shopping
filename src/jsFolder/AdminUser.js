import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import '../cssFolder/AdminProAll.css';


function AdminUser(props) {

    const navigate = useNavigate();

    const [data, setData] = useState([
        {
        }
    ]);
    const [delId,setDelId] = useState('');
    
    // 페이지 진입 시 글 읽어오기
    const sendRequest = async () => {
        const response = await axios.get(`http://localhost:3000/user`);
        setData(response.data);
    };
    useEffect(() => {
        sendRequest();
    }, []);

    // 글 삭제
    const deleteRequest = async (num) => {

        if (window.confirm("삭제 하시겠습니까?")) {
            await axios.delete(`http://localhost:3000/user/delete/${num}`);
            alert(num + " 번 유저 탈퇴처리 완료");
            sendRequest();
        } else {
        }

    }

    // 글 삭제 클릭 핸들러
    const delHandler = (e,num) => {
        deleteRequest(num);
    }

    // 금액 3자리마다 , 찍어주기
    function numberWithCommas(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}


    if ((data.length) === 0) {
        return (
            <>
                <h1>등록된 유저가 없습니다.</h1>
            </>
        )
    } else if (data[0].userIndex === undefined) {

    } else {
        return (
            <div className='haaw'>
                <h2>전체 유지 관리 페이지 / 유저 탈퇴 가능</h2>
                {data.map((datas) => (
                    <Card sx={{ display: 'flex', width: '500px', height: '200px', margin: "0 auto", justifyContent: "space-between", alignItems: 'center', marginBottom: "0px", marginTop: "20px" }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography sx={{ fontWeight: 900 }} component="div" variant="h5">
                                    ID : {datas.userID}
                                </Typography>
                                <Typography variant="h5" color="text.secondary" component="div">
                            NickName : {datas.userName}
                                </Typography>
                                <Typography variant="h5" color="text.secondary" component="div">
        
                                   Email : {datas.userEmail}
                                

                                </Typography>

                                <Typography border="1px solid" width="30px" borderRadius="10px" onClick={(e) => delHandler(e,datas.userIndex)} variant="subtitle1" color="text.secondary" component="div">
                                탈퇴
                                </Typography>
                                <br></br>
                            </CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

                            </Box>
                        </Box>

                    </Card>

                ))}

            </div>
        );
    }


}

export default AdminUser;