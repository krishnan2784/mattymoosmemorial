export abstract class BaseChart {
    title: string;
    width: number;
    height: number;
    margins: { top: number, right: number, bottom: number, left: number };
    constructor(options: {} = {}) {
        this.title = options['title'] = '';
        this.width = options['width'] || 1000;
        this.height = options['height'] || 500;
        this.margins = options['margins'] || {
            top: 20,
            right: 20,
            bottom: 20,
            left: 50
        };
    }
}
export class BarChartData extends BaseChart {
    chartData: [{ x: number, y: number }];
    xLegend: string;
    yLegend: string;
    constructor(options: {} = {}) {
        super(options);
        this.xLegend = options['xLegend'] = '';
        this.yLegend = options['yLegend'] = '';
        this.chartData = options['chartData'] ||  [{
            x: 1,
            y: 5
        }, {
            x: 20,
            y: 20
        }, {
            x: 40,
            y: 10
        }, {
            x: 60,
            y: 40
        }, {
            x: 80,
            y: 5
        }, {
            x: 100,
            y: 60
        }];
    }
}

