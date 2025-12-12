import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

enum CustomMessageType {
  success,
  error,
  info
}

@Injectable({
  providedIn: 'root',
})
export class ShowCustomMessage {

  private readonly horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  private readonly verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  private readonly _snackBar = inject(MatSnackBar)

  showCustomMessage(message: string, type?: CustomMessageType) {
    this._snackBar.open(message, 'Cerrar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
