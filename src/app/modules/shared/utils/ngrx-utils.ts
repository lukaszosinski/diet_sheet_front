import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';


export function selectFirst<T, K>(store: Store<T>, selector: (t: T) => K): Observable<K> {
  return store.select<K>(selector).pipe(first());
}
