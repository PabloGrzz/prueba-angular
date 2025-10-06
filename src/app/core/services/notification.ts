import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  
  showSuccess(message: string): void {
    console.log('✔ ' + message);
    alert(`✔ ${message}`);
  }

  showError(message: string): void {
    console.error('X ' + message);
    alert(`X ${message}`);
  }
}