import { airType } from '../airType'
import { PersonType, TicketType } from '../chainOrderPage/chainOrderType'
import { BagageStateType, BagageNameType, BagageType } from '../chainOrderPage/selectFlights/SelectFlightsTypes'
import { SelectedDataCalendar } from '../startpage/ordering/orderingTypes'
import {
    SELECTED_LANGUAGE,
    SET_BAGAGE_ARRAY,
    SET_BAGAGE_INDEX,
    SET_BOOLEAN_CHAIN_PAGE_CORRECT,
    SET_BUSY_SEATS,
    SET_DATA_CALENDAR,
    SET_INDEX_SELECTED_SEAT,
    SET_LOGIN,
    SET_PERSON,
    SET_PREV_URL_SUPPORT_PAGE,
    SET_SELECTED_FROM_AIR,
    SET_SELECTED_TO_AIR,
    SET_TICKET
} from './const'

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never

type GetActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>

export const actions = {
    setSelectedLanguage: (language: string) => ({ type: SELECTED_LANGUAGE, language } as const),
    setChainPageCorrect: (index: number) => ({ type: SET_BOOLEAN_CHAIN_PAGE_CORRECT, index } as const),
    setRandomBusySeats: (buseSeats: number[]) => ({ type: SET_BUSY_SEATS, buseSeats } as const),
    setIndexDelectedSeat: (index: number) => ({ type: SET_INDEX_SELECTED_SEAT, index } as const),
    setLogIn: (bol: boolean) => ({ type: SET_LOGIN, bol } as const),
    setIndexSelectedBagage: (index: number) => ({ type: SET_BAGAGE_INDEX, index } as const),
    setDataCalendar: (data: SelectedDataCalendar) => ({ type: SET_DATA_CALENDAR, data} as const),
    setSelectedFromAir: (payload: airType) => ({ type: SET_SELECTED_FROM_AIR, payload} as const),
    setSelectedToAir: (payload: airType) => ({ type: SET_SELECTED_TO_AIR, payload} as const),
    setTicket: (ticket: TicketType) => ({ type: SET_TICKET, ticket} as const),
    setPerson: (person: PersonType) => ({ type: SET_PERSON, person} as const),
    setBagageArray: (payload: BagageType[]) => ({ type: SET_BAGAGE_ARRAY, payload} as const),
    setPrevUrlSupportPage: (url: string) => ({ type: SET_PREV_URL_SUPPORT_PAGE , url} as const),
}

export type ActionsTypes = GetActionsTypes<typeof actions>
