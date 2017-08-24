import { Component, Input, OnInit, OnChanges, OnDestroy, Output, EventEmitter, SimpleChange, ElementRef } from '@angular/core';
import { DateEx } from "../../../classes/helpers/date";

declare var $: any;
@Component({
  selector: 'datepicker',
      template: require('./datepicker.html'),
      styles: [require('./datepicker.css')]
})
export class DatepickerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() day: number;
  @Input() jsMonth: number;
  @Input() year: number;
  @Input() minDay: number;
  @Input() minJsMonth: number;
  @Input() minYear: number;
  @Input() cannotSelectPast: boolean;
  @Input() initialDate: Date;
  @Input() rightAlign: boolean = false;
  @Output() dateSelected: EventEmitter<any> = new EventEmitter();
  pastDays;
  selectedDay;
  selectedMonth;
  selectedYear;
  selectedDate: Date;
  show = false;
  hidePastDays = false;
  today = new Date();
  displayDate: string = 'dd/mm/yyyy';
  thisDay = this.today.getDate();
  thisMonth = this.today.getMonth();
  thisYear = this.today.getFullYear();
  shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  shortWeekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  longMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  longWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday'];
  toggle = this.toggleDisplay.bind(this);

  constructor(private _eref: ElementRef){}
  ngOnInit() {
      if (this.initialDate) {
          this.selectedDate = new Date(this.initialDate);
          this.updateDisplayDate();
      } else
          this.selectedDate = new Date();

      if (!this.day || !this.jsMonth || !this.year) {
          this.selectedDay = this.selectedDate.getDate();
          this.selectedMonth = this.selectedDate.getMonth();
          this.selectedYear = this.selectedDate.getFullYear();
      }
      if (!this.selectedMonth || !this.selectedYear) {
          let d = new Date();
          this.selectedMonth = d.getMonth();
          this.selectedYear = d.getFullYear();
      }
      this.pastDays = this.dummyArrayGenerator(this.firstDayOfWeek(this.selectedMonth, this.selectedYear).index.uk);

  }
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
      let log: string[] = [];
      if (changes['initialDate']) {
          let initDate = changes['initialDate'];
          if (!initDate.isFirstChange()) {
              if (this.initialDate) {
                  this.selectedDate = new Date(this.initialDate);
                  this.updateDisplayDate();
              } else {
                  this.reset();
              }
              this.selectedDay = this.selectedDate.getDate();
              this.selectedMonth = this.selectedDate.getMonth();
              this.selectedYear = this.selectedDate.getFullYear();
          }
      }
  }
  ngOnDestroy() {
      document.removeEventListener('click', this.toggle);
  }
  toggleDisplay(event: any = null) {
      if (event) {
          if (!this._eref.nativeElement.contains(event.target)) {
              this.show = false;
          }
      } else
          this.show = !this.show;

      if (this.show) {
          document.addEventListener('click', this.toggle);
      } else {
          this.selectedMonth = this.selectedDate.getMonth();
          this.selectedYear = this.selectedDate.getFullYear();
          document.removeEventListener('click', this.toggle);
      }
  }
  reset() {
      this.selectedDate = new Date();
      this.displayDate = 'dd/mm/yyyy';
      this.clearMinDate();
  }
  clearMinDate() {
      this.minDay = null;
      this.minJsMonth = null;
      this.minYear = null;
      this.selectedDay = null;
  }
  pad(num: string, size: number) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }
  dummyArrayGenerator(d: number) {
    let array = [];
    for (var i = 0; i < d; i++) {
      array.push(i);
    }
    return array;
  }
  checkPastDay(d) {
      if (!this.cannotSelectPast)
          return false;
    let g = new Date(this.selectedYear,this.selectedMonth,d);
    let x = this.isDayOnPast(g);
    return x;
  }
  isDayAboveMin(d, m, y = this.selectedYear) {
      if (!this.minYear && !this.minJsMonth && !this.minDay)
          return true;     
      if (m == -1) {
          m = 11;
          y--;
      } 
      var a = new Date(y, m, d);
      var b = new Date(this.minYear, this.minJsMonth, this.minDay);
      return a >= b;
  }
  isSelectedDay(d) {
      if (!this.selectedDate || !this.selectedDay || this.selectedDay != d)
          return false;
      return this.selectedMonth == this.selectedDate.getMonth() && this.selectedYear == this.selectedDate.getFullYear();
  }
  normalizeDate(d) {
    let a = this.pad(d.getMonth() + 1, 2) + '/ ' + this.pad(d.getDate(), 2) + "/" + "/" + d.getFullYear();
    let b = this.pad(d.getHours(d), 2);
    let c = this.pad(d.getMinutes(d), 2);
    let r = new Date(a + ' ' + b + ':' + c);
    r.setSeconds(0);
    r.setMilliseconds(0);
    r.setHours(0);
    r.setMinutes(0);
    return r;
  }
  isDayOnPast(d) {
    let a = d;
    let b = new Date();
    let c = this.normalizeDate(a);
    let e = this.normalizeDate(b);
    return c < e;
  }
  firstDayOfWeek(month: number, year: number) {
    let d = new Date((month + 1) + '/1/' + year);
    let e = d.getDay();
    e -= 1;
    if (e == -1) {
      e = 6;
    }
    return {
      index: {
        uk: e,
        us: d.getDay()
      },
      labels: {
        long_us: this.longWeekDays[d.getDay()],
        long_uk: this.longWeekDays[e],
        short_us: this.shortWeekDays[d.getDay()],
        short_uk: this.shortWeekDays[e]
      }
    };
  }
  prevMonth() {
      let m = this.selectedMonth;
      let y = this.selectedYear;
    if(m ==0){
      m =11;
      y--;
    }
    else
    {
      m--;
    }
    if (this.checkPastDay(this.minDay) || !this.isDayAboveMin(this.minDay, m)) {
        return;
    }
    this.selectedMonth = m;
    this.selectedYear = y;
    this.pastDays = this.dummyArrayGenerator(this.firstDayOfWeek(this.selectedMonth, this.selectedYear).index.uk);
    return;
  }
  nextMonth(){
    if(this.selectedMonth ==11){
      this.selectedMonth =0;
      this.selectedYear++;
    }
    else
    {
      this.selectedMonth++;
    }
    this.pastDays = this.dummyArrayGenerator(this.firstDayOfWeek(this.selectedMonth,this.selectedYear).index.uk);
  }
  lastDayOfMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }
  select(d, m, y) {
    if(this.cannotSelectPast){
      let g = new Date(y,m,d);
      if (this.isDayOnPast(g)) {
          return
      };
    }
    if (!this.isDayAboveMin(d,m,y))
        return;
    let x = new Date(y, m, d);
    let dta = {
      day: d,
      month: m,
      year: y,
      fullDate: x,
      serverAcceptedDate: DateEx.formatDate(x, 'yyyy-MM-dd'),
      longMonth: this.longMonths[m],
      shortMonth: this.shortMonths[m],
      longWeekDay : this.longWeekDays[x.getDay()],
      shortWeekDay : this.shortWeekDays[x.getDay()]
    };
    this.dateSelected.emit(dta);
    this.selectedDay = d;
    this.selectedDate = x;
    this.updateDisplayDate();
    this.toggleDisplay();
  }
  updateDisplayDate() {
      if (this.selectedDate)
          this.displayDate = DateEx.formatDate(this.selectedDate, 'dd/MM/yyyy');
  }
}
