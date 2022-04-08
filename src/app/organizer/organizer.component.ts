import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DateService} from "../shared/date.service";
import {Task, TasksService} from "../shared/tasks.service";
import * as moment from "moment/moment";

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required)
  });

  public tasks: Task[] = []

  constructor(public dateService: DateService,
              private tasksService: TasksService) { }

  ngOnInit(): void {
    this.dateService.date.subscribe(dates => this.getAllTasks(moment(dates)))
  }

  public getAllTasks(date: moment.Moment) {
    this.tasksService.getAllTasks(date)
      .subscribe({
        next: (value) => {
          this.tasks = value
        },
        error: err => {
          console.error(err)
        }
      })
  }

  public remove(task: Task) {
    this.tasksService.remove(task)
      .subscribe({
        next: task => {
          this.ngOnInit()
        },
        error: err => console.error(err)
      })
  }

  public submit() {
    const {title} = this.form.value;

    const task: Task = {
      title,
      date: moment(this.dateService.date.value).format('DD-MM-YYYY')
    }
    this.tasksService.create(task)
      .subscribe({
        next: (task) => {
          this.form.reset()
          // this.ngOnInit()
          this.tasks.push(task)
        },
        error: err => {
          console.error(err)
        }
      })

  }

}
