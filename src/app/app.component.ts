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
  public bookingDate: Date;

  private hostAddress: 'localhost:4400';
  private bookingEndpoint = '/bookings';

  constructor(private http: HttpClient) {
  }

  public makeBooking() {
    const booking: IBooking = {
      name: this.nameOnBooking,
      date: this.bookingDate.toISOString()
    };

    const url = this.getFullUrl(this.bookingEndpoint);
    return this.http.post<IBooking>(url, booking).toPromise().then((response: any) => {
      this.existingBookings = response.bookings;
    });
  }

  public ngOnInit() {
    this.getExistingBookings();
  }

  private getFullUrl(endpoint: string) {
    return this.hostAddress + endpoint;
  }

  private getExistingBookings() {
    const url = this.getFullUrl(this.bookingEndpoint);

    return this.http.get<IGetBookingsResponse>(url).toPromise().then((response: any) => {
      this.existingBookings = response.bookings;
    });
  }
}
