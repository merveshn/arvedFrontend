export const CREATE_PERSONEL_BILGILERI = 'CREATE_PERSONEL_BILGILERI';
export const UPDATE_PERSONEL_BILGILERI = 'UPDATE_PERSONEL_BILGILERI';
export const GET_PERSONEL_BILGILERI = 'GET_PERSONEL_BILGILERI';

import PersonelBilgileriModel from '../../models/personelBilgileriModel';

//const URL = '139.28.5.22';
const URL = '192.168.43.35';
//const URL = '192.168.0.12';

export const createPersonelBilgileri = (ownerId) => {
    return async (dispatch) => {
        const result = await fetch(`http://${URL}:3000/arved/personelbilgileri/pbpost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'    
            }, 
            body: JSON.stringify({
                userId: ownerId,
                fullName: '',
                wosHIndex: 0,
                wosAtifSayisi: 0,
                scopusHIndex: 0,
                scopusAtifSayisi: 0,
                uzmanlikAlani: ''
            })
        });

        const resultData = await result.json();
        const perBilData = resultData.data;

        dispatch({ 
            type: CREATE_PERSONEL_BILGILERI,
            perBilData: perBilData
     });
    };
};

export const updatePersonelBilgileri = (perData) => {
    const { fullName, wosHIndex, wosAtifSayisi, scopusHIndex, scopusAtifSayisi, uzmanlikAlani} = perData;
    return async (dispatch, getState) => {
        const ownerId = getState().auth.users.userId;
        const result = await fetch(`http://${URL}:3000/arved/personelbilgileri/pbupdate`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: ownerId,
                fullName,
                wosHIndex,
                wosAtifSayisi,
                scopusHIndex,
                scopusAtifSayisi,
                uzmanlikAlani
            })
        });

        const resultData = await result.json();
        const perBilData = resultData
        dispatch({ 
            type: UPDATE_PERSONEL_BILGILERI,
            perBilData: perBilData
     });
    };
};

export const getPersonelBilgileri = () => {
    return async (dispatch) => {
        const result = await fetch(`http://${URL}:3000/arved/personelbilgileri/pbget`);
        const resultData = await result.json();
        const perArr = [];
        const loadPerArr = item => {
            perArr.push(
                new PersonelBilgileriModel(
                    item.userId,
                    item.fullName,
                    item.wosHIndex,
                    item.wosAtifSayisi,
                    item.scopusHIndex,
                    item.scopusAtifSayisi,
                    item. uzmanlikAlani
                )
            );
        };
        resultData.forEach(loadPerArr);
        dispatch({
            type: GET_PERSONEL_BILGILERI,
            resultPersonel: perArr
        });
    };
};