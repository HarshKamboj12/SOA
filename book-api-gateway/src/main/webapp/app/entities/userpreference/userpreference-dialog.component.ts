import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Userpreference } from './userpreference.model';
import { UserpreferencePopupService } from './userpreference-popup.service';
import { UserpreferenceService } from './userpreference.service';

@Component({
    selector: 'jhi-userpreference-dialog',
    templateUrl: './userpreference-dialog.component.html'
})
export class UserpreferenceDialogComponent implements OnInit {

    userpreference: Userpreference;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private userpreferenceService: UserpreferenceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.userpreference.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userpreferenceService.update(this.userpreference));
        } else {
            this.subscribeToSaveResponse(
                this.userpreferenceService.create(this.userpreference));
        }
    }

    private subscribeToSaveResponse(result: Observable<Userpreference>) {
        result.subscribe((res: Userpreference) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Userpreference) {
        this.eventManager.broadcast({ name: 'userpreferenceListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-userpreference-popup',
    template: ''
})
export class UserpreferencePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userpreferencePopupService: UserpreferencePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.userpreferencePopupService
                    .open(UserpreferenceDialogComponent as Component, params['id']);
            } else {
                this.userpreferencePopupService
                    .open(UserpreferenceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
