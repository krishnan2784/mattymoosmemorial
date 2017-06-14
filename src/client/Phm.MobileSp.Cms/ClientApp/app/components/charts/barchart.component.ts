import { Component, OnInit, Input, ViewChild } from '@angular/core';
import Chartclasses = require("../../models/chartclasses");
import BarChartData = Chartclasses.BarChartData;
declare var d3: any;

@Component({
    selector: 'barchart',
    template: require('./barchart.component.html'),
    styles: [require('./barchart.component.css')]
})
export class BarChart implements OnInit {

    @Input()
    private chartData: BarChartData;
    
    @ViewChild('barChart')
    barChartElement;


    constructor() {

    }

    ngOnInit() {
        this.initChart();
    }

    private initChart() {
        let chartData = this.chartData;
        let barData = chartData.chartData;
        var vis = d3.select(this.barChartElement.nativeElement),
            width = chartData.width,
            height = chartData.height,
            margins = {
                top: chartData.margins.top,
                right: chartData.margins.right,
                bottom: chartData.margins.bottom,
                left: chartData.margins.left
            },
            xRange = d3.scale.ordinal().rangeRoundBands([margins.left, width - margins.right], 0.1)
                .domain(barData.map((d) => {
                return d.x;
            })),


            yRange = d3.scale.linear().range([height - margins.top, margins.bottom]).domain([0,
                d3.max(barData, (d) => {
                    return d.y;
                })
            ]),

            xAxis = d3.svg.axis()
                .scale(xRange)
                .tickSize(5)
                .tickSubdivide(true),

            yAxis = d3.svg.axis()
                .scale(yRange)
                .tickSize(5)
                .orient("left")
                .tickSubdivide(true);


        vis.append('svg:g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + (height - margins.bottom) + ')')
            .call(xAxis);

        vis.append('svg:g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(' + (margins.left) + ',0)')
            .call(yAxis);

        vis.selectAll('rect')
            .data(barData)
            .enter()
            .append('rect')
            .attr('x', (d) => {
                return xRange(d.x);
            })
            .attr('y', (d) => {
                return yRange(d.y);
            })
            .attr('width', xRange.rangeBand())
            .attr('height', (d) => {
                return ((height - margins.bottom) - yRange(d.y));
            })
            .attr('fill', 'grey')
            .on('mouseover', function (d) {
                d3.select(this)
                    .attr('fill', 'blue');
            })
            .on('mouseout', function (d) {
                d3.select(this)
                    .attr('fill', 'grey');
            });
    }

}