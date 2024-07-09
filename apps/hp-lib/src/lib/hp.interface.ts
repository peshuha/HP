import { IPoint } from "./point.interface"

export interface IHP {
    _id?: string
    room_id: string
    polygon: IPoint[]
    segment?: IPoint[]
    status?: string
    comment?: string
}