import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.recuder';
import { Observable } from 'rxjs';
import * as fromSettings from './settings.reducer';

@Component({
  selector: 'diet-settings',
  template: `
      <p>
          settings works!
      </p>
  `,
  styleUrls: [ './settings.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {

  constructor(private store: Store<AppState>) { }

  selectSettings(): Observable<fromSettings.State> {
    return this.store.select(fromSettings.selectSettings);
  }
}
