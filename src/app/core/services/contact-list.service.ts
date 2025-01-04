import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Contact} from "../models";

@Injectable({
  providedIn: 'root',
})
export class ContactListService {
  private readonly storageKey = 'contact-list';

  private contactsSubject = new BehaviorSubject<Contact[]>([]);
  public contacts$: Observable<Contact[]> = this.contactsSubject.asObservable();

  // private loader = new BehaviorSubject<boolean>(false);
  // public showLoader$: Observable<boolean> = this.loader.asObservable();

  constructor() {}

  saveContact(contact: Contact): void {
    const contacts = this.contactsSubject.value;
    const index = contacts.findIndex(c => c.id === contact.id);

    if (index !== -1) {
      contacts[index] = contact;
    } else {
      contact.id = Date.now();
      contacts.push(contact);
    }

    this.contactsSubject.next(contacts);
    this.saveContactsToLocalStorage(contacts);
  }

  getContactById(id: number): Contact | null {
    return this.contactsSubject.value.find(contact => contact.id === id) || null;
  }

  deleteContact(id: number): void {
    const contacts = this.contactsSubject.value.filter(contact => contact.id !== id);
    this.contactsSubject.next(contacts);
    this.saveContactsToLocalStorage(contacts);
  }

  initializeContacts(): void {
    const contacts = this.loadContactsFromLocalStorage();
    console.log(contacts)
    this.contactsSubject.next(contacts);

    if (!contacts.length) {
      this.mockData();
    }
  }

  private loadContactsFromLocalStorage(): Contact[] {
    const storedContacts = localStorage.getItem(this.storageKey);
    return storedContacts ? JSON.parse(storedContacts) : [];
  }

  private saveContactsToLocalStorage(contacts: Contact[]): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(contacts)
    );
  }


  private mockData() {
    const initialContacts: Contact[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', phoneNumber: '123-456-7890', email: 'john.doe@example.com', birthDate: '1990-01-01', address: '123 Main St' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', phoneNumber: '987-654-3210', email: 'jane.smith@example.com', birthDate: '1995-05-15', address: '456 Elm St' }
    ];
    this.contactsSubject.next(initialContacts);
    this.saveContactsToLocalStorage(initialContacts);
  }
}
