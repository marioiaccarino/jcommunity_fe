import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-uikit',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  template: `
    <button class="btn" routerLink="accordion" routerLinkActive="btn-active">Accordion</button>
    <button class="btn" routerLink="alert" routerLinkActive="btn-active">Alert</button>
    <button class="btn" routerLink="dropdown" routerLinkActive="btn-active">Dropdown</button>
    <button class="btn" routerLink="phone" routerLinkActive="btn-active">Phone</button>
    <button class="btn" routerLink="timeline" routerLinkActive="btn-active">Timeline</button>
    <button class="btn" routerLink="variant-icon" routerLinkActive="btn-active">Variant Icon</button>

    <div>
      <router-outlet />
    </div>
  `,
  styles: ``
})
export default class UikitComponent {

}
