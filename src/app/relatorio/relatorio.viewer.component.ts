import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RelatorioService} from './relatorio.service';
import {LoaderService} from '../framework/loader/loader.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Relatorio} from './relatorio';
import {pt} from '../framework/constantes/calendarPt';
import {RelatorioParamsValue} from './relatorioParamsValue';
import {StringUtils} from '../framework/util/string.utils';
import {DateUtil} from '../framework/util/dateUtil';

@Component({
  selector: 'app-viewer-relatorio',
  templateUrl: './relatorio.viewer.component.html',
  styleUrls: ['./relatorio.viewer.component.css']
})
export class RelatorioViewerComponent implements OnInit {

  reportHTML: any;
  relatorioCurrent: Relatorio;
  dialogFiltroRelatorio = false;
  localePt: any;
  relatorioParamValue: RelatorioParamsValue[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private loaderService: LoaderService,
              private sanitizer: DomSanitizer,
              private relatorioService: RelatorioService) {
  }

  ngOnInit(): void {
    this.localePt = pt;
    this.route.params.subscribe(params => {
      if (params.id) {
        this.findDadosRelatorio(params.id);
      }
    });
  }

  back() {
    this.router.navigate(['relatorio']);
  }

  findDadosRelatorio(id: number) {
    this.relatorioService.findOne(id)
      .subscribe(e => {
        this.relatorioCurrent = e;
        if (this.relatorioCurrent.paramsList.length > 0) {
          this.openFiltro();
        } else {
          this.generateReport(id, null);
        }
      });
  }

  openFiltro() {
    this.dialogFiltroRelatorio = true;
    this.initValueDefaultFiltro();
  }

  generateReport(id: number, params: RelatorioParamsValue[]) {
    this.loaderService.display(true);
    const mapToSend: Map<string, any> = new Map<string, any>();
    mapToSend.set("idRel", id);
    mapToSend.set("params", params);

    const convMap = {};
    mapToSend.forEach((val: string, key: string) => {
      convMap[key] = val;
    });

    this.relatorioService.generateReport(convMap)
      .subscribe(e => {
        console.log(e);
        let file = new Blob([e], {type: 'application/pdf'});
        var fileURL = URL.createObjectURL(file);
        this.reportHTML = this.getSafeUrl(fileURL);
        this.loaderService.display(false);
      });
  }

  getSafeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  filtroIsValid() {
    let isValid = true;
    this.relatorioParamValue.forEach(value => {
      if (StringUtils.isBlank(value.valueParam)) {
        isValid = false;
      }
    });
    return isValid;
  }

  updateParamsValue(tipoFiltro: string, nameFiltro: string, valueFiltro: any) {
    console.log(tipoFiltro);
    this.relatorioParamValue.forEach(param => {
      if (param.nameParam === nameFiltro) {
        if (tipoFiltro === 'D') {
          param.valueParam = valueFiltro;
        } else if (tipoFiltro === 'S') {
          param.valueParam = valueFiltro;
        } else if (tipoFiltro === 'N') {
          if (valueFiltro === '') {
            param.valueParam = null;
          } else {
            param.valueParam = Number(valueFiltro);
          }
        }
      }
    });
  }

  onChangeValueParam($event: any, tipoFiltro: string, nameFiltro: string) {
    if (tipoFiltro !== 'D') {
      this.updateParamsValue(tipoFiltro, nameFiltro, $event.target.value);
    } else {
      this.updateParamsValue(tipoFiltro, nameFiltro, new Date($event).toLocaleDateString());
    }
  }

  initValueDefaultFiltro() {
    this.relatorioParamValue = new Array();
    this.relatorioCurrent.paramsList.forEach(param => {
      let valueParamFiltro = new RelatorioParamsValue();
      valueParamFiltro.nameParam = param.nameParam;
      this.relatorioParamValue.push(valueParamFiltro);
    });
  }

  filtrar() {
    this.generateReport(this.relatorioCurrent.id, this.relatorioParamValue);
    this.dialogFiltroRelatorio = false;
  }
}
