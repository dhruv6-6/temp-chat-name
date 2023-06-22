import React from 'react';
import './Login.css'


const Login = (props)=>{
    var {socket , curUserData , setChat , setSignup} = props;
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
                    <input className='username_input'></input>
                </div>
                <div className='password'>
                    <p className='password_writting'>Password</p>
                    <input className='password_input'></input>
                </div>
                <div className='button_area'>
                    <button className='sign_up_button'>Log in</button>
                </div>
            </div>
        </div>
    )
}

export default Login;