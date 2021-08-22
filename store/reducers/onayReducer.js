import { CREATE_USER_ONAY, CREATE_USER_FAIL, GET_USER_ONAY, DELETE_USER_ONAY } from '../actions/onayAction';

import OnayModel from '../../models/onayModel';

const initialState = {
    onayUser: [],
    errors: {}
};

export default function( state=initialState, action){
    switch(action.type){
        case GET_USER_ONAY:
            return {
                ...state,
                onayUser: action.userOnay
            }
        case CREATE_USER_ONAY:
            const newOnay = new OnayModel(
                action.userOnay.name,
                action.userOnay.surname,
                action.userOnay.email,
                action.userOnay.password
            );
            return {
                ...state,
                onayUser: [...state.onayUser, newOnay]
            }
        case CREATE_USER_FAIL:
            return state;
        case DELETE_USER_ONAY:
            return{
                ...state,
                onayUser: state.onayUser.filter( user => user.email !== action.onayMail)
            }
    };
    return state;
};