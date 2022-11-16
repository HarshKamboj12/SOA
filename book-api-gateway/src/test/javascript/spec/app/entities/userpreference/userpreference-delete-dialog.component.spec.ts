/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { BookapigatewayTestModule } from '../../../test.module';
import { UserpreferenceDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/userpreference/userpreference-delete-dialog.component';
import { UserpreferenceService } from '../../../../../../main/webapp/app/entities/userpreference/userpreference.service';

describe('Component Tests', () => {

    describe('Userpreference Management Delete Component', () => {
        let comp: UserpreferenceDeleteDialogComponent;
        let fixture: ComponentFixture<UserpreferenceDeleteDialogComponent>;
        let service: UserpreferenceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BookapigatewayTestModule],
                declarations: [UserpreferenceDeleteDialogComponent],
                providers: [
                    UserpreferenceService
                ]
            })
            .overrideTemplate(UserpreferenceDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserpreferenceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserpreferenceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
