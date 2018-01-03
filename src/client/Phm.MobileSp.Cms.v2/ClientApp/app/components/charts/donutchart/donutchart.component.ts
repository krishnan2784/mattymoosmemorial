import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import {DonutChartData} from "../../../models/chartclasses";

declare var c3;

@Component({
    selector: 'donutchart',
    template: require('./donutchart.component.html'),
    styles: [require('./donutchart.component.css')]
})
export class DonutChart implements OnInit, AfterViewInit {
    @Input()
    public id: string;
    @Input()
    public chartData: DonutChartData;

    private chart;

    constructor() {
    }

    ngOnInit() {
        if (!this.id)
            this.id = 'chart_' + this.chartData.title.replace(' ', '_');
    }

    ngAfterViewInit() {
        var columns = this.chartData.chartData.map((d) => {
            return [d.name].concat(d.data.map((data) => { return data.toString() }));
        });

        this.chart = c3.generate({
            bindto: '#' + this.id,
            size: {
                height: this.chartData.height,
                width: this.chartData.width
            },
            padding: {
                top: this.chartData.margin.top,
                bottom: this.chartData.margin.bottom,
                left: this.chartData.margin.left,
                right: this.chartData.margin.right
            },
            data: {
                columns: columns,
                type: 'donut',
                onclick: (d, i) => {  },
                onmouseover: (d, i) => {  },
                onmouseout: (d, i) => {  },
                color: (color, d) => {
                    var name = '';
                    if (d.id) {
                        name = d.id;
                    } else
                        name = d;
                    if (name === 'baseData')
                        return '#DFDFDF';
                    if (this.chartData &&
                        this.chartData.chartData &&
                        this.chartData.chartData.filter(x => x.name === name).length > 0) {
                        if (this.chartData.chartData.filter(x => x.name === name)[0].colour !== '')
                            return this.chartData.chartData.filter(x => x.name === name)[0].colour;
                    }
                    return color;
                }
            },
            donut: {
                title: this.chartData.title,
                width: this.chartData.donutThickness,
                label: {
                    show: false
                }
            },
            legend: {
                show: this.chartData.showLegend,
                //inset: {
                //    anchor: 'top-left',
                //    x: 20,
                //    y: 10
                //},
                item: {
                    onclick: (id) => { }
                }
            },
            tooltip: {
                show: this.chartData.showTooltip
            }
        });
    }


    
}
