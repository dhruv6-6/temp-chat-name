import {React , useEffect , useState} from 'react';
import './Signup.css'
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


const Signup = (props)=>{
    const [usernameExist , setUsernameExist] = useState("#EBEBEB");
    var {socket , curUserData , setChat , setSignup} = props;
    function signUpInit(){
        console.log("initialising sign up\n",curUserData);
        generateRSAKeys().then(({publicKey,privateKey})=>{
            curUserData.setPublicKey(publicKey);
            curUserData.setPrivateKey(privateKey);
            encryptPrivateKey(privateKey , curUserData.username + curUserData.password).then(encryptedPrivateKey=>{
                encrypt(publicKey , curUserData.password).then(encryptedPassword=>{
                    console.log(encryptedPassword)
                    socket.emit("sign-up-init" , {username:curUserData.username , publicKey,  encryptedPrivateKey , encryptedPassword , socketID: socket.id});
                }).catch(err=>{
                    console.log(err);
                })
            }).catch(err=>{
                console.log(err);
            })
        }).catch(err=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        socket.on("username-exist" , data=>{
            setUsernameExist("#e67b7b");
        })
        socket.on("sign-up-complete", data=>{
            socket.emit("get-duoList", curUserData.username);
            setChat(1);  setSignup(0);
        })
        return ()=>{
            socket.off("username-exist");
        }
    },[socket, curUserData , setChat , setSignup] );

    return(
        <div className="full_screen_box_2">
            <div className='login_area_2'>
                <div className='username_2'>
                    <p className='username_writting_2'>Username</p>
                    <input style={{backgroundColor:usernameExist}} className='username_input_2' onChange={(e)=>{    
                        curUserData.setUsername(e.target.value); setUsernameExist("#EBEBEB");
                    }}></input>
                    
                </div>
                <div className='password_2'>
                    <p className='password_writting_2'>Password</p>
                    <input className='password_input_2' onChange={(e)=>{
                        curUserData.setPassword(e.target.value);
                    }}></input>
                </div>
                <div className='button_area_2'>
                    <button className='sign_up_button_2' onClick={signUpInit}>Sign Up</button>
                </div>
            </div> 
        </div>
    )
}

export default Signup;