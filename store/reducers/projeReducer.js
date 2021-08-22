import { CREATE_PROJE, UPDATE_PROJE, GET_PROJE, DELETE_PROJE } from '../actions/projeAction';

import ProjeModel from '../../models/projeModel';

const initialState = {
    projes: []
};

export default function ( state = initialState, action ){
    switch (action.type){
        case GET_PROJE:
            return {
                projes: action.resultProje
            }
        case CREATE_PROJE:
            const newProje = new ProjeModel(
                action.resultProje.projeId,
                action.resultProje.userId,
                action.resultProje.bap,
                action.resultProje.uluslararasi,
                action.resultProje.yil,
                action.resultProje.projeDurumu,
                action.resultProje.projeTuru,
                action.resultProje.alanBilgisi,
                action.resultProje.projeAdi,
                action.resultProje.projeButcesi,
                action.resultProje.paraBirimi,
                action.resultProje.kontratliProje,
                action.resultProje.disDestekli,
                action.resultProje.uluslararasiIsBirlikli,
                action.resultProje.arastirmaciSayisi,
                action.resultProje.projeYurutucusu
            );
            return {
                ...state,
                projes: [...state.projes, newProje]
            }
        case UPDATE_PROJE:
            const proIndex = state.projes.findIndex(
                pro => pro.projeId === action.resultProje.projeId
            );
            const updatedProje = new ProjeModel(
                state.projes[proIndex].projeId,
                state.projes[proIndex].userId,
                action.resultProje.bap,
                action.resultProje.uluslararasi,
                action.resultProje.yil,
                action.resultProje.projeDurumu,
                action.resultProje.projeTuru,
                action.resultProje.alanBilgisi,
                action.resultProje.projeAdi,
                action.resultProje.projeButcesi,
                action.resultProje.paraBirimi,
                action.resultProje.kontratliProje,
                action.resultProje.disDestekli,
                action.resultProje.uluslararasiIsBirlikli,
                action.resultProje.arastirmaciSayisi,
                action.resultProje.projeYurutucusu
            );
            const updatedProData = [...state.projes];
            updatedProData[proIndex] = updatedProje;
            return{
                ...state,
                projes: updatedProData
            }
        case DELETE_PROJE:
            return{
                ...state,
                projes: state.projes.filter( pro => pro.projeId !== action.proId)
            }
    };
    return state;
};