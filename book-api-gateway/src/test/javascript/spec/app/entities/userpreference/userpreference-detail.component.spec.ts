/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { BookapigatewayTestModule } from '../../../test.module';
import { UserpreferenceDetailComponent } from '../../../../../../main/webapp/app/entities/userpreference/userpreference-detail.component';
import { UserpreferenceService } from '../../../../../../main/webapp/app/entities/userpreference/userpreference.service';
import { Userpreference } from '../../../../../../main/webapp/app/entities/userpreference/userpreference.model';

describe('Component Tests', () => {

    describe('Userpreference Management Detail Component', () => {
        let comp: UserpreferenceDetailComponent;
        let fixture: ComponentFixture<UserpreferenceDetailComponent>;
        let service: UserpreferenceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BookapigatewayTestModule],
                declarations: [UserpreferenceDetailComponent],
                providers: [
                    UserpreferenceService
                ]
            })
            .overrideTemplate(UserpreferenceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserpreferenceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserpreferenceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Userpreference(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.userpreference).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
