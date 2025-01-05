import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-avatar',
  imports: [NgClass],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  standalone: true,
})
export class AvatarComponent {
  @Input() color!: string;
  @Input() label!: string;
  @Input() size: 'large' | 'medium' | 'small' = 'medium';
}
