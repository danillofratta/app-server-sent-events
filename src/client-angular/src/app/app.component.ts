import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationsComponent } from './components/NotificationsComponent ';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NotificationsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'client-server-send-event';
}
