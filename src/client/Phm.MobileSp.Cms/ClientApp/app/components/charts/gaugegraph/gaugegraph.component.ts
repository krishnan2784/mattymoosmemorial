import {Component, Input, OnInit, OnChanges} from '@angular/core';
@Component({
  selector: 'gaugegraph',
    template: require('./gaugegraph.html'),
    styles: [require('./gaugegraph.css')]
})
export class GaugeGraphComponent implements  OnChanges, OnInit {
  @Input() percent: any;
  deg;
  deg2;
  percText = this.percent;
  ngOnInit() {
    this.percText = this.percent;
    this.deg = "rotate(" + this.percToRotate(this.percent) +"deg)";
    this.deg2 = "rotate(" + (-90 + (this.percToRotate(this.percent))) +"deg)";
  }
  ngOnChanges(changes) {
    if (changes['percent'] === undefined) {
      return;
    }
    this.percText = this.percent;
    this.deg = "rotate(" + this.percToRotate(this.percent) +"deg)";
    this.deg2 = "rotate(" + (-90 + (this.percToRotate(this.percent))) +"deg)";
  }
  percToRotate(perc) {
    return 180 * (perc /100);
  }
}
