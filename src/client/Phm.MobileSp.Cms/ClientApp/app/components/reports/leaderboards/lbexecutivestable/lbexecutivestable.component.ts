import { Component, Input, OnChanges} from '@angular/core';
@Component({
    selector: 'lbexecutivestable',
    template: require('./lbexecutivestable.html'),
    styles: [require('./lbexecutivestable.css')]
})
export class LbExecutivesTableComponent implements OnChanges {
  @Input() data: any;
  @Input() page: number;
  @Input() pageSize: number;
  @Input() busy: boolean;
  pagedData;
  ngOnChanges(changes) {
    if (changes['page'] === undefined && changes['data'] === undefined) {
      return;
    }
    this.pagedData = [];
    let init = (this.pageSize * this.page);
    for (let i = init; i < init + this.pageSize; i++) {
      if (i < this.data.length) {
        this.pagedData.push(this.data[i]);
      }
    }
  }
}
