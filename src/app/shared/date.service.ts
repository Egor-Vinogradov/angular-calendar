import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import * as moment from "moment";

@Injectable({providedIn: 'root'})
export class DateService {
  public date: BehaviorSubject<Date> = new BehaviorSubject(new Date());

  public changeMonth(number: number) {
    const value: BehaviorSubject<Date> = new BehaviorSubject(new Date(
      this.date.value.setMonth(this.date.value.getMonth() + number))
    );
    this.date.next(value.value);
  }

  public changeDate(date: moment.Moment) {
    const value: BehaviorSubject<Date> = new BehaviorSubject(new Date(
      this.date.value.setDate(date.date())));
    this.date.next(value.value);
  }
}
