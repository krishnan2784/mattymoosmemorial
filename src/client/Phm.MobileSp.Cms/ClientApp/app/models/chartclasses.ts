export abstract class BaseChart {
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
    chartData: [{ name: string, colour: string, data: [{ x: number, y: number }] }];
    xLegend: string;
    yLegend: string;
    showLegend: boolean;

    constructor(options: {} = {}) {
        super(options);
        this.xLegend = options['xLegend'] || '';
        this.yLegend = options['yLegend'] || 'Number of learners';
        this.showLegend = options['showLegend'] || true;
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

export class GaugeChartData extends BaseChart {
    chartData: [{ name: string, colour: string, data: number }];
    showMinMaxLabels: boolean;
    min: number;
    max: number;
    units: string;
    arcThickness: number;

    constructor(options: {} = {}) {
        super(options);
        this.showMinMaxLabels = options['showMinMaxLabels'] || false;
        this.min = options['min'] || 0;
        this.max = options['max'] || 100;
        this.units = options['units'] || '';
        this.arcThickness = options['arcThickness'] || 5;

        this.chartData = options['chartData'] || [{
            name: 'Passed',
            colour: '#9F378E',
            data: 50.5
        }];
    }
}

export class DonutChartData extends BaseChart {
    chartData: [{ name: string, colour: string, data: number[] }];
    showLegend: boolean;
    arcThickness: number;

    constructor(options: {} = {}) {
        super(options);
        this.showLegend = options['showLegend'] || true;
        this.arcThickness = options['arcThickness'] || 10;
        this.chartData = options['chartData'] ||
        [{
            name: 'Pass',
            colour: '#9F378E',
            data: [80]
        }, {
            name: 'Fail',
            colour: '#ECECEC',
            data: [20]
        }];
    }
}