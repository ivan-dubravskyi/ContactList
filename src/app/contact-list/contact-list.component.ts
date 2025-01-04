import {Component, OnInit} from '@angular/core';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {MatTableModule} from "@angular/material/table";
import {ContactListService} from "../core/services/contact-list.service";
import {combineLatest, map, Observable, startWith} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AddContactDialogComponent} from "./components/add-contact-dialog/add-contact-dialog.component";
import {Contact} from "../core/models";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [ CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, MatButtonModule, MatTableModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent implements OnInit {

  search: FormControl = new FormControl('');
  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber', 'actions'];
  contacts$ = combineLatest([
    this.contactListService.contacts$,
    this.search.valueChanges.pipe(startWith(''))
  ]).pipe(
    map(([contacts, search ]) => this.searchContacts(contacts, search)),
  );

  constructor(
    private contactListService: ContactListService,
    private dialog: MatDialog,
    private router: Router
) { }

  ngOnInit() {
    this.contactListService.initializeContacts();
  }

  openAddDialog(): void {
    this.router.navigate(['new']);

    // const dialogRef = this.dialog.open(AddContactDialogComponent);
    //
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result !== undefined) {
    //     console.log(result)
    //     this.contactListService.saveContact(result);
    //   }
    // });
  }

  onDelete(element: any) {
    console.log(element)
    this.contactListService.deleteContact(element.id)
  }

  onEdit(row: Contact) {
    this.router.navigate(['contact', row.id, 'edit'])
  }

  onContactSelect(row: Contact) {
    this.router.navigate(['contact', row.id])
  }

  private searchContacts(contacts: Contact[], searchQuery: string): Contact[] {
    const query = searchQuery?.toLowerCase() || '';
    return contacts.filter(contact =>
      contact.firstName.toLowerCase().includes(query) ||
      contact.lastName.toLowerCase().includes(query) ||
      contact.phoneNumber.includes(query)
    );
  }

}
