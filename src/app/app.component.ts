import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGetBookingsResponse } from './models/IGetBookingsResponse.model';
import { IBooking } from './models/IBooking.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public existingBookings = [];
  public nameOnBooking: string;
  public bookingDate: string;

  constructor(private http: HttpClient) {
  }

  public makeBooking() {
    const booking: IBooking = {
      name: this.nameOnBooking,
      date: this.bookingDate
    };

    return this.http.post<IBooking>('/api/bookings', booking).toPromise().then((response: any) => {
      this.existingBookings = response.bookings;
    });
  }

  public ngOnInit() {
    this.getExistingBookings();
  }

  private getExistingBookings() {

    return this.http.get<IGetBookingsResponse>('/api/bookings').toPromise().then((response: any) => {
      this.existingBookings = response.bookings;
    });
  }
}
