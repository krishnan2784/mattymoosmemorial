export abstract class BaseChart {
    title: string;
    width: number;
    height: number;
    showLegend: boolean;
    showTooltip: boolean;
    margin: { top: number, right: number, bottom: number, left: number };
    constructor(options: {} = {}) {
        this.title = options['title'] || '';
        this.width = options['width'] || 300;
        this.height = options['height'] || 200;
        this.showLegend = options['showLegend'] || true;
        this.showTooltip = options['showTooltip'];
        this.margin = options['margin'] || {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        };
    }
}
export class BarChartData extends BaseChart {
    chartData: [{ name: string, colour: string, data: [{ x: string, y: number }] }];
    xLegend: string;
    showXAxis: boolean;
    yLegend: string;
    showYAxis: boolean;
    showLegend: boolean;

    constructor(options: {} = {}) {
        super(options);
        this.showXAxis = options['showXAxis'];
        this.showYAxis = options['showYAxis'];
        this.xLegend = options['xLegend'] || '';
        this.yLegend = options['yLegend'] || 'Number of learners';
        this.chartData = options['chartData'] ||
        [{
            name: 'Number of learners',
            colour: '#9F378E',
            data: [
                {
                    x: '1',
                    y: 5
                }, {
                    x: '2',
                    y: 20
                }, {
                    x: '3',
                    y: 10
                }, {
                    x: '4',
                    y: 40
                }, {
                    x: '5',
                    y: 5
                }, {
                    x: '6',
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
        this.chartData = options['chartData'];
    }
}

export class DonutChartData extends BaseChart {
    chartData: [{ name: string, colour: string, data: number[] }];
    donutThickness: number;
    valueLabelFormat: string;

    constructor(options: {} = {}) {
        super(options);
        this.donutThickness = options['donutThickness'] || 5;
        this.chartData = options['chartData'];
        this.showLegend = options['showLegend'];
        this.valueLabelFormat = options['valueLabelFormat'] || '%';

    }
}
