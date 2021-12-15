import { airType } from '../airType'
import { SelectedDataCalendar } from '../startpage/ordering/orderingTypes'
import { BagageStateType, BagageType } from './selectFlights/SelectFlightsTypes'




export type TicketType = {
    price: number
    selectedBagage: BagageType
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


