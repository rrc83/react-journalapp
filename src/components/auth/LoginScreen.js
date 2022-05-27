import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm'
import validator from 'validator';
import Swal from 'sweetalert2'


export const LoginScreen = () => {
  const [formValues,handleInputChange] = useForm({email:'',password:''});
  const {email,password} = formValues;
  const dispatch = useDispatch();
  const {loading} = useSelector( state => state.ui);
 
  const handleLogin = (e)=>{
      e.preventDefault();
      if(isValidLogin()){
        dispatch(startLoginEmailPassword(email,password));
      }      
  }

  const handleGoogleLogin = ()=>{
    dispatch( startGoogleLogin() );
  }
  const isValidLogin = ()=>{
    if ( !validator.isEmail(email.trim())){
      Swal.fire('Error',"El email no es válido",'error');
      return false;
    }else if (validator.isEmpty(password.trim()) ){
      Swal.fire('Error',"La password no puede estar vacia",'error');
      return false;
    }
  
    return true;
  }
  return (
    <>
      <h3 className='auth__title'>Login</h3>
        <form onSubmit={handleLogin}>
          <input type="text"
                 placeholder="Email"
                 name="email"
                 value={email}
                 onChange={handleInputChange}
                 className='auth__input'
          />

          <input type="password"
                 placeholder="password"
                 name="password"
                 password={password}
                 onChange={handleInputChange}
                 className='auth__input'
          />
          <button type="submit"
                  className='btn btn-primary w100'
                  disabled={loading}
          >
            Login  
          </button>           

          <hr/>
          <div className='auth__social-networks'>
            <p>Login con redes sociales</p>
            <div className="google-btn" onClick={handleGoogleLogin}>
              <div className="google-icon-wrapper">
                  <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
              </div>
              <p className="btn-text">
                  <b>Sign in with google</b>
              </p>
            </div>  
          </div>
          <Link to="/auth/register" className='link'
          >
              Crear nueva cuenta
          </Link>      
        </form>
    </>
  )
}
