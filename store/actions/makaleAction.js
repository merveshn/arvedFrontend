export const CREATE_MAKALE = 'CREATE_MAKALE';
export const UPDATE_MAKALE = 'UPDATE_MAKALE';
export const GET_MAKALE = 'GET_MAKALE';
export const DELETE_MAKALE = 'DELETE_MAKALE';

import MakaleModel from '../../models/makaleModel';

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
};

export const createMakale = (makData) => {

    const {
        uluslararasiYayin,
        endeksTuru,
        uluslararasiIsBirlikli,
        makaleAdi,
        dergiAdi,
        yil,
        cilt_volume,
        sayi,
        sayfaNumarasi,
        doi,
        bap,
        kurumDisiYazar,
        yazarListesi
    } = makData;
    return async (dispatch, getState) =>{
        const ownerId = getState().auth.users.userId;
        const result = await fetch(`http://${URL}:3000/arved/makalebilgileri/makalepost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'    
            },
            body: JSON.stringify({
                makaleId: randomId(10),
                userId: ownerId,
                uluslararasiYayin,
                endeksTuru,
                uluslararasiIsBirlikli,
                makaleAdi,
                dergiAdi,
                yil,
                cilt_volume,
                sayi,
                sayfaNumarasi,
                doi,
                bap,
                kurumDisiYazar,
                yazarListesi
            })
        });
        const resultData = await result.json();
        const resultMakale = resultData.data;

        dispatch({ 
            type: CREATE_MAKALE,
            resultMakale: resultMakale
        });
    };
};

export const updateMakale = (makId, makData) =>{
    
    const {
        uluslararasiYayin,
        endeksTuru,
        uluslararasiIsBirlikli,
        makaleAdi,
        dergiAdi,
        yil,
        cilt_volume,
        sayi,
        sayfaNumarasi,
        doi,
        bap,
        kurumDisiYazar,
        yazarListesi
    } = makData;
    const makaleId = makId;
    return async (dispatch, getState) => {
        const ownerId = getState().auth.users.userId;
        const result = await fetch(`http://${URL}:3000/arved/makalebilgileri/makaleupdate`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                makaleId: makaleId,
                userId: ownerId,
                uluslararasiYayin,
                endeksTuru,
                uluslararasiIsBirlikli,
                makaleAdi,
                dergiAdi,
                yil,
                cilt_volume,
                sayi,
                sayfaNumarasi,
                doi,
                bap,
                kurumDisiYazar,
                yazarListesi
            })
        });
        
        const resultData = await result.json();
        const resultMakale = resultData.data;

        dispatch({ 
            type: UPDATE_MAKALE,
            resultMakale: resultMakale
        });
    };
};

export const getMakale = () => {
    return async (dispatch) => {
        const result = await fetch(`http://${URL}:3000/arved/makalebilgileri/makaleget`);
        
        const resultData = await result.json();
        const makArr = [];
        const loadMakArr = item => {
            makArr.push(
                new MakaleModel(
                    item.makaleId,
                    item.userId,
                    item.uluslararasiYayin,
                    item.endeksTuru,
                    item.uluslararasiIsBirlikli,
                    item.makaleAdi,
                    item.dergiAdi,
                    item.yil,
                    item.cilt_volume,
                    item.sayi,
                    item.sayfaNumarasi,
                    item.doi,
                    item.bap,
                    item.kurumDisiYazar,
                    item.yazarListesi
                )
            );
        };
        resultData.forEach(loadMakArr);
        dispatch({
            type: GET_MAKALE,
            resultMakale: makArr
        });
    };
};

export const deleteMakale = makId => {
    return async (dispatch) =>{
        const result = await fetch(`http://${URL}:3000/arved/makalebilgileri/makaledelete/${makId}`, {
            method: 'DELETE'
        });

        const resultData = await result.json();

        dispatch({
            type: DELETE_MAKALE,
            makId: makId
        });
    };
};