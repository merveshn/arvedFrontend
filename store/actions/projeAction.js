export const CREATE_PROJE = 'CREATE_PROJE';
export const UPDATE_PROJE = 'UPDATE_PROJE';
export const GET_PROJE = 'GET_PROJE';
export const DELETE_PROJE = 'DELETE_PROJE';

import ProjeModel from '../../models/projeModel';

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

export const createProje = proData => {

    const {
        bap,
        uluslararasi,
        yil,
        projeDurumu,
        projeTuru,
        alanBilgisi,
        projeAdi,
        projeButcesi,
        paraBirimi,
        kontratliProje,
        disDestekli,
        uluslararasiIsBirlikli,
        arastirmaciSayisi,
        projeYurutucusu
    } = proData;

    return async (dispatch, getState) => {
        const ownerId = getState().auth.users.userId;
        const result = await fetch(`http://${URL}:3000/arved/projebilgileri/projepost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'    
            },
            body: JSON.stringify({
                projeId: randomId(10),
                userId: ownerId,
                bap,
                uluslararasi,
                yil,
                projeDurumu,
                projeTuru,
                alanBilgisi,
                projeAdi,
                projeButcesi,
                paraBirimi,
                kontratliProje,
                disDestekli,
                uluslararasiIsBirlikli,
                arastirmaciSayisi,
                projeYurutucusu
            })
        });

        const resultData = await result.json();
        const resultProje = resultData.data;

        dispatch({ 
            type: CREATE_PROJE,
            resultProje: resultProje
        });
    }
};

export const updateProje = (proId, proData) => {
    
    const {
        bap,
        uluslararasi,
        yil,
        projeDurumu,
        projeTuru,
        alanBilgisi,
        projeAdi,
        projeButcesi,
        paraBirimi,
        kontratliProje,
        disDestekli,
        uluslararasiIsBirlikli,
        arastirmaciSayisi,
        projeYurutucusu
    } = proData;
    const projeId = proId;
    
    return async (dispatch, getState) => {
        const ownerId = getState().auth.users.userId;
        const result = await fetch(`http://${URL}:3000/arved/projebilgileri/projeupdate`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                projeId: projeId,
                userId: ownerId,
                bap,
                uluslararasi,
                yil,
                projeDurumu,
                projeTuru,
                alanBilgisi,
                projeAdi,
                projeButcesi,
                paraBirimi,
                kontratliProje,
                disDestekli,
                uluslararasiIsBirlikli,
                arastirmaciSayisi,
                projeYurutucusu
            })
        });

        const resultData = await result.json();
        const resultProje = resultData.data;

        dispatch({ 
            type: UPDATE_PROJE,
            resultProje: resultProje
        });
    };
};

export const getProje = () => {

    return async (dispatch) => {
        const result = await fetch(`http://${URL}:3000/arved/projebilgileri/projeget`);
        
        const resultData = await result.json();
        const proArr = [];
        const loadProArr = item => {
            proArr.push(
                new ProjeModel(
                    item.projeId,
                    item.userId,
                    item.bap,
                    item.uluslararasi,
                    item.yil,
                    item.projeDurumu,
                    item.projeTuru,
                    item.alanBilgisi,
                    item.projeAdi,
                    item.projeButcesi,
                    item.paraBirimi,
                    item.kontratliProje,
                    item.disDestekli,
                    item.uluslararasiIsBirlikli,
                    item.arastirmaciSayisi,
                    item.projeYurutucusu
                )
            );
        };

        resultData.forEach(loadProArr);
        dispatch({
            type: GET_PROJE,
            resultProje: proArr
        });
    };
};

export const deleteProje = proId => {

    return async (dispatch) => {
        const result = await fetch(`http://${URL}:3000/arved/projebilgileri/projedelete/${proId}`, {
            method: 'DELETE'
        });

        const resultData = await result.json();

        dispatch({
            type: DELETE_PROJE,
            proId: proId
        });
    };
};