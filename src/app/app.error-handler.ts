import {
  Injectable,
  ErrorHandler
} from '@angular/core';
import {
  HcToasterService
} from '@healthcatalyst/cashmere';

@Injectable({
  providedIn: 'root'
})
export class AppErrorHandler implements ErrorHandler {

  constructor(private toasterService: HcToasterService) {}

  handleError(error: any) {
    this.toasterService.addToast({
      type: 'alert', header: 'Error', body: error.message || error
    });
  }
}