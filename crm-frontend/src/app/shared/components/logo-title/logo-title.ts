import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo-title',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './logo-title.html',
  styleUrl: './logo-title.css',
})
export class LogoTitle {
  @Input() size: string = 'text-5xl';
  @Input() link: boolean = false;
  @Input() url: string = '/';      
}
