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
    const [usernameExist , setUsernameExist] = useState(0);
    var {socket , curUserData} = props;
    function signUpInit(){
        console.log(curUserData);
        generateRSAKeys().then(({publicKey,privateKey})=>{
            encryptPrivateKey(privateKey , curUserData.username + curUserData.password).then(encryptedPrivateKey=>{

                encrypt(publicKey , curUserData.password).then(encryptedPassword=>{
                    socket.emit("sign-up-init" , {username:curUserData.username , encryptedPrivateKey , encryptedPassword});
                })
            })
        })
    }
    useEffect(()=>{
        // socket.emit("changed", curUserData);
        return ()=>{
            // socket.off("changed");
        }
    },[curUserData.username , curUserData.password]);

    return(
        <div className="full_screen_box_2">
            <div className='login_area_2'>
                <div className='username_2'>
                    <p className='username_writting_2'>Username</p>
                    <input className='username_input_2' onChange={(e)=>{    
                        curUserData.setUsername(e.target.value);
                    }}></input>
                    <>
                    usernameExist? <p>username exist</p>:<></>
                    </>
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