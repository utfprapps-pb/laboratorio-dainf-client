import {Component, OnInit, OnDestroy} from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import {DatePipe} from '@angular/common';
import {inject} from '@angular/core';
import {forkJoin, finalize} from 'rxjs';

import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {DashboardEmprestimoCountRange} from "./dashboard/dashboardEmprestimoCountRange";
import {HomeService} from "./home.service";
import {LoginService} from "../login/login.service";
import {DateUtil} from "../framework/util/dateUtil";
import {pt} from "../framework/constantes/calendarPt";
import {LoaderService} from "../framework/loader/loader.service";
import {environment} from "../../environments/environment";
import {getAlternatingColor} from "../framework/charts/chart-colors.config";

am4core.useTheme(am4themes_animated);

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  standalone: false
})
export class HomeComponent implements OnInit, OnDestroy {
  datepipe: DatePipe = inject(DatePipe);
  dashEmprestimoCount: DashboardEmprestimoCountRange;
  dialodFiltroData = false;
  dtIniFiltro: string;
  dtFimFiltro: string;
  localePt: any;
  private chartLineRef: am4charts.XYChart;
  private chartBarRef: am4charts.XYChart;
  private chartPie1Ref: am4charts.PieChart3D;
  private chartPie2Ref: am4charts.PieChart3D;
  showDashboardAluno = false;

  constructor(
    private homeService: HomeService,
    private loginService: LoginService,
    private loaderService: LoaderService
  ) {
    this.dashEmprestimoCount = new DashboardEmprestimoCountRange();
    this.localePt = pt;
  }

  ngOnInit() {
    this.loginService.userLoggedIsAlunoOrProfessor().then((value) => {
      this.showDashboardAluno = !!value;
      if (!this.showDashboardAluno) {
        this.buildDashboards();
      }
    });
  }

  ngOnDestroy() {
    this.disposeChart(this.chartLineRef);
    this.chartLineRef = null;
    this.disposeChart(this.chartBarRef);
    this.chartBarRef = null;
    this.disposeChart(this.chartPie1Ref);
    this.chartPie1Ref = null;
    this.disposeChart(this.chartPie2Ref);
    this.chartPie2Ref = null;
  }

  buildDashboards() {
    this.disposeCharts();
    const ini = this.getDateIni();
    const fim = this.getDateFim();
    const batch = forkJoin({
      count: this.homeService.findDadosEmprestimoCountInRange(ini, fim),
      byDay: this.homeService.findDadosEmprestimoByDayInRange(ini, fim),
      emprestados: this.homeService.findItensMaisEmprestados(ini, fim),
      adquiridos: this.homeService.findItensMaisAdquiridos(ini, fim),
      saidas: this.homeService.findItensMaisSaidas(ini, fim)
    });
    this.loaderService.show();
    batch.pipe(finalize(() => this.loaderService.hide())).subscribe(({
                                                                       count,
                                                                       byDay,
                                                                       emprestados,
                                                                       adquiridos,
                                                                       saidas
                                                                     }) => {
      this.dashEmprestimoCount = count;
      const byDayProcessed = this.processByDay(byDay, 'dtEmprestimo');
      this.createXYChartLine("chartdiv2", byDayProcessed, "_dtParsed", "qtde");
      const emprestadosTop = Array.isArray(emprestados)
        ? emprestados.sort((a, b) => (b?.qtde || 0) - (a?.qtde || 0)).slice(0, 10)
        : [];
      this.createXYChartBar("chartdiv4", emprestadosTop, "item", "qtde");
      this.createPieChart("chartdivPie1", adquiridos, "item", "qtde");
      this.createPieChart("chartdivPie2", saidas, "item", "qtde");
    });
  }

  private disposeChart(ref: any) {
    try {
      if (ref) {
        ref.dispose();
      }
    } catch { /* ignore */
    }
  }

  private disposeCharts() {
    this.disposeChart(this.chartLineRef);
    this.chartLineRef = null;
    this.disposeChart(this.chartBarRef);
    this.chartBarRef = null;
    this.disposeChart(this.chartPie1Ref);
    this.chartPie1Ref = null;
    this.disposeChart(this.chartPie2Ref);
    this.chartPie2Ref = null;
  }

  private processByDay(data: any[], dateField: string) {
    if (!Array.isArray(data)) {
      return [];
    }
    return data
      .map(d => {
        const raw = d[dateField];
        if (raw && typeof raw === 'string') {
          const parts = raw.split('/');
          if (parts.length === 3) {
            const [dd, mm, yyyy] = parts;
            const parsed = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
            return {...d, _dtParsed: parsed};
          }
        }
        return {...d, _dtParsed: new Date(d[dateField])};
      })
      .filter(d => !isNaN(d._dtParsed?.getTime?.()))
      .sort((a, b) => a._dtParsed.getTime() - b._dtParsed.getTime());
  }

  filtrar() {
    this.dialodFiltroData = false;
    localStorage.setItem("dash_dt_ini", this.dtIniFiltro);
    localStorage.setItem("dash_dt_fim", this.dtFimFiltro);
    this.dtIniFiltro = null;
    this.dtFimFiltro = null;
    this.buildDashboards();
  }

