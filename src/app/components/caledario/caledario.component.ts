import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from "@fullcalendar/angular";
import { EventInput, View } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CancionesService } from '../../services/canciones.service';
import * as moment from "moment";
import { element } from 'protractor';
import { Canciones } from '../../interfaces/canciones.interface';

@Component({
  selector: 'app-caledario',
  templateUrl: './caledario.component.html',
  styleUrls: ['./caledario.component.css']
})
export class CaledarioComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  fechaSelec: string;
  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [
    { title: 'Nuevo Evento', start: new Date() }
  ];

  public canciones: Array<Canciones>;

  constructor( public _cancion: CancionesService ) { }

  ngOnInit(): void {
    moment.locale('es');
  }

  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  gotoPast() {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
  }

  handleDateClick(arg) {
    if (confirm('Desea agregar un nuevo evento ' + arg.dateStr + ' ?')) {
      const fecha = moment(arg.dateStr);
      this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
        title: 'New Event',
        start: arg.date,
        allDay: arg.allDay
      });
      this.fechaSelec = fecha.format('DDMMYY');
      this.canciones = this._cancion.canciones;
      // console.log(this._cancion.reproductor['d120520'][0]['artista']);
      console.log(`d${this.fechaSelec}`);
      console.log(this._cancion.reproductor[`d${this.fechaSelec}`]);

    }
  }

}
