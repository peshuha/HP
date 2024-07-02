
export type ViewType = "flat" | "cylinder" | "sphere"

export interface IView {

    // id
    _id?: string

    // Room
    room_id: string

    // Как отображать фотку
    tp: ViewType

    // Параметры для реализации конкретного отображения
    options?: any
}