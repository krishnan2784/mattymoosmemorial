import {Component, Input, OnInit} from '@angular/core';
@Component({
  selector: 'monobargraph',
      template: require('./monobargraph.html'),
      styles: [require('./monobargraph.css')]
})
export class MonobarGraphComponent implements OnInit {
  @Input() data: any;
  bar7H;
  ani = 1;
  heightRatio = 1;
  ngOnInit() {
      this.bar7H = 100 / this.data.data.length;
      var values = this.data.data.map(o => { return o.percent; });
      var maxHeight = Math.max.apply(Math, values);
      var minHeight = Math.min.apply(Math, values);

      if (maxHeight > 0) {
          if (minHeight < 0)
              maxHeight = maxHeight + Math.abs(minHeight);
      } else if (maxHeight < 0)
          maxHeight = Math.abs(minHeight);
      if (maxHeight > 0)
          this.heightRatio = 100 / maxHeight;
  }
}
