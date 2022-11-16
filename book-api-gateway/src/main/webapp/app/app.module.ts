import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { BookapigatewaySharedModule, UserRouteAccessService } from './shared';
import { BookapigatewayAppRoutingModule} from './app-routing.module';
import { BookapigatewayHomeModule } from './home/home.module';
import { BookapigatewayAdminModule } from './admin/admin.module';
import { BookapigatewayAccountModule } from './account/account.module';
import { BookapigatewayEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        BookapigatewayAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        BookapigatewaySharedModule,
        BookapigatewayHomeModule,
        BookapigatewayAdminModule,
        BookapigatewayAccountModule,
        BookapigatewayEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class BookapigatewayAppModule {}
