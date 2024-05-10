import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AcceuilComponent } from "./acceuil/acceuil.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, AcceuilComponent,HttpClientModule]
})
export class AppComponent {
  title = 'todoList';
}
