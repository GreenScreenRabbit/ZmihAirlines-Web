export enum BagageType {
    BASIC = 'BASIC',
    PREMIUM = 'PREMIUM',
    ULTRAPREMIUM = 'ULTRAPREMIUM'
}

export type BagageStateType = {name: BagageType , text: string,price:number}
