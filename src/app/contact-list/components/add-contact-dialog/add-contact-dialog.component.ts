import {Component, } from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatDialogClose, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-contact-dialog',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButton, MatDialogClose],
  templateUrl: './add-contact-dialog.component.html',
  styleUrl: './add-contact-dialog.component.scss'
})
export class AddContactDialogComponent {

  contactInfoGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
  })

  constructor(public dialogRef: MatDialogRef<AddContactDialogComponent>) {}

  onAdd() {
    this.dialogRef.close(this.contactInfoGroup.value);
  }

}
