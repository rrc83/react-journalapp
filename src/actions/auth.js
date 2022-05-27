import {types} from '../types/types';
import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import { setError, startLoading,finishLoading } from './ui';
import Swal from 'sweetalert2'

export const startLoginEmailPassword = (email,password)=>{

    return (dispatch) =>{
        dispatch(startLoading());
        firebase.auth().signInWithEmailAndPassword(email,password)
            .then(({user})=>{
                dispatch(login(user.uid,user.displayName));
                dispatch(finishLoading());            
            })
            .catch( ({message})=>{
                    dispatch(setError(message));
                    dispatch(finishLoading());
                    Swal.fire('Error',message,'error');
            });
        
    }
};

export const startRegisterWithEmailPassword = (email,password,name) =>{
    return (dispatch)=>{
        firebase.auth().createUserWithEmailAndPassword(email,password)
                        .then( async ({user}) =>{
                            await user.updateProfile({displayName:name});
                          
                            dispatch(login(user.uid,user.displayName));
                        })
                        .catch(({message})=>Swal.fire('Error',message,'error'))
    }
}

export const startGoogleLogin = ()=>{
    return (dispatch) =>{
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then( ({user}) =>{
                login(user.uid,user.displayName);
            })
            .catch(({message})=>Swal.fire('Error',message,'error'));
    }
}

export const login = (uid,displayName)=>{
    return {
        type: types.login,
        payload:{
            uid,
            displayName
        }
    }
}

export const startLogout = (uid) =>{
    return async (dispatch)=>{
        await firebase.auth().signOut();
        dispatch(logout());
    }
}

export const logout = ()=>({
    type:types.logout
});


