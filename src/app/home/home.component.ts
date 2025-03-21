import { Component, OnInit } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { DatePipe } from "@angular/common";

import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { DashboardEmprestimoCountRange } from "./dashboard/dashboardEmprestimoCountRange";
import { HomeService } from "./home.service";
import { LoginService } from "../login/login.service";
import { DateUtil } from "../framework/util/dateUtil";
import { pt } from "../framework/constantes/calendarPt";
import { Subject } from "rxjs/internal/Subject";
import { LoaderService } from "../framework/loader/loader.service";

am4core.useTheme(am4themes_animated);

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  datepipe: DatePipe = new DatePipe("pt-BR");
  dashEmprestimoCount: DashboardEmprestimoCountRange;
  dialodFiltroData = false;
  dtIniFiltro: string;
  dtFimFiltro: string;
  localePt: any;
  count: Subject<number> = new Subject();
  countAux = 0;

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
      if (!value) {
        document.getElementById("container-dashboard").style.display = "block";
        document.getElementById("container-dashboard-aluno").style.display =
          "none";
        this.buildDashboards();
      } else {
        document.getElementById("container-dashboard").style.display = "none";
        document.getElementById("container-dashboard-aluno").style.display =
          "block";
      }
    });
  }

  buildDashboards() {
    try {
      let dtIni = localStorage.getItem("dash_dt_ini");
      let dtFim = localStorage.getItem("dash_dt_fim");
      if (dtIni != null && dtFim != null) {
        this.loaderService.display(true);
        this.findCountEmprestimoDashboard();
        this.findEmprestimoByDayDashboard();
        this.findItensMaisEmprestados();
        this.findItensMaisAdquiridos();
        this.findItensMaisSaidas();
        this.count.asObservable().subscribe(
          (value) => {
            this.loaderService.display(false);
            if (value === 5) {
              this.countAux = 0;
              this.count.next(this.countAux);
            }
          },
          (error) => {
            this.loaderService.display(false);
          }
        );
      }
    } catch (error) {
      this.loaderService.display(false);
    }
  }

  filtrar() {
    this.dialodFiltroData = false;
    localStorage.setItem("dash_dt_ini", this.dtIniFiltro);
    localStorage.setItem("dash_dt_fim", this.dtFimFiltro);
    this.dtIniFiltro = null;
    this.dtFimFiltro = null;
    this.buildDashboards();
  }

  findCountEmprestimoDashboard() {
    this.homeService
      .findDadosEmprestimoCountInRange(this.getDateIni(), this.getDateFim())
      .subscribe((e) => {
        this.dashEmprestimoCount = e;
        this.countAux++;
        this.count.next(this.countAux);
      });
  }

  findEmprestimoByDayDashboard() {
    this.homeService
      .findDadosEmprestimoByDayInRange(this.getDateIni(), this.getDateFim())
      .subscribe((dados) => {
        this.createXYChartLine("chartdiv2", dados, "dtEmprestimo", "qtde");
        this.countAux++;
        this.count.next(this.countAux);
      });
  }

  findItensMaisEmprestados() {
    this.homeService
      .findItensMaisEmprestados(this.getDateIni(), this.getDateFim())
      .subscribe((dados) => {
        this.createXYChartBar("chartdiv4", dados, "item", "qtde");
        this.countAux++;
        this.count.next(this.countAux);
      });
  }

  findItensMaisAdquiridos() {
    this.homeService
      .findItensMaisAdquiridos(this.getDateIni(), this.getDateFim())
      .subscribe((dados) => {
        this.createPieChart("chartdivPie1", dados, "item", "qtde");
        this.countAux++;
        this.count.next(this.countAux);
      });
  }

  findItensMaisSaidas() {
    this.homeService
      .findItensMaisSaidas(this.getDateIni(), this.getDateFim())
      .subscribe((dados) => {
        this.createPieChart("chartdivPie2", dados, "item", "qtde");
        this.countAux++;
        this.count.next(this.countAux);
      });
  }

  getDateIni() {
    let dtIni = localStorage.getItem("dash_dt_ini");
    if (!dtIni) {
      // dtIni = this.datepipe.transform(
      //   DateUtil.removeDays(new Date(), 90).toLocaleDateString(),
      //   "dd/MM/yyyy"
      // );
      // dtIni = this.datepipe.transform(
      //   new Date().toLocaleDateString(),
      //   "dd/MM/yyyy"
      // );
      // localStorage.setItem("dash_dt_ini", dtIni);
    }
    return dtIni;
  }

  getDateFim() {
    let dtFim = localStorage.getItem("dash_dt_fim");
    if (!dtFim) {
      // dtFim = this.datepipe.transform(
      //   new Date().toLocaleDateString(),
      //   "dd/MM/yyyy"
      // );
      // localStorage.setItem("dash_dt_fim", dtFim);
    }
    return dtFim;
  }

  createPieChart(elementAppend, dados, nameField, nameValue) {
    const pieChart3D = am4core.create(elementAppend, am4charts.PieChart3D);
    pieChart3D.hiddenState.properties.opacity = 0;
    pieChart3D.legend = new am4charts.Legend();
    pieChart3D.legend.useDefaultMarker = false;
    pieChart3D.legend.position = "right";
    pieChart3D.legend.labels.template.maxWidth = 100;
    pieChart3D.data = dados;

    const series = pieChart3D.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = nameValue;
    series.dataFields.category = nameField;
    series.labels.template.maxWidth = 100;
    series.labels.template.truncate = true;
  }

  createXYChartBar(elementAppend, dados, nameField, nameValue) {
    const xyChart = am4core.create(elementAppend, am4charts.XYChart);
    xyChart.scrollbarX = new am4core.Scrollbar();
    xyChart.data = dados;

    const categoryAxis = xyChart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = nameField;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "middle";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.tooltip.disabled = true;

    categoryAxis.renderer.labels.template.truncate = true;
    categoryAxis.renderer.labels.template.maxWidth = 120;

    const valueAxis = xyChart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;

    const series = xyChart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = nameValue;
    series.dataFields.categoryX = nameField;
    series.tooltipText = "[{categoryX}: bold]{categoryX}: {valueY}[/]";
    series.columns.template.strokeWidth = 0;
    series.tooltip.pointerOrientation = "vertical";
    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

    const hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add("fill", (fill, target) => {
      return xyChart.colors.getIndex(target.dataItem.index);
    });
    xyChart.cursor = new am4charts.XYCursor();
  }

  createXYChartLine(elementAppend, dados, dateX, valueY) {
    const chartLine = am4core.create(elementAppend, am4charts.XYChart);
    chartLine.data = dados;
    //chartLine.dateFormatter.inputDateFormat = 'dd-MM-yyyy';

    const dateAxis = chartLine.xAxes.push(new am4charts.DateAxis());
    const valueAxis = chartLine.yAxes.push(new am4charts.ValueAxis());

    const series = chartLine.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = valueY;
    series.dataFields.dateX = dateX;
    series.tooltipText = "{value}";
    series.strokeWidth = 2;
    series.minBulletDistance = 15;
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";

    const bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color("#fff");

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
