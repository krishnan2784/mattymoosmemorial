import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
@Component({
  selector: 'formnavbar',
  styles: [require('./formnavbar.component.css')],
  template: require('./formnavbar.component.html')
})
export class FormNavBarComponent implements  OnInit {
    @Input() data: any;
	@Output() optionSelected: EventEmitter<any> = new EventEmitter();
	ngOnInit() {
		if (this.data && this.data.length > 0 && this.data.filter(x => x.select).length === 0) {
			this.data[0].selected = true;
		}
	}
    raiseEvent(id, index) {
        this.data.forEach((x) => {
            x.selected = false;
        });
        this.data[index].selected = true;
        this.optionSelected.emit(id);
    }
}
