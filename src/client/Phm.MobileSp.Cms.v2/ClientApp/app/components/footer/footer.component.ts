import { Component } from '@angular/core';

@Component({
    selector: 'footer',
    template: require('./footer.component.html'),
    styles: [require('./footer.component.css')]
})
export class FooterComponent {
    public year: string;

    constructor() {
        this.year = new Date().getFullYear().toString();
    }
}
