import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {DashboardEmprestimoCountRange} from './dashboard/dashboardEmprestimoCountRange';
import {DashboardEmprestimoDia} from './dashboard/dashboardEmprestimoDia';
import {DashboardItensEmprestados} from './dashboard/dashboardItensEmprestados';
import {DashboardItensAdquiridos} from './dashboard/dashboardItensAdquiridos';
import {DashboardItensSaidas} from './dashboard/dashboardItensSaidas';

@Injectable()
export class HomeService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.api_url}dashboard/`;
  }

  findDadosEmprestimoCountInRange(dtIni: string, dtFim: string): Observable<DashboardEmprestimoCountRange> {
    return this.http.get<DashboardEmprestimoCountRange>(`${this.url}emprestimo-count-range?dtIni=${dtIni}&dtFim=${dtFim}`);
  }

  findDadosEmprestimoByDayInRange(dtIni: string, dtFim: string): Observable<DashboardEmprestimoDia[]> {
    return this.http.get<DashboardEmprestimoDia[]>(`${this.url}emprestimo-count-day-range?dtIni=${dtIni}&dtFim=${dtFim}`);
  }

  findItensMaisEmprestados(dtIni: string, dtFim: string): Observable<DashboardItensEmprestados[]> {
    return this.http.get<DashboardItensEmprestados[]>(`${this.url}itens-mais-emprestados?dtIni=${dtIni}&dtFim=${dtFim}`);
  }

  findItensMaisAdquiridos(dtIni: string, dtFim: string): Observable<DashboardItensAdquiridos[]> {
    return this.http.get<DashboardItensAdquiridos[]>(`${this.url}itens-mais-adquiridos?dtIni=${dtIni}&dtFim=${dtFim}`);
  }

  findItensMaisSaidas(dtIni: string, dtFim: string): Observable<DashboardItensSaidas[]> {
    return this.http.get<DashboardItensSaidas[]>(`${this.url}itens-mais-saidas?dtIni=${dtIni}&dtFim=${dtFim}`);
  }
}
