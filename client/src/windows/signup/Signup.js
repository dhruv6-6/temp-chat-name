import React from 'react';
import './Signup.css'


const Signup = ()=>{
    return(
        <div className="full_screen_box_2">
            <div className='login_area_2'>
                <div className='username_2'>
                    <p className='username_writting_2'>Username</p>
                    <input className='username_input_2'></input>
                </div>
                <div className='password_2'>
                    <p className='password_writting_2'>Password</p>
                    <input className='password_input_2'></input>
                </div>
                <div className='button_area_2'>
                    <button className='sign_up_button_2'>Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default Signup;