import { airType } from '../airType'
import { SelectedDataCalendar } from '../startpage/ordering/orderingTypes'
import { BagageStateType, BagageNameType } from './selectFlights/SelectFlightsTypes'




export type TicketType = {
    price: number
    selectedBagage: BagageNameType
    selectedSeat: number
    data: SelectedDataCalendar
    fromAirName: string
    toAirName: string
} & PersonType








export type PersonType = {
    firstName: string
    lastName: string
    sex: string
}


