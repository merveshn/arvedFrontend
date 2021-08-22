import { REGISTER_USER_SUCCESS, LOGIN_USER_SUCCESS, REGISTER_USER_FAIL, LOGIN_USER_FAIL, LOGOUT } from '../actions/authAction';

import UserModel from '../../models/userModel';

const initialState = {
    users: [],
    errors: {}
};

export default function( state=initialState, action){
    switch( action.type ){
        case REGISTER_USER_SUCCESS:
            /*const newUser = new UserModel( action.userData.id, action.userData.name, action.userData.token );
            return{
                ...state,
                users: newUser
            };
            */
        return state;
        case REGISTER_USER_FAIL:
            return {  
                ...state,
                errors: true
            }
        case LOGIN_USER_SUCCESS:
            const newUser2 = new UserModel( action.userData.id, action.userData.name, action.userData.token );
           /* const userIndex = state.users.findIndex(
                user => user.id === action.userData.id
              );
            const updateUsers = [...state.users];
            updateUsers[userIndex] = action.userData  */
            return{
                ...state,
                users: newUser2
            };
        case LOGIN_USER_FAIL:
            return {
                ...state,
                errors: true
            }
        case LOGOUT:
            return initialState;
    }
    return state;
}