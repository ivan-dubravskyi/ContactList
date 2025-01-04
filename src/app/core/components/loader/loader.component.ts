import { Component } from '@angular/core';
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-loader',
  imports: [
    MatProgressSpinner,
  ],
  templateUrl: './loader.component.html',
  standalone: true,
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {

}
