import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private toastr: ToastrService) {}

  toastrMessage(type: string, message: string, options: any): any {
    if (type === 'success') {
      this.toastr.success('', message, options);
    } else if (type === 'error') {
      this.toastr.error('', message, options);
    }
  }
}
