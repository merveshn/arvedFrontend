export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';
export const LOGOUT = 'LOGOUT';

//const URL = '139.28.5.22';
const URL = '192.168.43.35';
//const URL = '192.168.0.12';

const randomId = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

export const registerUser = (regData) => {
    const { name, surname, email, password } = regData;
   
    return async dispatch => {
        
        const result = await fetch(`http://${URL}:3000/arved/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'    
            }, 
            body: JSON.stringify({
                id: randomId(10),
                name,
                surname,
                email,
                password
            })
        });

        const resultData = await result.json();

        if(resultData.success){
            //const regUser = {id: resultData.data.id, name: resultData.data.name, token: resultData.token};
            dispatch({ 
                type: REGISTER_USER_SUCCESS,
                //userData: regUser
         });
        }
        else {
            dispatch({ 
                type: REGISTER_USER_FAIL,
                userData: 1
         });
        }
        return resultData;
    }
 };

export const loginUser = (logData) => {
    
    const { email, password } = logData;
    
    return async dispatch =>{
        
        const result = await fetch(`http://${URL}:3000/arved/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'    
            }, 
            body: JSON.stringify({
                email,
                password
            })
        });

        const resultData = await result.json();

        if(resultData.success){  
            const logUser = {id: resultData.data.id, name: resultData.data.name, token: resultData.token};
            dispatch({ 
                type: LOGIN_USER_SUCCESS,
                userData: logUser
            });
        }
        else{ 
            dispatch({ 
                type: LOGIN_USER_FAIL,
                userData: 1
            });
        }
        return resultData;
    }
 };

 export const logout = () => {
    return { type: LOGOUT };
 };