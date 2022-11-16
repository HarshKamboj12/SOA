import { BaseEntity } from './../../shared';

export class Bookpicture implements BaseEntity {
    constructor(
        public id?: number,
        public pictureContentType?: string,
        public picture?: any,
        public bookId?: number,
    ) {
    }
}
