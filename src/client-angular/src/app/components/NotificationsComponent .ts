// notifications.component.ts
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NotificationService } from '../../services/NotificationService';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-notifications',
  template: '<h2>Notificações</h2>  <div *ngFor="let msg of messages" style="color:#000">  {{ msg }} </div>',
  imports: [CommonModule],
  standalone: true,
})

export class NotificationsComponent implements OnInit {
  messages: string[] = [];

  constructor(
    private notificationService: NotificationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.notificationService.messages$.subscribe(msgs => {
        this.messages = msgs;
      });
      this.notificationService.getServerEvents();
    }
  }
} 
