import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogData, Contact } from '../../core/models';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { ContactListService } from '../../core/services/contact-list.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-table',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './list-table.component.html',
  styleUrl: './list-table.component.scss',
})
export class ListTableComponent {
  @Input({ required: true }) contacts: Contact[] = [];

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'phoneNumber',
    'actions',
  ];

  constructor(
    private contactListService: ContactListService,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  onDelete(element: Contact) {
    const dialogRef = this.dialog.open<
      ConfirmationDialogComponent,
      ConfirmationDialogData,
      boolean
    >(ConfirmationDialogComponent, {
      data: {
        title: 'Delete Contact',
        content: 'Are you sure you want to delete this contact?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.contactListService.deleteContact(element.id);
      }
    });
  }

  onEdit(row: Contact) {
    this.router.navigate(['contact', row.id, 'edit']);
  }

  onContactSelect(row: Contact) {
    this.router.navigate(['contact', row.id]);
  }
}
