import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  // Emite estado de loading. Subject simples para manter comportamento existente (sem valor inicial)
  private subjectDisplay: Subject<boolean> = new Subject<boolean>();

  // Observable público (nova convenção)
  loading$: Observable<boolean> = this.subjectDisplay.asObservable();

  // Mantém compatibilidade com código existente
  display(display: boolean): void {
    this.subjectDisplay.next(display);
  }

  // Alias legíveis usados em alguns componentes
  show(): void { this.display(true); }
  hide(): void { this.display(false); }

  // Metodo legado ainda utilizado em partes do código
  observableDisplay(): Observable<boolean> {
    return this.loading$;
  }

  // Novo metodo utilitário para envolver observables e controlar loading automaticamente
  track<T>(obs: Observable<T>): Observable<T> {
    this.show();
    return obs.pipe(finalize(() => this.hide()));
  }
}
