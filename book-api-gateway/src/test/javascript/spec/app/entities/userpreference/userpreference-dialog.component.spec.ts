/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { BookapigatewayTestModule } from '../../../test.module';
import { UserpreferenceDialogComponent } from '../../../../../../main/webapp/app/entities/userpreference/userpreference-dialog.component';
import { UserpreferenceService } from '../../../../../../main/webapp/app/entities/userpreference/userpreference.service';
import { Userpreference } from '../../../../../../main/webapp/app/entities/userpreference/userpreference.model';

describe('Component Tests', () => {

    describe('Userpreference Management Dialog Component', () => {
        let comp: UserpreferenceDialogComponent;
        let fixture: ComponentFixture<UserpreferenceDialogComponent>;
        let service: UserpreferenceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BookapigatewayTestModule],
                declarations: [UserpreferenceDialogComponent],
                providers: [
                    UserpreferenceService
                ]
            })
            .overrideTemplate(UserpreferenceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserpreferenceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserpreferenceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Userpreference(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.userpreference = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'userpreferenceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Userpreference();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.userpreference = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'userpreferenceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
