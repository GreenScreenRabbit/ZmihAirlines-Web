import { combineReducers } from 'redux'
import { ActionsTypes } from './actions and const/actions'
import { SELECTED_LANGUAGE, SET_BOOLEAN_CHAIN_PAGE_CORRECT } from './actions and const/const'

const initialState: initialStateType = {
    selectedLanguage: 'EN'
}

type initialStateType = {
    selectedLanguage: string
}

//boolean[]

type initialChainStateType = {
    chainPagesCorreсt: boolean[]
}

const initialChainState: initialChainStateType = {
    chainPagesCorreсt: [false, false, false, false]
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

const chainStateReducer = (chainState = initialChainState, action: ActionsTypes) => {
    switch (action.type) {
        case SET_BOOLEAN_CHAIN_PAGE_CORRECT: {
            return {
                ...chainState,
                chainPagesCorreсt: [
                    ...chainState.chainPagesCorreсt.slice(0, action.index),
                    true,
                    ...chainState.chainPagesCorreсt.slice(action.index + 1)
                ]
            }

            // [...state.filtersForCatalogCategory.slice(0, action.indexFilterForDeleteBrand), ...state.filtersForCatalogCategory.slice(action.indexFilterForDeleteBrand + 1)]
        }

        default:
            return chainState
    }
}

export const rootReducer = combineReducers({
    generalState: generalStateReducer,
    chainState: chainStateReducer
})
