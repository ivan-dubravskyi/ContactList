import { Component, OnInit } from '@angular/core';
import { ContactListService } from '../core/services/contact-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../core/models';
import { MatCard } from '@angular/material/card';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { assignColorBasedOnId } from '../core/helpers/contact-color.helper';
import { AvatarComponent } from '../shared/avatar/avatar.component';

@Component({
  selector: 'app-contact-view',
  standalone: true,
  imports: [
    MatCard,
    MatIconButton,
    MatIcon,
    MatButton,
    DatePipe,
    AvatarComponent,
  ],
  templateUrl: './contact-view.component.html',
  styleUrl: './contact-view.component.scss',
})
export class ContactViewComponent implements OnInit {
  contact: Contact | null = null;

  protected readonly assignColorBasedOnId = assignColorBasedOnId;

  constructor(
    private contactsService: ContactListService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    const contactId = +this.activatedRoute.snapshot.params['id'];
    this.contact = this.contactsService.getContactById(contactId);
  }

  navigateBack() {
    this.router.navigate(['']);
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
  }
}
