import { Component, OnInit } from '@angular/core';
import {DateService} from "../shared/date.service";
import {Subject, takeUntil} from "rxjs";
import * as moment from "moment";

interface Day {
  value: moment.Moment
  active: boolean
  disabled: boolean
  selected: boolean
}

interface Week {
  days: Day[]
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public calendar: Week[] = []

  constructor(private dateService: DateService) { }

  ngOnInit(): void {
    this.dateService.date.subscribe(dates => this.getDate(dates))
  }

  private getDate(dateNow: Date) {
    const startDay = moment(dateNow).clone().startOf('month').startOf('week');
    const endDay = moment(dateNow).clone().endOf('month').endOf('week');

    const date = startDay.clone().subtract(1, 'day')

    const calendar = []

    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone()
            const active = moment().isSame(value, 'date')
            const disabled = !moment(dateNow).isSame(value, 'month')
            const selected = moment(dateNow).isSame(value, 'date')

            return {
              value, active, disabled, selected
            }
          })
      })
    }
    this.calendar = calendar
  }

  public select(day: moment.Moment) {
    this.dateService.changeDate(day)
  }

}
