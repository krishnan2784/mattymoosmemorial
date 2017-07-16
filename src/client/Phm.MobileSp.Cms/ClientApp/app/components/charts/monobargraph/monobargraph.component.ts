import {Component, Input, OnInit} from '@angular/core';
@Component({
  selector: 'monobargraph',
      template: require('./monobargraph.html'),
      styles: [require('./monobargraph.css')]
})
export class MonobarGraphComponent implements OnInit {
  @Input() data: any;
  bar7H;
  ani =1;
  ngOnInit() {
    this.bar7H = 100 / this.data.data.length;
  }
}
