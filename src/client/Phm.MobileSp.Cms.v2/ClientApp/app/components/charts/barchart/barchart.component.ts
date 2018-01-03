import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import {BarChartData} from "../../../models/chartclasses";

declare var c3;

@Component({
    selector: 'barchart',
    template: require('./barchart.component.html'),
    styles: [require('./barchart.component.css')]
})
export class BarChart implements OnInit, AfterViewInit {
    @Input()
    public id: string;
    @Input()
    public chartData: BarChartData;

    private chart;

    //public tooltip;
    //private width: number;
    //private height: number;

    //private x: any;
    //private y: any;
    //private svg: any;
    //private g: any;

    constructor() {
    }

    ngOnInit() {
        if (!this.id)
            this.id = 'chart_' + this.chartData.title.replace(' ', '_');
    }

    ngAfterViewInit() {
        var columns = this.chartData.chartData.map((d) => {
            return [d.name].concat(d.data.map((data) => { return data.y.toString() }));
        });
        var xAxis = [];
        if (this.chartData.chartData.length > 0) {
            xAxis = this.chartData.chartData[0].data.map((d) => { return d.x});
        }
        var groups = [];
        //if (this.chartData.chartData.length === 1) {
        //    var max = 0;
        //    this.chartData.chartData[0].data.forEach((x) => {
        //        if (x.y > max)
        //            max = x.y;
        //    });
        //    var maxString = max.toString();
        //    columns.unshift(['baseData'].concat(this.chartData.chartData[0].data.map(() => { return maxString; })));
        //    groups.unshift(['baseData', this.chartData.chartData[0].name]);
        //}
        this.chart = c3.generate({
            bindto: '#' + this.id,
            size: {
                height: this.chartData.height
            },
            padding: {
                top: this.chartData.margin.top,
                bottom: this.chartData.margin.bottom,
                left: this.chartData.margin.left,
                right: this.chartData.margin.right
            },
            data: {
                columns: columns,
                type: 'bar',
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
                },
                groups: groups
            },
            axis: {
                x: {
                    type: 'category',
                    categories: xAxis,
                    show: this.chartData.showXAxis,
                    tick: {
                        outer: false
                    }
                },
                y: {
                    show: this.chartData.showYAxis
                }
            },
            bar: {
                width: {
                    ratio: 0.5
                }
            },
            tooltip: {
                show: this.chartData.showTooltip,
                format: {
                    title: (d) => {
                        if (!this.chartData.xLegend || this.chartData.xLegend === '')
                            return '';
                        return this.chartData.xLegend + ': ' + d;
                    }
                }
            },
            legend: {
                show: this.chartData.showLegend,
                inset: {
                    anchor: 'top-left',
                    x: 20,
                    y: 10
                },
                item: {
                    onclick: (id) => {}
                }
            }
        });
    }

    //private initTip() {
    //    this.tooltip = d3.select("body").append("div").attr("class", "toolTip");
    //}

    //private initSvg() {
    //    this.svg = d3.select("svg");
    //    this.width = +this.chartData.width - this.chartData.margin.left - this.chartData.margin.right;
    //    this.height = +this.chartData.height - this.chartData.margin.top - this.chartData.margin.bottom;

    //    this.g = this.svg.append("g")
    //        .attr("transform", "translate(" + this.chartData.margin.left + "," + this.chartData.margin.top + ")");
    //}

    //private initAxis() {
    //    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.8);
    //    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    //    this.x.domain(this.chartData.chartData.map((d) => d.x));
    //    this.y.domain([0, d3Array.max(this.chartData.chartData, (d) => d.y)]);
    //}

    //private drawAxis() {
    //    this.g.append("g")
    //        .attr("class", "axis axis--x")
    //        .attr("transform", "translate(0," + this.height + ")")
    //        .call(d3Axis.axisBottom(this.x));
    //}

    //private drawBars() {
    //    this.g.selectAll(".bar")
    //        .data(this.chartData.chartData)
    //        .enter().append("rect")
    //        .attr("class", "bar")
    //        .attr("fill", '#9F378E')
    //        .attr("x", (d) => this.x(d.x))
    //        .attr("y", (d) => this.y(d.y))
    //        .attr("width", this.x.bandwidth())
    //        .attr("height", (d) => this.height - this.y(d.y))
    //        .on("mousemove", (d) => {
    //            this.tooltip
    //                .style("left", d3.event.pageX - 20 + "px")
    //                .style("top", d3.event.pageY - 20 + "px")
    //                .style("display", "inline-block")
    //                .html(d.y);
    //        })
    //        .on("mouseout", (d) => { this.tooltip.style("display", "none"); });
    //    this.g.selectAll(".bar")
    //        .data(this.chartData.chartData)
    //        .enter().append("rect")
    //        .attr("class", "base-bar")
    //        .attr("fill", '#DFDFDF')
    //        .attr("x", (d) => this.x(d.x))
    //        .attr("y", () => this.chartData.height)
    //        .attr("width", this.x.bandwidth())
    //        .attr("height", () => this.chartData.height);
    //}
    
}
