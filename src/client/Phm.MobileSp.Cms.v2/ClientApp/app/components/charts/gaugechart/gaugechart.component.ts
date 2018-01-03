import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import {GaugeChartData} from "../../../models/chartclasses";

declare var c3;

@Component({
    selector: 'gaugechart',
    template: require('./gaugechart.component.html'),
    styles: [require('./gaugechart.component.css')]
})
export class GaugeChart implements OnInit, AfterViewInit {
    @Input()
    public id: string;
    @Input()
    public chartData: GaugeChartData;

    private chart;

    constructor() {
    }

    ngOnInit() {
        if (!this.id)
            this.id = 'chart_' + this.chartData.title.replace(' ', '_');
    }

    ngAfterViewInit() {
         var columns = this.chartData.chartData.map((d) => {
            return [d.name, d.data];
        });

        this.chart = c3.generate({
            bindto:  '#' + this.id,
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
                type: 'gauge',
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
            gauge: {
                label: {
                    format: (value, ratio) => {
                        return this.chartData.title;
                    },
                    show: this.chartData.showMinMaxLabels 
                },
                min: this.chartData.min, 
                max: this.chartData.max, 
                units: ' ' + this.chartData.units,
                width: this.chartData.arcThickness
            },
            tooltip: {
                show: this.chartData.showTooltip,
                format: {
                    title: '',
                    name: (name, ratio, id, index) => { return id; },
                    value: (name, ratio, id, index) => { return ratio * 100 + '%'; }
                }
            }
            //color: {
            //    pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
            //    threshold: {
            //        //            unit: 'value', // percentage is default
            //        //            max: 200, // 100 is default
            //        values: [30, 60, 90, 100]
            //    }
            //},
        });
    }


    
}
