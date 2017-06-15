import { Component, OnInit, Input } from '@angular/core';
import Chartclasses = require("../../models/chartclasses");
import BarChartData = Chartclasses.BarChartData;
import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";

@Component({
    selector: 'barchart',
    template: require('./barchart.component.html'),
    styles: [require('./barchart.component.css')]
})
export class BarChart implements OnInit {

    @Input()
    public chartData: BarChartData = new BarChartData({
        xLegend: "Allocated time / Submitted by day",
        yLegend: "Number of learners"
    });

    public tooltip;

    private width: number;
    private height: number;

    private x: any;
    private y: any;
    private svg: any;
    private g: any;

    constructor() {
    }

    ngOnInit() {
        this.initTip();
        this.initSvg();
        this.initAxis();
        this.drawAxis();
        this.drawBars();
    }

    private initTip() {
        this.tooltip = d3.select("body").append("div").attr("class", "toolTip");
    }

    private initSvg() {
        this.svg = d3.select("svg");
        this.width = +this.chartData.width - this.chartData.margin.left - this.chartData.margin.right;
        this.height = +this.chartData.height - this.chartData.margin.top - this.chartData.margin.bottom;

        this.g = this.svg.append("g")
            .attr("transform", "translate(" + this.chartData.margin.left + "," + this.chartData.margin.top + ")");
    }

    private initAxis() {
        this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.8);
        this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
        this.x.domain(this.chartData.chartData.map((d) => d.x));
        this.y.domain([0, d3Array.max(this.chartData.chartData, (d) => d.y)]);
    }

    private drawAxis() {
        this.g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3Axis.axisBottom(this.x));
        //this.g.append("g")
        //    .attr("class", "axis axis--y")
        //    .call(d3Axis.axisLeft(this.y).ticks(10, "%"));
    }

    private drawBars() {
        this.g.selectAll(".bar")
            .data(this.chartData.chartData)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("fill", '#9F378E')
            .attr("x", (d) => this.x(d.x))
            .attr("y", (d) => this.y(d.y))
            .attr("width", this.x.bandwidth())
            .attr("height", (d) => this.height - this.y(d.y))
            .on("mousemove", (d) => {
                this.tooltip
                    .style("left", d3.event.pageX - 20 + "px")
                    .style("top", d3.event.pageY - 20 + "px")
                    .style("display", "inline-block")
                    .html(d.y);
            })
            .on("mouseout", (d) => { this.tooltip.style("display", "none"); });
        this.g.selectAll(".bar")
            .data(this.chartData.chartData)
            .enter().append("rect")
            .attr("class", "base-bar")
            .attr("fill", '#DFDFDF')
            .attr("x", (d) => this.x(d.x))
            .attr("y", () => this.chartData.height)
            .attr("width", this.x.bandwidth())
            .attr("height", () => this.chartData.height);
    }
    
}