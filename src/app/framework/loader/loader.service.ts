import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class LoaderService {

  private subjectDisplay: Subject<boolean> = new Subject();

  display(display: boolean): void {
    this.subjectDisplay.next(display);
  }

  observableDisplay(): Observable<boolean> {
    return this.subjectDisplay.asObservable();
  }

}
