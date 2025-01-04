import {FormControl} from "@angular/forms";

export interface Contact {
  id: number | null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  birthDate?: string;
  address?: string;
}


export interface ContactForm {
  id: FormControl<number | null>;
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  phoneNumber: FormControl<string | null>;
  email?: FormControl<string | null>;
  birthDate?: FormControl<string | null>;
  address?: FormControl<string | null>;
}
