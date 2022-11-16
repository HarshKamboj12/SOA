import { BaseEntity } from './../../shared';

export class Userpreference implements BaseEntity {
    constructor(
        public id?: number,
        public genre?: string,
        public score?: number,
        public userId?: number,
    ) {
    }
}
