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

function UserProfile(props) {

    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );

    const cookies = new Cookies();

    const [nick, setNick] = useState('');
    const [pass, setPass] = useState('');
    const [repass, setRePass] = useState('');

    const [nickBox, setNickBox] = useState(0);
    const [passBox, setPassBox] = useState(0);

    const nickChangeHandler = (e) => {
        setNick(e.target.value);
    }

    const passChangeHandler = (e) => {
        setPass(e.target.value);
    }

    const repassChangeHandler = (e) => {
        setRePass(e.target.value);
    }

    const nickDivHanlder = (e) => {
        if(nickBox === 0){
            setNickBox(1);
        }else{
            setNickBox(0);
        }
    }

    const PasswordDivHanlder = (e) => {
        if(passBox === 0){
            setPassBox(1);
        }else{
            setPassBox(0);
        }
    }


    const submitNickHandler = (event) => {
        event.preventDefault();
        if(nick.length === 0){
            alert("비밀번호 입력 후 변경하기 버튼을 눌러주세요.")
        }else{
        axios({
            url: `http://localhost:3000/user/update/name/${index}`, // api 호출 주소
            method: 'put',
            data: {
                userName: nick
            }
        }).then(function nick(res) {
            if(res.data === "OK"){
                alert("닉네임이 변경되었습니다.")
                navigate(`/`);
            }else{
                alert("동일한 닉네임이 있습니다. 확인 후 다시 눌러주세요.")
            }
        })
    }
    }

    const submitPassHandler = (event) => {
        event.preventDefault();
        if(pass.length === 0){
            alert("비밀번호 입력 후 변경하기 버튼을 눌러주세요.")
        }else{
            axios({
                url: `http://localhost:3000/user/update/password/${index}`, // api 호출 주소
                method: 'put',
                data: {
                    userID:userdata[0].userID,
                    userPassword: pass
                }
            }).then(function passCheck(res) {
                // 비밀번호 변경 성공 시
                navigate(`/`);
                alert("비밀번호 변경 완료하였습니다.");
            })
        }

    }

    const [userdata, setUserData] = useState([
        {
        }
    ]);

    // JWT 토큰 가져와서 디코딩
    const jwttoken = cookies.get("loginCookie");
    var decToken = jwt_decode(jwttoken);

    // 유저 인덱스 가져오기
    const index = decToken.userIndex;

    // 현재 페이지 인덱스값 가져오기
    const { id } = useParams();

    // 현재 내가 있는 페이지와 유저 인덱스가 다르다면 다른 유저의 페이지 진입이므로 막아주기
    const navigate = useNavigate();
    if (String(index) !== id || index === undefined) {
        navigate(`/`);
    }

    // 페이지 진입 시 글 읽어오기
    const sendRequest = async () => {
        const response = await axios.get(`http://localhost:3000/user/${index}`);
        setUserData(response.data);
    };


    useEffect(() => {
        sendRequest();
    }, []);

    return (
        <div>


            <div className='profile'>

                <Card className='profileCard' sx={{ minWidth: 275, maxWidth: 700 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
                            NickName {bull} {userdata[0].userName}
                        </Typography>
                        <Button onClick={nickDivHanlder} size="small">NickName reset</Button>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">

                        </Typography>
                        <Typography variant="h5" component="div">
                            ID {bull} {userdata[0].userID}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        </Typography>
                        <Typography variant="h5" component="div">
                            Email {bull} {userdata[0].userEmail}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        </Typography>
                        <Button onClick={PasswordDivHanlder} size="small">Password reset</Button>
                    </CardContent>
                </Card>

            </div>

            {nickBox === 1 ? 
            <div className='nickPassDIV'>
                <form className='nickPassForm' onSubmit={submitNickHandler}>
                    <div>
                        <input className="nickPass" type="text" value={nick} onChange={nickChangeHandler} minLength="4" maxLength="10" placeholder="닉네임을 입력해주세요."></input>
                    </div>
                    <Stack spacing={2} direction="row" marginTop="30px">
                        <Button type='submit' variant="outlined" >변경하기</Button>
                    </Stack>
                </form>
            </div> : <div></div>}

                {passBox === 1 ?            
                <div className='nickPassDIV'>
                <form className='nickPassForm' onSubmit={submitPassHandler}>

                    <div>
                        <input className='nickPass' type="password" value={pass} minLength="4" maxLength="10" onChange={passChangeHandler} placeholder="비밀번호"></input><br />
                    </div>

                    <div>
                        <input className='nickPass' type="password" value={repass} minLength="4" maxLength="10" onChange={repassChangeHandler} placeholder="비밀번호 재입력"></input>
                    </div>

                    {pass !== repass ? <div><br></br><a>비밀번호가 틀립니다.</a></div> :
                        <Stack spacing={2} direction="row" marginTop="30px">
                            <Button type='submit' variant="outlined" >변경하기</Button>
                        </Stack>}<br></br>

                </form>
            </div> : <div></div>
                }




        </div>
    );
}




export default UserProfile;