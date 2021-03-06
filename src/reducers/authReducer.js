import {types} from '../types/types'
/* state
{
    uid:aaaaaaaa,
    name: ''
}

*/

export const authReducer = (state = {},action) => {

    switch (action.type){
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            };
        case types.logout:
            
             return {
                        uid:null,
                        name:null
                    };            
        default:
            return state;  
    }
}