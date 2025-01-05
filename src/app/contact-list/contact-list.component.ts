import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ContactListService } from '../core/services/contact-list.service';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { Contact } from '../core/models';
import { Router } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { MatIconModule } from '@angular/material/icon';
import { ListTableComponent } from './list-table/list-table.component';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    SearchComponent,
    ListTableComponent,
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss',
})
export class ContactListComponent implements OnInit {
  search: FormControl = new FormControl('');

  contacts$: Observable<Contact[]> = combineLatest([
    this.contactListService.contacts$,
    this.search.valueChanges.pipe(startWith('')),
  ]).pipe(map(([contacts, search]) => this.searchContacts(contacts, search)));

  constructor(
    private contactListService: ContactListService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.contactListService.initializeContacts();
  }

  openAddDialog(): void {
    this.router.navigate(['new']);
  }

  private searchContacts(contacts: Contact[], searchQuery: string): Contact[] {
    const query = searchQuery?.toLowerCase() || '';
    return contacts.filter(
      (contact) =>
        contact.firstName.toLowerCase().includes(query) ||
        contact.lastName.toLowerCase().includes(query) ||
        contact.phoneNumber.includes(query),
    );
  }
}
