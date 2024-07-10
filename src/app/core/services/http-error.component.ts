import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-http-error',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf
  ],
  template: `

    <div class="bg-red-400 rounded-xl p-3 text-black">
      {{ this.message }}
    </div>
  `,
  styles: ``
})
export class HttpErrorComponent {
  @Input() message : string = '';
}
