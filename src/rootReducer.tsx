import { combineReducers } from 'redux'
import { ActionsTypes } from './actions and const/actions'
import {
    SELECTED_LANGUAGE,
    SET_BAGAGE,
    SET_BOOLEAN_CHAIN_PAGE_CORRECT,
    SET_BUSY_SEATS,
    SET_INDEX_SELECTED_SEAT,
    SET_LOGIN
} from './actions and const/const'
import { airType } from './airType'
import { BagageStateType } from './chainOrderPage/selectFlights/SelectFlightsTypes'
import { fakeAPI_Air } from './fakeAPI_Air'

const initialState: initialStateType = {
    selectedLanguage: 'EN',
    logined: false,
    ticket: null,
    indexAirFrom: 0,
    indexAirTo: 1,
    airsArray: fakeAPI_Air
} 

type initialStateType = {
    selectedLanguage: string
    logined: boolean
    ticket: object | null
    indexAirFrom: number
    indexAirTo: number
    airsArray: airType[]
}

//logined

type initialChainStateType = {
    chainPagesCorreсt: boolean[]
    busySeats: number[]
    indexSelectedSeat: number | null
    //TODO CHANGE
    selectedBagage: BagageStateType | null
}

const initialChainState: initialChainStateType = {
    chainPagesCorreсt: [false, false, false, false],
    busySeats: [],
    indexSelectedSeat: null,
    selectedBagage: null
}

const generalStateReducer = (generalState = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case SELECTED_LANGUAGE: {
            return { ...generalState, selectedLanguage: action.language }
        }
        case SET_LOGIN: {
            return { ...generalState, logined: action.bol }
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
        }

        case SET_BUSY_SEATS: {
            return {
                ...chainState,
                busySeats: [...action.buseSeats]
            }
        }

        case SET_BAGAGE: {
            return {
                ...chainState,
                selectedBagage: action.item
            }
        }

        case SET_INDEX_SELECTED_SEAT: {
            return {
                ...chainState,
                indexSelectedSeat: action.index
            }
        }

        default:
            return chainState
    }
}

export const rootReducer = combineReducers({
    generalState: generalStateReducer,
    chainState: chainStateReducer
})
