import { CREATE_PERSONEL_BILGILERI, UPDATE_PERSONEL_BILGILERI, GET_PERSONEL_BILGILERI } from '../actions/personelBilgileriAction';

import PersonelBilgileriModel from '../../models/personelBilgileriModel';

const initialState = {
    perData: [] 
};

export default function( state=initialState, action){
    switch( action.type ){
        case GET_PERSONEL_BILGILERI:
            return {
                perData: action.resultPersonel
            }
        case CREATE_PERSONEL_BILGILERI:
            const newPersonel = new PersonelBilgileriModel(
                action.perBilData.userId,
                action.perBilData.fullName,
                action.perBilData.wosHIndex,
                action.perBilData.wosAtifSayisi,
                action.perBilData.scopusHIndex,
                action.perBilData.scopusAtifSayisi,
                action.perBilData.uzmanlikAlani
            );
            return {
                ...state,
                perData: [...state.perData, newPersonel]
            }
        
        case UPDATE_PERSONEL_BILGILERI:
            const perIndex = state.perData.findIndex(
                per => per.userId === action.perBilData.userId
            );
            const updatedPersonel = new PersonelBilgileriModel(
                state.perData[perIndex].userId,
                action.perBilData.fullName,
                action.perBilData.wosHIndex,
                action.perBilData.wosAtifSayisi,
                action.perBilData.scopusHIndex,
                action.perBilData.scopusAtifSayisi,
                action.perBilData.uzmanlikAlani
            );
            const updatedPerData = [...state.perData];
            updatedPerData[perIndex] = updatedPersonel;
            return {
                ...state,
                perData: updatedPerData
            }
    }
    return state;
}