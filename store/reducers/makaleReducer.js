import { CREATE_MAKALE, UPDATE_MAKALE, GET_MAKALE, DELETE_MAKALE } from '../actions/makaleAction';

import MakaleModel from '../../models/makaleModel';

const initialState = {
    makales : []
};

export default function( state = initialState, action ){
    switch (action.type){
        case GET_MAKALE:
            return {
                makales: action.resultMakale
            }
        case CREATE_MAKALE:
            const newMakale = new MakaleModel(
                action.resultMakale.makaleId,
                action.resultMakale.userId,
                action.resultMakale.uluslararasiYayin,
                action.resultMakale.endeksTuru,
                action.resultMakale.uluslararasiIsBirlikli,
                action.resultMakale.makaleAdi,
                action.resultMakale.dergiAdi,
                action.resultMakale.yil,
                action.resultMakale.cilt_volume,
                action.resultMakale.sayi,
                action.resultMakale.sayfaNumarasi,
                action.resultMakale.doi,
                action.resultMakale.bap,
                action.resultMakale.kurumDisiYazar,
                action.resultMakale.yazarListesi
            );
            return {
                ...state,
                makales: [...state.makales, newMakale]
            }
        
        case UPDATE_MAKALE:
            const makIndex = state.makales.findIndex(
                mak => mak.makaleId === action.resultMakale.makaleId
            );
            const updatedMakale = new MakaleModel(
                state.makales[makIndex].makaleId,
                state.makales[makIndex].userId,
                action.resultMakale.uluslararasiYayin,
                action.resultMakale.endeksTuru,
                action.resultMakale.uluslararasiIsBirlikli,
                action.resultMakale.makaleAdi,
                action.resultMakale.dergiAdi,
                action.resultMakale.yil,
                action.resultMakale.cilt_volume,
                action.resultMakale.sayi,
                action.resultMakale.sayfaNumarasi,
                action.resultMakale.doi,
                action.resultMakale.bap,
                action.resultMakale.kurumDisiYazar,
                action.resultMakale.yazarListesi
            );
            const updatedMakData = [...state.makales];
            updatedMakData[makIndex] = updatedMakale;
            return{
                ...state,
                makales: updatedMakData
            }
        case DELETE_MAKALE:
            return{
                ...state,
                makales: state.makales.filter( mak => mak.makaleId !== action.makId)
            }
    };
    return state;
};