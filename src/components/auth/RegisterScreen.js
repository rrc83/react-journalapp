import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError,setError } from "../../actions/ui";
import { startRegisterWithEmailPassword } from '../../actions/auth';
export const RegisterScreen = () => {

  const [formValues,handleInputChange] = useForm({nombre:'',email:'',password:'',password2:''}); 
  const {nombre,email,password,password2} = formValues;
  const dispatch = useDispatch();
  const {msgError} = useSelector( state => state.ui);

const handleRegister = (e)=>{
  e.preventDefault();
  if(isFormValid()){
    dispatch(startRegisterWithEmailPassword(email,password,nombre));
  }
}

const isFormValid = ()=>{
  if (validator.isEmpty(nombre.trim())){
    dispatch( setError('Nombre es obligatorio'));
    return false;
  }else if ( !validator.isEmail(email.trim())){
    dispatch( setError('Email no válido'));
    return false;
  }else if (validator.isEmpty(password.trim()) || password.length < 6 ){
    dispatch( setError('Password incorrecta'));
    return false;
  }else if (!validator.equals(password,password2)){
    dispatch( setError('Las passwords no coinciden'));
    return false;
  }
  dispatch( removeError());
  return true;

}
  return (
    <>
      <h3 className='auth__title'>Register</h3>
        <form onSubmit={handleRegister} 
              className="animate__animated animate__fadeIn animate__faster">
          
              {
                msgError&&
                <div className='auth__alert-error'>{msgError}</div>
              }
          
          <input type="text"
                 placeholder="Nombre"
                 name="nombre"
                 value={nombre}
                 onChange={handleInputChange}                 
                 className='auth__input'
          />

          <input type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleInputChange}
                className='auth__input'
          />

          <input type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleInputChange}
                className='auth__input'
          />
          <input type="password"
                placeholder="Repite password"
                name="password2"
                value={password2}  
                onChange={handleInputChange}                              
                className='auth__input'
          />
          <button type="submit"
                  className='btn btn-primary w100 mb-5'
          >
            Register  
          </button>           

          <hr/>
          <Link to="/auth/login" className='link mt-1'
          >
              Ya estoy registrado
          </Link>      
        </form>
    </>  
  )
}
