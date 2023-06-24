import {React , useState ,useEffect } from 'react';
import './Login.css'
import {
    convertBinaryToPEM,
    arrayBufferToBase64,
    base64ToArrayBuffer,
    importPublicKey,
    importPrivateKey,
    generateRSAKeys,
    deriveKeyFromPassword,
    encryptPrivateKey,
    decryptPrivateKey,
    encrypt,
    decrypt,
    generateSymKey,
    encryptSym,
    decryptSym,
} from "../../helper.js";


const Login = (props)=>{
    var {socket , curUserData , setChat , setSignup} = props;
    function loginInit(){
        socket.emit("login-init" , curUserData.username);
    }
    useEffect(()=>{
        socket.on("login-response" , data=>{
            console.log(data);
            console.log(curUserData)
            decryptPrivateKey(data.encryptedPrivateKey , curUserData.username + curUserData.password).then(privateKey=>{
                decrypt(privateKey , data.encryptedPassword , 0).then(password=>{
                    console.log("compare", password , curUserData.password)
                    if (password===curUserData.password){
                        curUserData.setPublicKey(data.publicKey);
                        curUserData.setPrivateKey(privateKey);

                        console.log(curUserData.username + " AUTHENTICATED");
                        socket.emit("login-authenticate" , {...data , socketID:curUserData.socketID})
                    }else{
                        console.log("defFuckyou\n");
                    }
                }).catch(err=>{
                    console.log("1FUCK YOU");
                })
            }).catch(err=>{
                console.log("2FUCK YOU");
            })  
        })
        socket.on("login-success" , data=>{
            socket.emit("get-duoList", curUserData.username);
            setChat(1); 
        })
        return ()=>{
            socket.off("login-response");
            socket.off("login-success");

        }
    },[socket, curUserData , setChat , setSignup]);
    return(
        <div className="full_screen_box">
            <div className='login_area'>
                <div className='welcome'>
                    <p className="welcome_message">Welcome Back</p>
                    <div className="bottom_welcome_message">
                        <p className="new_here">New here?</p>
                        <button className='create_account' onClick={(e)=>{
                            setSignup(1);
                        }}>Create an account</button>
                    </div>
                </div>
                <div className='username'>
                    <p className='username_writting'>Username</p>
                    <input className='username_input' onChange={(e)=>{
                        curUserData.setUsername(e.target.value);
                    }}></input>
                </div>
                <div className='password'>
                    <p className='password_writting'>Password</p>
                    <input className='password_input' onChange={(e)=>{
                        curUserData.setPassword(e.target.value);
                    }}></input>
                </div>
                <div className='button_area'>
                    <button  className='sign_up_button' onClick={loginInit}>Log in</button>
                </div>
            </div>
        </div>
    )
}

export default Login;