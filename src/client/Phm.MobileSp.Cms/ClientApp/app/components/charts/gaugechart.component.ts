import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import Chartclasses = require("../../models/chartclasses");
import GaugeChartData = Chartclasses.GaugeChartData;

import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
declare var c3;

@Component({
    selector: 'gaugechart',
    template: require('./gaugechart.component.html'),
    styles: [require('./gaugechart.component.css')]
})
export class GaugeChart implements OnInit, AfterViewChecked {
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

    ngAfterViewChecked() {
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
                onclick: (d, i) => { console.log("onclick", d, i); },
                onmouseover: (d, i) => { console.log("onmouseover", d, i); },
                onmouseout: (d, i) => { console.log("onmouseout", d, i); },
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
                        return value;
                    },
                    show: this.chartData.showMinMaxLabels 
                },
                min: this.chartData.min, 
                max: this.chartData.max, 
                units: ' ' + this.chartData.units,
                width: this.chartData.arcThickness
            }
            //color: {
            //    pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
            //    threshold: {
            //        //            unit: 'value', // percentage is default
            //        //            max: 200, // 100 is default
            //        values: [30, 60, 90, 100]
            //    }
            //},
            //tooltip: {
            //    format: {
            //        title: (d) => { return this. + ': ' + d; }
            //    }
            //}
        });
    }


    
}