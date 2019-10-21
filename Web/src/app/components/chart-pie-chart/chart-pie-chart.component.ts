import { Component, OnInit, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ProdutosService } from 'src/app/services/produtos.service';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-chart-pie-chart',
  templateUrl: './chart-pie-chart.component.html',
  styleUrls: ['./chart-pie-chart.component.scss']
})
export class ChartPieChartComponent implements OnInit {
  dat: any = {};
  dados = [];
  constructor(private zone: NgZone, private prod: ProdutosService) {
   

  }
  private chart: am4charts.XYChart;

  ngOnInit() {
  }

  async produtosMercado() {

  }

  async ngAfterViewInit() {
    
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv2", am4charts.PieChart3D);
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
      chart.data = this.dat;
      chart.data = [
        {
          country: "Lithuania",
          litres: 501.9
        },
        {
          country: "Czech Republic",
          litres: 301.9
        },
        {
          country: "Ireland",
          litres: 201.1
        },
        {
          country: "Germany",
          litres: 165.8
        },
        {
          country: "Australia",
          litres: 139.9
        },
        {
          country: "Austria",
          litres: 128.3
        }
      ];

      chart.innerRadius = am4core.percent(40);
      chart.depth = 120;

      chart.legend = new am4charts.Legend();

      let series = chart.series.push(new am4charts.PieSeries3D());
      series.dataFields.value = "litres";
      series.dataFields.depthValue = "litres";
      series.dataFields.category = "country";
      series.slices.template.cornerRadius = 5;
      series.colors.step = 3;
    });
  }

}
