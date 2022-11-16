import { BaseEntity } from './../../shared';

export class Author implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public born?: number,
        public website?: string,
    ) {
    }
}
