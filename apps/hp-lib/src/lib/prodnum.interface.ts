export interface IProdnum {

    // id
    _id?: string

    // Код заказа
    prodnum: string

    // Коментарий
    comment: string

    // Текущее кол-во
    qty: number

    // Какое кол-во требуется для поддержания
    qtyKeep?: number

    // Прикрепрен ли к какой-то чувствительной области
    hp_id?: string

    // Если есть картинка 
    img?: string

}