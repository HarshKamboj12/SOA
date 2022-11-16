import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BookapigatewayAuthorModule } from './author/author.module';
import { BookapigatewayBookModule } from './book/book.module';
import { BookapigatewayBookpictureModule } from './bookpicture/bookpicture.module';
import { BookapigatewayGenreModule } from './genre/genre.module';
import { BookapigatewayRatingModule } from './rating/rating.module';
import { BookapigatewayUserpreferenceModule } from './userpreference/userpreference.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        BookapigatewayAuthorModule,
        BookapigatewayBookModule,
        BookapigatewayBookpictureModule,
        BookapigatewayGenreModule,
        BookapigatewayRatingModule,
        BookapigatewayUserpreferenceModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookapigatewayEntityModule {}
