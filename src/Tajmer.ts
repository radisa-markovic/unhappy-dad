import { timer, interval } from 'rxjs';
import { tap, map, takeUntil } from 'rxjs/operators';

export class Tajmer {
  constructor(vrednostOdbrojavanja) {
    this.countdown = vrednostOdbrojavanja;
    this.interniTajmer$ = timer((vrednostOdbrojavanja + 2) * 1000);
    this.interniInterval$ = interval(1000); //ovde mozda mogu i tajmer, a i range, pa da debounceTime uradim
    this.vrednostOdbrojavanja$ = this.interniInterval$.pipe(
      map(i => this.countdown--),
      takeUntil(this.interniTajmer$),
      tap(vrednost => {
        if (vrednost === 0)
          this.countdown = vrednostOdbrojavanja;//neki reset kao
      })
    );
  }
}