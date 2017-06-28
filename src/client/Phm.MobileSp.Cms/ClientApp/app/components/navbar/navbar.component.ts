import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'navbar',
  styles: [require('./navbar.css')],
  template: require('./navbar.html')
})
export class NavBarComponent {
    @Input() data: any;
    @Output() optionSelected: EventEmitter<any> = new EventEmitter();
    raiseEvent(id, index) {
        this.data.forEach((x) => {
            x.selected = false;
        });
        this.data[index].selected = true;
        this.optionSelected.emit(id);
    }
}
