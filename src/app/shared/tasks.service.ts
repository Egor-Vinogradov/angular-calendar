import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import * as moment from "moment/moment";

export interface Task {
  id?: string
  title: string
  date?: string
}

interface CreateResponse {
  name: string
}

@Injectable({providedIn: 'root'})
export class TasksService {
  private urlDB: string = 'https://pr1-calendar-default-rtdb.europe-west1.firebasedatabase.app/'

  constructor(private http: HttpClient) {
  }

  public create(task: Task): Observable<Task> {
    return this.http
      .post<CreateResponse>(`${this.urlDB}/${task.date}.json`, task)
      .pipe(map(res => {
        return {...task, id: res.name}
      }))
  }

  public getAllTasks(date: moment.Moment): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${this.urlDB}${date.format('DD-MM-YYYY')}.json`)
      .pipe(map(tasks => {
        if (!tasks) {
          return []
        }
        // @ts-ignore
        return Object.keys(tasks).map(key => ({...tasks[key], id: key}))
      }))
  }

  public remove(task: Task): Observable<void> {
    return this.http
      .delete<void>(`${this.urlDB}${task.date}/${task.id}.json`)
  }
}
