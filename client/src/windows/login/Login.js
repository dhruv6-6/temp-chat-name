import React from 'react';
import './Login.css'


const Login = ()=>{
    return(
        <div className="full_screen_box">
            <div className='login_area'>
                <div className='welcome'>
                    <p className="welcome_message">Welcome Back</p>
                    <div className="bottom_welcome_message">
                        <button className="new_here">New here?</button>
                        <button className='create_account'>Create an account</button>
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