/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { BookapigatewayTestModule } from '../../../test.module';
import { UserpreferenceComponent } from '../../../../../../main/webapp/app/entities/userpreference/userpreference.component';
import { UserpreferenceService } from '../../../../../../main/webapp/app/entities/userpreference/userpreference.service';
import { Userpreference } from '../../../../../../main/webapp/app/entities/userpreference/userpreference.model';

describe('Component Tests', () => {

    describe('Userpreference Management Component', () => {
        let comp: UserpreferenceComponent;
        let fixture: ComponentFixture<UserpreferenceComponent>;
        let service: UserpreferenceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BookapigatewayTestModule],
                declarations: [UserpreferenceComponent],
                providers: [
                    UserpreferenceService
                ]
            })
            .overrideTemplate(UserpreferenceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserpreferenceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserpreferenceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Userpreference(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.userpreferences[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
