export const CREATE_USER_ONAY = 'CREATE_USER_ONAY';
export const CREATE_USER_FAIL = 'CREATE_USER_FAIL';
export const GET_USER_ONAY = 'GET_USER_ONAY';
export const DELETE_USER_ONAY = 'DELETE_USER_ONAY';

import OnayModel from '../../models/onayModel';

//const URL = '139.28.5.22';
const URL = '192.168.43.35';
//const URL = '192.168.0.12';


export const createUserOnay = (onayData) => {
    const { name, surname, email, password } = onayData;

    return async dispatch => {
        
        const result = await fetch(`http://${URL}:3000/arved/onaydurumu/onaypost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'    
            }, 
            body: JSON.stringify({
                name,
                surname,
                email,
                password
            })
        });

        const resultData = await result.json();
        if(resultData.success){
            const userOnay = resultData.data;
            dispatch({ 
                type: CREATE_USER_ONAY,
                userOnay: userOnay
            });
        }
        else {
            dispatch({ 
                type: CREATE_USER_FAIL,
                userOnay: 1
         });
        }
        return resultData;
    }
};

export const getUserOnay = () => {
    
    return async dispatch => {

        const result = await fetch(`http://${URL}:3000/arved/onaydurumu/onayget`);
        const resultData = await result.json();
        const onayArr = [];
        const loadOnayArr = item => {
            onayArr.push(
                new OnayModel(
                    item.name,
                    item.surname,
                    item.email,
                    item.password
                )
            );
        }
        resultData.forEach(loadOnayArr);
        dispatch({
            type: GET_USER_ONAY,
            userOnay: onayArr
        });
    };
};

export const deleteUserOnay = email => {
    return async dispatch => {
        const result = await fetch(`http://${URL}:3000/arved/onaydurumu/onaydelete/${email}`, {
                method: 'DELETE'
        });

        const resultData = await result.json();

        dispatch({
            type: DELETE_USER_ONAY,
            onayMail: email
        });
    };
}