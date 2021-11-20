export enum LanguageType {
    EN = 'EN',
    RU = 'RU'
}

export type LanguageTextType<T> = {
    // [key: string]: { [key: string]: { [key: string]: T } }

    // [LanguageType.RU]: any

    //TODO typing trih

    // [LanguageType.RU]: { [key: string]: { [key: string]: T } }
    // [LanguageType.EN]: { [key: string]: { [key: string]: T } }
    [keyof in LanguageType]: LanguageType 
    // { [key: string]: { [key: string]: T } }
}
