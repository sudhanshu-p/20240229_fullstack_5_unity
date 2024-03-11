import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-homepage-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './homepage-sidebar.component.html',
  styleUrl: './homepage-sidebar.component.css'
})
export class HomepageSidebarComponent {
  @Input() categoryData: Array<String> = [];
}
