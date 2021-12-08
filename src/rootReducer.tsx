import { combineReducers } from 'redux'
import { actions, ActionsTypes } from './actions and const/actions'
import {
    SELECTED_LANGUAGE,
    SET_BAGAGE,
    SET_BOOLEAN_CHAIN_PAGE_CORRECT,
    SET_BUSY_SEATS,
    SET_DATA_CALENDAR,
    SET_INDEX_SELECTED_SEAT,
    SET_LOGIN,
    SET_SELECTED_FROM_AIR,
    SET_SELECTED_TO_AIR
} from './actions and const/const'
import { airType } from './airType'
import { BagageStateType } from './chainOrderPage/selectFlights/SelectFlightsTypes'
import { fakeAPI_Air } from './fakeAPI_Air'
import { SelectedDataCalendar } from './startpage/ordering/orderingTypes'

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
    selectedBagage: BagageStateType | null
    selectedDataCalendar: SelectedDataCalendar
    selectedFromAir: null | airType
    selectedToAir: null | airType
}

const initialChainState: initialChainStateType = {
    chainPagesCorreсt: [false, false, false, false],
    busySeats: [],
    indexSelectedSeat: null,
    selectedBagage: null,
    selectedDataCalendar: { day: 1, month: 'December', year: 2022 },
    selectedFromAir: null,
    selectedToAir: null
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

        case SET_DATA_CALENDAR: {
            return {
                ...chainState,
                selectedDataCalendar: action.data
            }
        }

        case SET_SELECTED_FROM_AIR: {
            return {
                ...chainState,
                selectedFromAir: action.payload
            }
        }

        case SET_SELECTED_TO_AIR: {
            return { ...chainState, selectedToAir: action.payload }
        }

        default:
            return chainState
    }
}

export const rootReducer = combineReducers({
    generalState: generalStateReducer,
    chainState: chainStateReducer
})
