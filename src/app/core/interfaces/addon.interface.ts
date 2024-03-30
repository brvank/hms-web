export interface Addon{
    addon_id: number,
    addon_name: string,
    addon_info: string,
    addon_price: number
}

export interface AddonNoId{
    addon_name: string,
    addon_info: string,
    addon_price: number
}