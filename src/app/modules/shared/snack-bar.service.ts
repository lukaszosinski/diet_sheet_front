import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class SnackBarService {
  constructor(private snackBar: MatSnackBar,
              private translate: TranslateService
  ) {
  }

  open(messageKey: string, actionKey: string = '', duration: number = 3000): MatSnackBarRef<SimpleSnackBar> {
    const config: MatSnackBarConfig = { duration };
    return this.snackBar.open(this.translate.instant(messageKey), this.translate.instant(actionKey).toUpperCase(), config);
  }
}
