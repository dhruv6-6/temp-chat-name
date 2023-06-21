import React from 'react';
import './Signup.css'


const Signup = ()=>{
    return(
        <div className="full_screen_box">
            <div className='login_area'>
                <div className='username'>
                    <p className='username_writting'>Username</p>
                    <input className='username_input'></input>
                </div>
                <div className='password'>
                    <p className='password_writting'>Password</p>
                    <input className='password_input'></input>
                </div>
                <div className='button_area'>
                    <button className='sign_up_button'>Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default Signup;