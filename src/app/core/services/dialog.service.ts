import { Injectable } from '@angular/core';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogData } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openConfirmationDialog(title: string, content: string) {
    const dialogRef = this.dialog.open<
      ConfirmationDialogComponent,
      ConfirmationDialogData,
      boolean
    >(ConfirmationDialogComponent, {
      data: {
        title,
        content,
      },
    });

    return dialogRef.afterClosed().pipe(map(Boolean));
  }
}
