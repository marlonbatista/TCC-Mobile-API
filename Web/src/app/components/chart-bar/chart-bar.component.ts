import { Component, OnInit, NgZone } from '@angular/core';
/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ProdutosService } from 'src/app/services/produtos.service';
// import am4themes_dark from "@amcharts/amcharts4/themes/dark.js";

/* Chart code */
// Themes begin
// am4core.useTheme(am4themes_dark);  
am4core.useTheme(am4themes_animated);
// Themes end
@Component({
  selector: 'app-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.scss']
})
export class ChartBarComponent implements OnInit {
  dat: any = {};
  dados = [];
  constructor(private zone: NgZone,private prod: ProdutosService) { 
    this.dat,
    this.dados = [];
  }
  private chart: am4charts.XYChart;
  ngOnInit() {
  }
  async ngAfterViewInit() {
    let mercado_id = JSON.parse(localStorage.getItem('getmestres:mercado'))
    console.log(mercado_id.id)
    let produtos = await this.prod.pegaProd(mercado_id.id)
    if (produtos.success) {

      this.dat = produtos.data.map(e => {
        return { name: e.name, estoque: e.estoque }
      })
    }
    console.log(this.dat);
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);
      chart.hiddenState.properties.opacity = 0;
      chart.paddingRight = 20;
      chart.data = this.dat;
      
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.dataFields.category = "name";
      categoryAxis.renderer.minGridDistance = 40;
      categoryAxis.fontSize = 15;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
      valueAxis.max = 10000000;
      valueAxis.strictMinMax = true;
      valueAxis.renderer.minGridDistance = 30;
      // axis break
      let axisBreak = valueAxis.axisBreaks.create();
      axisBreak.startValue = 50000;
      axisBreak.endValue = 800000;
      axisBreak.breakSize = 0.005;

      // make break expand on hover
      let hoverState = axisBreak.states.create("hover");
      hoverState.properties.breakSize = 1;
      hoverState.properties.opacity = 0.1;
      hoverState.transitionDuration = 1500;

      axisBreak.defaultState.transitionDuration = 1000;
      /*
      // this is exactly the same, but with events
      axisBreak.events.on("over", function() {
        axisBreak.animate(
          [{ property: "breakSize", to: 1 }, { property: "opacity", to: 0.1 }],
          1500,
          am4core.ease.sinOut
        );
      });
      axisBreak.events.on("out", function() {
        axisBreak.animate(
          [{ property: "breakSize", to: 0.005 }, { property: "opacity", to: 1 }],
          1000,
          am4core.ease.quadOut
        );
      });*/

      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.categoryX = "name";
      series.dataFields.valueY = "estoque";
      series.columns.template.tooltipText = "{valueY.value}";
      series.columns.template.tooltipY = 0;
      series.columns.template.strokeOpacity = 0;

      // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
      series.columns.template.adapter.add("fill", function (fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
      });

      // let data = [];
      let visits = 10;

      // for (let i = 1; i < 366; i++) {
      //   visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      //   data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
      // }

      // chart.data = data;

      // let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      // dateAxis.renderer.grid.template.location = 0;

      // let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      // valueAxis.tooltip.disabled = true;
      // valueAxis.renderer.minWidth = 35;

      // let series = chart.series.push(new am4charts.LineSeries());
      // series.dataFields.dateX = "date";
      // series.dataFields.valueY = "value";

      // series.tooltipText = "{valueY.value}";
      // chart.cursor = new am4charts.XYCursor();

      // let scrollbarX = new am4charts.XYChartScrollbar();
      // scrollbarX.series.push(series);
      // chart.scrollbarX = scrollbarX;

      // this.chart = chart;

    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
// Now you can run npm start again





