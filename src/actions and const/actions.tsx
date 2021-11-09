import { SELECTED_LANGUAGE } from "./const"

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never

type GetActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>

export const actions = {
    //addGamingDevicesFromServer: (gamingDevices: GamingDeviceType) => ({ type: ADD_GAMING_DEVICES_FROM_SERVER, gamingDevices } as const),

    setSelectedLanguage: (language: string) => ({ type: SELECTED_LANGUAGE, language } as const),
}

export type ActionsTypes = GetActionsTypes<typeof actions>
