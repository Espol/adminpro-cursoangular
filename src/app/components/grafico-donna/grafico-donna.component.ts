import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-donna',
  templateUrl: './grafico-donna.component.html',
  styleUrls: []
})
export class GraficoDonnaComponent implements OnInit {

  @Input() chartLabels: Label[] = [];
  @Input() chartData: MultiDataSet = [];
  @Input() chartType: ChartType = '';

  constructor() { }

  ngOnInit() {
  }

}
