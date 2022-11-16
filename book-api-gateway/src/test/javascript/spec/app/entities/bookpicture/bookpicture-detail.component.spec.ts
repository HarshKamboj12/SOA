/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { BookapigatewayTestModule } from '../../../test.module';
import { BookpictureDetailComponent } from '../../../../../../main/webapp/app/entities/bookpicture/bookpicture-detail.component';
import { BookpictureService } from '../../../../../../main/webapp/app/entities/bookpicture/bookpicture.service';
import { Bookpicture } from '../../../../../../main/webapp/app/entities/bookpicture/bookpicture.model';

describe('Component Tests', () => {

    describe('Bookpicture Management Detail Component', () => {
        let comp: BookpictureDetailComponent;
        let fixture: ComponentFixture<BookpictureDetailComponent>;
        let service: BookpictureService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BookapigatewayTestModule],
                declarations: [BookpictureDetailComponent],
                providers: [
                    BookpictureService
                ]
            })
            .overrideTemplate(BookpictureDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BookpictureDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BookpictureService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Bookpicture(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bookpicture).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
