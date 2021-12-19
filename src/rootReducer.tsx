import { combineReducers } from "redux"
import { actions, ActionsTypes } from "./actions and const/actions"
import {
    SELECTED_LANGUAGE,
    SET_BAGAGE_INDEX,
    SET_BAGAGE_ARRAY,
    SET_BOOLEAN_CHAIN_PAGE_CORRECT,
    SET_BUSY_SEATS,
    SET_DATA_CALENDAR,
    SET_INDEX_SELECTED_SEAT,
    SET_LOGIN,
    SET_PERSON,
    SET_SELECTED_FROM_AIR,
    SET_SELECTED_TO_AIR,
    SET_TICKET,
    SET_PREV_URL_SUPPORT_PAGE
} from "./actions and const/const"
import { airType } from "./airType"
import { PersonType, TicketType } from "./chainOrderPage/chainOrderType"
import { BagageStateType, BagageType } from "./chainOrderPage/selectFlights/SelectFlightsTypes"
import { fakeAPI_Air } from "./fakeAPI_Air"
import { SelectedDataCalendar } from "./startpage/ordering/orderingTypes"

const initialState: initialStateType = {
    selectedLanguage: "EN",
    logined: false,
    ticket: null,
    indexAirFrom: 0,
    indexAirTo: 1,
    airsArray: fakeAPI_Air,
    prevUrlSupportPage: ""
}

type initialStateType = {
    selectedLanguage: string
    logined: boolean
    ticket: TicketType | null
    indexAirFrom: number
    indexAirTo: number
    airsArray: airType[]
    prevUrlSupportPage: string
}

//logined

type initialChainStateType = {
    chainPagesCorreсt: boolean[]
    busySeats: number[]
    indexSelectedSeat: number | null
    indexSelectedBagage: number | null
    selectedDataCalendar: SelectedDataCalendar | null
    selectedFromAir: null | airType
    selectedToAir: null | airType
    bagageArray: BagageType[]
    person: null | PersonType
}

const initialChainState: initialChainStateType = {
    chainPagesCorreсt: [false, false, false, false],
    busySeats: [],
    indexSelectedSeat: null,
    indexSelectedBagage: null,
    selectedDataCalendar: null,
    selectedFromAir: null,
    selectedToAir: null,
    bagageArray: [],
    person: null
}

const generalStateReducer = (generalState = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case SELECTED_LANGUAGE: {
            return { ...generalState, selectedLanguage: action.language }
        }
        case SET_LOGIN: {
            return { ...generalState, logined: action.bol }
        }

        case SET_TICKET: {
            return {
                ...generalState,
                ticket: action.ticket
            }
        }

        case SET_PREV_URL_SUPPORT_PAGE: {
            return { ...generalState, prevUrlSupportPage: action.url }
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
                chainPagesCorreсt: [...chainState.chainPagesCorreсt.slice(0, action.index), true, ...chainState.chainPagesCorreсt.slice(action.index + 1)]
            }
        }

        case SET_BAGAGE_ARRAY: {
            return { ...chainState, bagageArray: action.payload }
        }

        case SET_BUSY_SEATS: {
            return {
                ...chainState,
                busySeats: [...action.buseSeats]
            }
        }

        case SET_BAGAGE_INDEX: {
            return {
                ...chainState,
                selectedBagage: action.index
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

        case SET_PERSON: {
            return { ...chainState, person: action.person }
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
