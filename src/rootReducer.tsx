import { combineReducers } from 'redux'
import { ActionsTypes } from './actions and const/actions'
import { SELECTED_LANGUAGE } from './actions and const/const'

const initialState: initialStateType = {
    selectedLanguage: 'EN'
}

type initialStateType = {
    selectedLanguage: string
}

const generalStateReducer = (generalState = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case SELECTED_LANGUAGE: {
            return { ...generalState, selectedLanguage: action.language }
        }

        default:
            return generalState
    }
}

export const rootReducer = combineReducers({
    generalState: generalStateReducer
})
