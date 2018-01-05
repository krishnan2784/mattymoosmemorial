import { Component, Input, Output, EventEmitter} from '@angular/core';
@Component({
  selector: 'form-buttons',
  template: require('./formbuttons.component.html'),
  styles: [require('./formbuttons.component.css')]
})
export class FormButtons {
	@Input() saveId: string;
	@Input() cancelId: string;
	@Input() loading: boolean = false;
	@Output() goBack: EventEmitter<any> = new EventEmitter();
}
