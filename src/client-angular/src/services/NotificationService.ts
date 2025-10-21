import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private messagesSource = new BehaviorSubject<string[]>([]);
  messages$ = this.messagesSource.asObservable();
  private source?: EventSource;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getServerEvents() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.source = new EventSource('https://localhost:7073/api/v1/Notifications/getstream');

    this.source.onmessage = (event) => {
      const current = this.messagesSource.value;
      this.messagesSource.next([...current, event.data]);
    };

    this.source.onerror = (err) => {
      console.error('Erro SSE:', err);
    };
  }
}
