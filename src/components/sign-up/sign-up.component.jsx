import React, { useState } from 'react';
import { connect } from "react-redux";

import './sign-up.styles.scss'
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signUpStart } from "../../redux/user/user.actions";

const SignUp = ({ signUpStart }) => {

  const [userCredentials, setCredentials] = useState({ 
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();
    if(password !== confirmPassword) {
      alert('passwords dont match');
      return;
    }      
    signUpStart(email, password, displayName);
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setCredentials({ ...userCredentials,  [name]: value })
  }
  

  return(
    <div className='sign-up'>
      <h2 className='title'>  I don't have have an account</h2>
      <span> Sign up with your email and password </span>

      <form onSubmit={ handleSubmit }>

        <FormInput
          type='text'
          name='displayName'
          value={displayName}
          onChange={handleChange}
          label='Display Name'
          required
        />

        <FormInput 
          name='email' 
          type='email' 
          value={email} 
          required 
          handleChange={handleChange}
          label='Email'
        />

        <FormInput 
          name='password' 
          type='password' 
          value={password} 
          required 
          handleChange={handleChange}
          label='Password'
        />

        <FormInput 
          name='confirmPassword' 
          type='password' 
          value={confirmPassword} 
          required 
          handleChange={handleChange}
          label='Confirm Password'
        />

        <div className='buttons'>
          <CustomButton type='submit'> Sign Up </CustomButton> 
        </div>
      </form>

    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  signUpStart: (email, password, displayName) => 
    dispatch(signUpStart({email, password, displayName})) 
});


export default connect(null, mapDispatchToProps)(SignUp);
