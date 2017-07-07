import { Component, Input, Output, EventEmitter, ViewEncapsulation, AfterViewInit } from '@angular/core';


declare var $: any;
@Component({
    selector: 'lbrefine',
    template: require('./lbrefine.html'),
    styles: [require('./lbrefine.css'), require('./ion.rangeSlider.custom.css')],
  encapsulation: ViewEncapsulation.None
})
export class LbrefineComponent implements AfterViewInit {
  @Input() groups: any;
  @Input() hideDates: boolean;
  @Input() hideRange: boolean;
  @Output() criteriaChanged: EventEmitter<any> = new EventEmitter();
  date1;
  date2;
  rangeFrom = 0;
  rangeTo = 100;
  ngAfterViewInit() {
      $("#sliderElement").ionRangeSlider({
          type:"double",
            min:0,
            max:100,
            grid:false,
          from : this.rangeFrom,
          to: this.rangeTo,
          decorate_both: false,
          onFinish: event => this.broadcastChanges(event)
      });
  }
  broadcastChanges(par?) {
      console.log(par);
    if (par) {
      this.rangeFrom = par.from;
      this.rangeTo = par.to;
    }
    let s = {
        selectedDate1 : this.date1,
        selectedDate2 : this.date2,
        selections : {},
        range : {
            from: this.rangeFrom,
            to: this.rangeTo
        }
    }
    this.groups.forEach((item1) => {
      s.selections[item1.groupId] = [];
      item1.items.forEach((item2, index1) => {
        if ( item2.selected) {
          s.selections[item1.groupId].push(item2.id)
        }
      });
    });
    this.criteriaChanged.emit(s);
  }

  clearGroup(g) {
     this.groups[g].items.forEach((item) => {
     item.selected = false;
     });
  }
  clearAll() {
      this.groups.forEach((item, index) => {
        this.clearGroup(index);
      });
      this.date1 = undefined;
      this.date2 = undefined;
      this.rangeFrom = 0;
      this.rangeTo = 100;
      this.broadcastChanges();
  }
}
