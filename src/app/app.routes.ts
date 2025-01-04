import { Routes } from '@angular/router';
import { ContactListComponent } from "./contact-list/contact-list.component";
import { ContactViewComponent } from "./contact-view/contact-view.component";
import { ContactEditorComponent } from "./contact-editor/contact-editor.component";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'contact',
  },
  {
    path: 'contact',
    component: ContactListComponent,
  },
  {
    path: 'contact/:id',
    component: ContactViewComponent
  },
  {
    path: 'contact/:id/edit',
    component: ContactEditorComponent
  },
  {
    path: 'new',
    component: ContactEditorComponent
  },
];
