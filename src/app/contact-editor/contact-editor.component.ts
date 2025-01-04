import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { ContactListService } from '../core/services/contact-list.service';
import { Contact, ContactForm } from '../core/models';
import { Location } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-contact-editor',
  standalone: true,
  imports: [
    MatCard,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './contact-editor.component.html',
  styleUrl: './contact-editor.component.scss',
})
export class ContactEditorComponent implements OnInit {
  contact: Contact | null = null;
  contactInfoGroup = new FormGroup<ContactForm>({
    id: new FormControl(null),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    birthDate: new FormControl(''),
    address: new FormControl(''),
  });

  constructor(
    private contactsService: ContactListService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    const contactId = +this.activatedRoute.snapshot.params['id'];
    this.contact = this.contactsService.getContactById(contactId);
    if (this.contact) {
      this.contactInfoGroup.patchValue(this.contact);
    }

    console.log(this.activatedRoute.snapshot.params);
  }

  navigateBack() {
    this.location.back();
  }

  onSave() {
    this.contactsService.saveContact(this.contactInfoGroup.value as Contact);
    this.navigateBack();
  }
}
