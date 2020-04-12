import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class SidenavService {

  private subject: Subject<boolean> = new Subject();

  minimizar(minimizar: boolean): void {
    this.subject.next(minimizar);
  }

  observable(): Observable<boolean> {
    return this.subject.asObservable();
  }
}
