import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Userpreference } from './userpreference.model';
import { UserpreferencePopupService } from './userpreference-popup.service';
import { UserpreferenceService } from './userpreference.service';

@Component({
    selector: 'jhi-userpreference-delete-dialog',
    templateUrl: './userpreference-delete-dialog.component.html'
})
export class UserpreferenceDeleteDialogComponent {

    userpreference: Userpreference;

    constructor(
        private userpreferenceService: UserpreferenceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userpreferenceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'userpreferenceListModification',
                content: 'Deleted an userpreference'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-userpreference-delete-popup',
    template: ''
})
export class UserpreferenceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userpreferencePopupService: UserpreferencePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.userpreferencePopupService
                .open(UserpreferenceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
