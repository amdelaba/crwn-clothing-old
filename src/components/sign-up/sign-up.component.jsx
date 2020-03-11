import React from 'react';

import './sign-up.styles.scss'
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument} from '../../firebase/firebase.utils'

class SignUp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    const {displayName, email, password, confirmPassword} = this.state;

    if(password !== confirmPassword) {
      alert('passwords dont match');
      return;
    }      

    try{

      const { user } = await auth.createUserWithEmailAndPassword(email, password)
      await createUserProfileDocument(user, { displayName });

      // just clears out form
      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })

    } catch(error) {
        console.error(error);
    }
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value})
  }

  render() {
    const {displayName, email, password, confirmPassword} = this.state;
    return(
      <div className='sign-up'>
        <h2 className='title'>  I don't have have an account</h2>
        <span> Sign up with your email and password </span>

        <form onSubmit={ this.handleSubmit }>

          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            onChange={this.handleChange}
            label='Display Name'
            required
          />

          <FormInput 
            name='email' 
            type='email' 
            value={email} 
            required 
            handleChange={this.handleChange}
            label='Email'
          />

          <FormInput 
            name='password' 
            type='password' 
            value={password} 
            required 
            handleChange={this.handleChange}
            label='Password'
          />

          <FormInput 
            name='confirmPassword' 
            type='password' 
            value={confirmPassword} 
            required 
            handleChange={this.handleChange}
            label='Confirm Password'
          />

          <div className='buttons'>
            <CustomButton type='submit'> Sign Up </CustomButton> 
          </div>
        </form>

      </div>
    )
  }
}

export default SignUp;
