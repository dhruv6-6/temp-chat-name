import React from 'react';
import './Login.css'


const Login = ()=>{
    return(
        <div className="full_screen_box">
            <div className='login_area'>
                <div className='welcome'>
                    <p className="welcome_message">Welcome Back</p>
                    <div className="bottom_welcome_message">
                        <p className="new_here">New here?</p>
                        <p className='create_account'>Create an account</p>
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
            </div>
        </div>
    )
}

export default Login;