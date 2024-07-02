import { IPoint } from "@vkr/hp-lib";

export class PointDto implements IPoint {

    constructor(
        public x: number, 
        public y: number
    ){}

    static fromIpoint(pt: IPoint) {
        return new this(
            pt.x,
            pt.y
        )
    }
}