  getDateIni() {
    let dtIni = localStorage.getItem("dash_dt_ini");
    if (!dtIni) {
      dtIni = this.datepipe.transform(
        DateUtil.removeDays(new Date(), 90),
        "dd/MM/yyyy"
      );
      localStorage.setItem("dash_dt_ini", dtIni);
    }
    return dtIni;
  }

  getDateFim() {
    let dtFim = localStorage.getItem("dash_dt_fim");
    if (!dtFim) {
      dtFim = this.datepipe.transform(new Date(), "dd/MM/yyyy");
      localStorage.setItem("dash_dt_fim", dtFim);
    }
    return dtFim;
  }

  createPieChart(elementAppend, dados, nameField, nameValue) {
    if (elementAppend === 'chartdivPie1') {
      this.disposeChart(this.chartPie1Ref);
    }
    if (elementAppend === 'chartdivPie2') {
      this.disposeChart(this.chartPie2Ref);
    }

    const pieChart3D = am4core.create(elementAppend, am4charts.PieChart3D);
    pieChart3D.background.fill = am4core.color(environment.charts.colors.background);
    pieChart3D.hiddenState.properties.opacity = 0;

    pieChart3D.data = dados;

    const series = pieChart3D.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = nameValue;
    series.dataFields.category = nameField;

    // Usar função utilitária para cores alternadas
    series.slices.template.adapter.add("fill", (fill, target) => {
      if (target.dataItem && target.dataItem.index !== undefined) {
        const color = getAlternatingColor(target.dataItem.index, environment.charts.colors.pie.palette);
        return am4core.color(color);
      }
      return fill;
    });

    series.labels.template.disabled = true;
    series.ticks.template.disabled = true;

    series.slices.template.tooltipText = `{${nameField}}: {${nameValue}}`;
    series.slices.template.stroke = am4core.color(environment.charts.colors.background);
    series.slices.template.strokeWidth = 1;
    series.slices.template.strokeOpacity = 1;

    const sliceHover = series.slices.template.states.getKey('hover');
    if (sliceHover) {
      sliceHover.properties.scale = 1.05;
      sliceHover.properties.shiftRadius = 0.04;
    }

    pieChart3D.legend = new am4charts.Legend();
    pieChart3D.legend.position = 'bottom';
    pieChart3D.legend.useDefaultMarker = true;
    pieChart3D.legend.labels.template.maxWidth = 160;
    pieChart3D.legend.labels.template.truncate = false;
    pieChart3D.legend.labels.template.wrap = true;
    pieChart3D.legend.labels.template.fill = am4core.color(environment.charts.colors.text);
    pieChart3D.legend.valueLabels.template.disabled = true;
    pieChart3D.legend.itemContainers.template.tooltipText = '';

    // CORREÇÃO: Desabilitar completamente o comportamento de toggle/hide na legenda
    pieChart3D.legend.itemContainers.template.clickable = false;
    pieChart3D.legend.itemContainers.template.focusable = false;
    pieChart3D.legend.itemContainers.template.cursorOverStyle = am4core.MouseCursorStyle.default;

    // Desabilitar eventos de clique que poderiam ocultar fatias
    pieChart3D.legend.itemContainers.template.events.disableType("hit");

    // Aplicar cores na legenda usando função utilitária
    pieChart3D.legend.markers.template.adapter.add("fill", (fill, target) => {
      if (target.dataItem && target.dataItem.index !== undefined) {
        const color = getAlternatingColor(target.dataItem.index, environment.charts.colors.pie.palette);
        return am4core.color(color);
      }
      return fill;
    });

    // Manter apenas hover visual na legenda (sem funcionalidade de toggle)
    const setLegendHover = (ev: any, flag: boolean) => {
      const legendDataItem = ev.target.dataItem;
      if (!legendDataItem) return;

      const idx = legendDataItem.index;
      if (idx != null) {
        const slice = series.slices.getIndex(idx);
        if (slice) slice.isHover = flag;
      }
    };

    pieChart3D.legend.itemContainers.template.events.on('over', ev => setLegendHover(ev, true));
    pieChart3D.legend.itemContainers.template.events.on('out', ev => setLegendHover(ev, false));

    const count = Array.isArray(dados) ? dados.length : 0;
    if (count === 0) {
      const label = pieChart3D.chartContainer.createChild(am4core.Label);
      label.text = 'Sem dados';
      label.align = 'center';
      label.isMeasured = false;
      label.y = am4core.percent(50);
      label.fill = am4core.color(environment.charts.colors.text);
    }

    if (elementAppend === 'chartdivPie1') {
      this.chartPie1Ref = pieChart3D;
    }
    if (elementAppend === 'chartdivPie2') {
      this.chartPie2Ref = pieChart3D;
    }
  }

