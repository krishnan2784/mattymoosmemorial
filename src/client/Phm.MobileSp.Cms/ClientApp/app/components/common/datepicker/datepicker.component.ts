import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
@Component({
  selector: 'datepicker',
      template: require('./datepicker.html'),
      styles: [require('./datepicker.css')]
})
export class DatepickerComponent implements OnInit {
  @Input() day: number;
  @Input() jsMonth: number;
  @Input() year: number;
  @Input() minDay: number;
  @Input() minJsMonth: number;
  @Input() minYear: number;
  @Input() cannotSelectPast: boolean;
  @Input() initialDate: Date;
  @Output() dateSelected: EventEmitter<any> = new EventEmitter();
  pastDays;
  selectedDay;
  selectedMonth;
  selectedYear;
  displayDate;
  show = false;
  hidePastDays = false;
  today = new Date();
  thisDay = this.today.getDate();
  thisMonth = this.today.getMonth();
  thisYear = this.today.getFullYear();
  shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  shortWeekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  longMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  longWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday'];
  ngOnInit() {
      if(!this.day || !this.jsMonth || !this.year) {
        let d = new Date(this.initialDate);
        this.selectedDay = d.getDate();
        this.selectedMonth = d.getMonth();
        this.selectedYear = d.getFullYear();
        this.pastDays = this.dummyArrayGenerator(this.firstDayOfWeek(this.selectedMonth,this.selectedYear).index.uk);
      }
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
  checkPastDay(d){
    let g = new Date(this.selectedYear,this.selectedMonth,d);
    let x = this.isDayOnPast(g);
    return x;
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
  prevMonth(){
    if(this.selectedMonth ==0){
      this.selectedMonth =11;
      this.selectedYear--;
    }
    else
    {
      this.selectedMonth--;
    }
    if((this.selectedMonth < this.thisMonth && this.selectedYear == this.thisYear) && this.cannotSelectPast){
      this.selectedMonth = this.thisMonth;
      this.selectedYear = this.thisYear;
    }
    this.pastDays = this.dummyArrayGenerator(this.firstDayOfWeek(this.selectedMonth,this.selectedYear).index.uk);
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
  select(d,m,y){
    if(this.cannotSelectPast){
      let g = new Date(y,m,d);
      if(this.isDayOnPast(g)) { return };
    }
    if(this.minDay && this.minJsMonth && this.minYear) {
      var a = new Date(y,m,d);
      var b = new Date(this.minYear, this.minJsMonth, this.minDay);
      if (a < b) {
        alert('Please choose a date later than ' + this.minDay +'/' + (this.minJsMonth +1) +'/' + this.minYear );
        return;
      }
    }
    let x = new Date(y,m,d);
    let dta = {
      day: d,
      month: m,
      year: y,
      fullDate: x,
      longMonth: this.longMonths[m],
      shortMonth: this.shortMonths[m],
      longWeekDay : this.longWeekDays[x.getDay()],
      shortWeekDay : this.shortWeekDays[x.getDay()]
    };
    this.dateSelected.emit(dta);
    this.displayDate = this.pad(d,2) +'/' + this.pad(m + 1, 2) +'/' + y;
    this.show = false;
  }
}
