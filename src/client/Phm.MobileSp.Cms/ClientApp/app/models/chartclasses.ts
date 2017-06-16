﻿export abstract class BaseChart {
    title: string;
    width: number;
    height: number;
    margin: { top: number, right: number, bottom: number, left: number };
    constructor(options: {} = {}) {
        this.title = options['title'] = '';
        this.width = options['width'] || 300;
        this.height = options['height'] || 200;
        this.margin = options['margin'] || {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        };
    }
}
export class BarChartData extends BaseChart {
    chartData: [{ name: string, colour: string, data: [{ x: number, y: number }]}];
    xLegend: string;
    yLegend: string;

    constructor(options: {} = {}) {
        super(options);
        this.xLegend = options['xLegend'] || 'Submitted on day';
        this.yLegend = options['yLegend'] || 'Number of learners';
        this.chartData = options['chartData'] ||
        [{
            name: 'Submissions',
            colour: '#9F378E',
            data: [
                {
                    x: 1,
                    y: 5
                }, {
                    x: 2,
                    y: 20
                }, {
                    x: 3,
                    y: 10
                }, {
                    x: 4,
                    y: 40
                }, {
                    x: 5,
                    y: 5
                }, {
                    x: 6,
                    y: 60
                }
            ]
        }];
    }
}

