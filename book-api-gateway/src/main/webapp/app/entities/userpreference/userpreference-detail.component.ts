import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Userpreference } from './userpreference.model';
import { UserpreferenceService } from './userpreference.service';

@Component({
    selector: 'jhi-userpreference-detail',
    templateUrl: './userpreference-detail.component.html'
})
export class UserpreferenceDetailComponent implements OnInit, OnDestroy {

    userpreference: Userpreference;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private userpreferenceService: UserpreferenceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUserpreferences();
    }

    load(id) {
        this.userpreferenceService.find(id).subscribe((userpreference) => {
            this.userpreference = userpreference;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUserpreferences() {
        this.eventSubscriber = this.eventManager.subscribe(
            'userpreferenceListModification',
            (response) => this.load(this.userpreference.id)
        );
    }
}
