import { Component } from '@angular/core';
import { SolveDialogComponent } from './module/solve-dialog/solve-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SolveDialogComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Kep_Problems';
}
