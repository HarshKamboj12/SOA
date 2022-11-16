/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { BookapigatewayTestModule } from '../../../test.module';
import { BookpictureComponent } from '../../../../../../main/webapp/app/entities/bookpicture/bookpicture.component';
import { BookpictureService } from '../../../../../../main/webapp/app/entities/bookpicture/bookpicture.service';
import { Bookpicture } from '../../../../../../main/webapp/app/entities/bookpicture/bookpicture.model';

describe('Component Tests', () => {

    describe('Bookpicture Management Component', () => {
        let comp: BookpictureComponent;
        let fixture: ComponentFixture<BookpictureComponent>;
        let service: BookpictureService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BookapigatewayTestModule],
                declarations: [BookpictureComponent],
                providers: [
                    BookpictureService
                ]
            })
            .overrideTemplate(BookpictureComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BookpictureComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BookpictureService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Bookpicture(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.bookpictures[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
