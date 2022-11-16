import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { UserpreferenceComponent } from './userpreference.component';
import { UserpreferenceDetailComponent } from './userpreference-detail.component';
import { UserpreferencePopupComponent } from './userpreference-dialog.component';
import { UserpreferenceDeletePopupComponent } from './userpreference-delete-dialog.component';

@Injectable()
export class UserpreferenceResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const userpreferenceRoute: Routes = [
    {
        path: 'userpreference',
        component: UserpreferenceComponent,
        resolve: {
            'pagingParams': UserpreferenceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Userpreferences'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'userpreference/:id',
        component: UserpreferenceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Userpreferences'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userpreferencePopupRoute: Routes = [
    {
        path: 'userpreference-new',
        component: UserpreferencePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Userpreferences'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'userpreference/:id/edit',
        component: UserpreferencePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Userpreferences'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'userpreference/:id/delete',
        component: UserpreferenceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Userpreferences'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
