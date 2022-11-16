import { BaseEntity } from './../../shared';

export class Book implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public yearPublished?: number,
        public description?: string,
        public numPages?: number,
    ) {
    }
}