  createXYChartBar(elementAppend, dados, nameField, nameValue) {
    this.disposeChart(this.chartBarRef);
    const xyChart = am4core.create(elementAppend, am4charts.XYChart);
    xyChart.background.fill = am4core.color(environment.charts.colors.background);

    // Ordenar dados por quantidade (maior para menor) para aplicar cores consistentes
    const sortedData = Array.isArray(dados) ? [...dados].sort((a, b) => (b[nameValue] || 0) - (a[nameValue] || 0)) : [];

    xyChart.scrollbarX = new am4core.Scrollbar();
    xyChart.data = sortedData;

    const categoryAxis = xyChart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = nameField;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "middle";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.labels.template.truncate = true;
    categoryAxis.renderer.labels.template.maxWidth = 120;
    categoryAxis.renderer.labels.template.fill = am4core.color(environment.charts.colors.text);

    const isSmallScreen = window && window.innerWidth < 640;

    if (elementAppend === 'chartdiv4') {
      if (!isSmallScreen) {
        categoryAxis.renderer.labels.template.truncate = false;
        categoryAxis.renderer.labels.template.wrap = true;
        categoryAxis.renderer.minGridDistance = 20;
        xyChart.paddingBottom = 30;
        categoryAxis.renderer.labels.template.adapter.add('dy', (dy, target: any) => {
          const index = target.dataItem && target.dataItem.index;
          if (index == null) {
            return dy;
          }
          return (index % 2 === 0) ? 0 : 18;
        });
        categoryAxis.renderer.labels.template.tooltipText = `{${nameField}}`;
      } else {
        categoryAxis.renderer.labels.template.disabled = true;
        xyChart.paddingBottom = 10;
      }
    }

    const valueAxis = xyChart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;
    valueAxis.renderer.labels.template.fill = am4core.color(environment.charts.colors.text);

    const series = xyChart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = nameValue;
    series.dataFields.categoryX = nameField;
    series.tooltipText = isSmallScreen ? "{categoryX}: {valueY}" : "[{categoryX}: bold]{categoryX}: {valueY}[/]";
    series.columns.template.strokeWidth = 0;
    series.tooltip.pointerOrientation = "vertical";
    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

    const hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    // Usar função utilitária para cores alternadas
    series.columns.template.adapter.add("fill", (fill, target) => {
      if (target.dataItem && target.dataItem.index !== undefined) {
        const color = getAlternatingColor(target.dataItem.index, environment.charts.colors.bar.palette);
        return am4core.color(color);
      }
      return fill;
    });

    xyChart.cursor = new am4charts.XYCursor();
    this.chartBarRef = xyChart;
  }

  createXYChartLine(elementAppend, dados, dateX, valueY) {
    this.disposeChart(this.chartLineRef);
    const chartLine = am4core.create(elementAppend, am4charts.XYChart);
    chartLine.background.fill = am4core.color(environment.charts.colors.background);
    chartLine.data = dados;
    const dateAxis = chartLine.xAxes.push(new am4charts.DateAxis());
    dateAxis.baseInterval = {timeUnit: 'day', count: 1};
    dateAxis.skipEmptyPeriods = true;
    dateAxis.renderer.labels.template.fill = am4core.color(environment.charts.colors.text);
    dateAxis.renderer.grid.template.stroke = am4core.color(environment.charts.colors.gridLines);
    const valueAxis = chartLine.yAxes.push(new am4charts.ValueAxis());

    valueAxis.renderer.labels.template.fill = am4core.color(environment.charts.colors.text);
    valueAxis.renderer.grid.template.stroke = am4core.color(environment.charts.colors.gridLines);

    const series = chartLine.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = valueY;
    series.dataFields.dateX = dateX;
    series.tooltipText = "{valueY}";
    series.strokeWidth = 2;
    series.stroke = am4core.color(environment.charts.colors.line.stroke);
    series.fill = am4core.color(environment.charts.colors.line.fill);
    series.minBulletDistance = 15;
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.background.fill = am4core.color(environment.charts.colors.tooltip.background);
    series.tooltip.label.fill = am4core.color(environment.charts.colors.tooltip.text);
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";

    const bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color(environment.charts.colors.background);
    bullet.circle.stroke = am4core.color(environment.charts.colors.line.stroke);

    const bullethover = bullet.states.create("hover");
    bullethover.properties.scale = 1.3;

    chartLine.cursor = new am4charts.XYCursor();
    chartLine.cursor.behavior = "panXY";
    chartLine.cursor.xAxis = dateAxis;
    chartLine.cursor.snapToSeries = series;
    chartLine.scrollbarY = new am4core.Scrollbar();
    chartLine.scrollbarY.parent = chartLine.leftAxesContainer;
    chartLine.scrollbarY.toBack();
    chartLine.scrollbarX = new am4charts.XYChartScrollbar();
    (chartLine.scrollbarX as am4charts.XYChartScrollbar).series.push(series);
    chartLine.scrollbarX.parent = chartLine.bottomAxesContainer;
    this.chartLineRef = chartLine;
  }

  disableBtnFiltrar() {
    return (
      this.dtIniFiltro == null ||
      this.dtIniFiltro === "" ||
      this.dtFimFiltro == null ||
      this.dtFimFiltro === ""
    );
  }
}
