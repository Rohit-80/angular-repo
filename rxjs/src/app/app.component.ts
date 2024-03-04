import { Component, OnInit } from '@angular/core';
import {
  EMPTY,
  buffer,
  bufferCount,
  bufferTime,
  bufferToggle,
  combineLatest,
  concat,
  concatMap,
  defer,
  delay,
  exhaustMap,
  expand,
  from,
  fromEvent,
  generate,
  interval,
  map,
  merge,
  mergeScan,
  of,
  window,
  race,
  range,
  switchMap,
  take,
  timer,
  mergeAll,
  audit,
  debounce,
  scan,
  distinct,
  elementAt,
  sample,
  skipWhile,
  startWith,
  catchError,
  throwError,
  mergeMap,
  retry,
  tap,
  delayWhen,
  materialize,
  NextNotification,
  ErrorNotification,
  dematerialize,
  timeInterval,
  timestamp,
  toArray,
  defaultIfEmpty,
  takeUntil,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'rxjs';

  //rxjs operators

  ngOnInit(): void {
    // let  ajaxObs = ajax('https://api.github.com/users?per_page=5').pipe(take(3));
    //  ajaxObs.subscribe(console.log);

    // defer(()=>interval(1000).pipe(take(3))).subscribe(console.log);

    // let src = from([12, 16, 18]);

    // fromEvent(document,'click').subscribe(console.log)

    // generate(0,x => x < 4,x=>x+1).subscribe(console.log)

    // timer(500,1000).pipe(concatMap(()=>src)).subscribe(console.log)

    // const firstTimer = timer(0, 1000); // emit 0, 1, 2... after every second, starting from now
    // const secondTimer = timer(500, 1000); // emit 0, 1, 2... after every second, starting 0,5s from now
    // const combinedTimers = combineLatest([firstTimer, secondTimer]);
    // combinedTimers.subscribe(value => console.log(value));

    // const timer = interval(1000).pipe(take(4));
    // const sequence = range(1, 1000000000);
    // const result = concat(timer, sequence);
    // result.subscribe((x) => console.log(x));

    // const timer1 = interval(1000).pipe(take(10));
    // const timer2 = interval(2000).pipe(take(6));
    // const timer3 = interval(500).pipe(take(10));

    // const concurrent = 2; // the argument
    // const merged = merge(timer1, timer2, timer3, concurrent);
    // merged.subscribe((x) => console.log(x));

    // const obs1 = interval(7000).pipe(map(() => 'slow one'));
    // const obs2 = interval(3000).pipe(map(() => 'fast one'));
    // const obs3 = interval(5000).pipe(map(() => 'medium one'));

    // race(obs1, obs2, obs3)
    //   .subscribe(winner => console.log(winner));

    // const clicks = fromEvent(document, 'click');
    // const intervalEvents = interval(1000);
    // const buffered = intervalEvents.pipe(buffer(clicks));
    // buffered.subscribe((x) => console.log(x));
    // const clicks = fromEvent(document, 'click');
    // const buffered = clicks.pipe(bufferCount(3,1));
    // buffered.subscribe(x => console.log(x));

    // const clicks = fromEvent(document, 'click');
    // const buffered = clicks.pipe(bufferTime(2000, 5000));
    // buffered.subscribe(x => console.log(x));

    // const clicks = fromEvent(document, 'click');
    // const openings = interval(1000);
    // const buffered = clicks.pipe(
    //   bufferToggle(openings, (i) => (i % 2 ? interval(500) : EMPTY))
    // );
    // buffered.subscribe((x) => console.log(x));

    // const clicks = fromEvent(document, 'click');
    // const result = clicks.pipe(
    //   concatMap(ev => interval(100).pipe(take(4)))
    // );
    // result.subscribe(x => console.log(x));

    // const clicks = fromEvent(document, 'click');
    // const result = clicks.pipe(exhaustMap(() => interval(1000).pipe(take(5))));
    // result.subscribe((x) => console.log(x));

    // const clicks = fromEvent(document, 'click');
    // const powersOfTwo = clicks.pipe(
    //   map(() => 1),
    //   expand((x) => of(2 * x).pipe(delay(1))),
    //   // take(10)
    // );
    // powersOfTwo.subscribe((x) => console.log(x));

    // const click$ = fromEvent(document, 'click');
    // const one$ = click$.pipe(map(() => 1));
    // const seed = 0;
    // const count$ = one$.pipe(
    //   mergeScan((acc, one) => of(acc + one), seed)
    // );count$.subscribe(x => console.log(x));

    // const clicks = fromEvent(document, 'click');
    // const result = clicks.pipe(switchMap(() => interval(1000)));
    // result.subscribe(x => console.log(x));

    // const clicks = fromEvent(document, 'click');
    // const sec = interval(1000);
    // const result = clicks.pipe(
    //   window(sec),
    //   map(win => win.pipe(take(2))), // take at most 2 emissions from each window
    //   mergeAll()                     // flatten the Observable-of-Observables
    // );
    // result.subscribe(x => console.log(x));

    /* ---------------------------------------------------------- Filter Operators ------------------------------------- */

    // const clicks = fromEvent(document, 'click');
    // const result = clicks.pipe(audit(ev => interval(1000)));
    // result.subscribe(x => console.log(x));

    // const clicks = fromEvent(document, 'click');
    // const result = clicks.pipe(
    //   scan(i => ++i, 1),
    //   debounce(i => interval(200 * i))
    // );
    // result.subscribe(x => console.log(x));

    // of(1, 1, 2, 2, 2, 1, 2, 3, 4, 3, 2, 1)
    //   .pipe(distinct())
    //   .subscribe(x => console.log(x));

    //   const clicks = fromEvent(document, 'click');
    // const result = clicks.pipe(elementAt(2));
    // result.subscribe(x => console.log(x));

    // const seconds = interval(1000);
    // const clicks = fromEvent(document, 'click');
    // const result = clicks.pipe(sample(seconds))

    // result.subscribe(x => console.log(x));

    // const source = from(['Green Arrow', 'SuperMan', 'Flash', 'SuperGirl', 'Black Canary'])
    // // Skip the heroes until SuperGirl
    // const exmp = source.pipe(skipWhile(hero => hero !== 'SuperGirl'));
    // // output: SuperGirl, Black Canary
    // exmp.subscribe(femaleHero => console.log(femaleHero));

    // const clicks = fromEvent(document, 'click');
    // const higherOrder = clicks.pipe(
    //   map(() => interval(1000).pipe(take(10)))
    // );
    // const firstOrder = higherOrder.pipe(mergeAll(2));

    // firstOrder.subscribe(x => console.log(x));

    // timer(1000)
    //   .pipe(
    //     map(() => 'timer emit'),
    //     startWith('Hi 0_0 timer start')
    //   )
    //   .subscribe(x => console.log(x));

    // of(1, 2, 3, 4, 5)
    // .pipe(
    //   map(n => {
    //     if (n === 4) {
    //       throw 'four!';
    //     }
    //     return n;
    //   }),
    //   catchError(err => of('I', 'II', 'III', 'IV', 'V'))
    // )
    // .subscribe(x => console.log(x));

    // const source = interval(1000);
    // const result = source.pipe(
    //   mergeMap(val => val > 5 ? throwError(() => 'Error!') : of(val)),
    //   retry(2) // retry 2 times on error
    // );

    // result.subscribe({
    //   next: value => console.log(value),
    //   error: err => console.log(`${ err }: Retried 2 times then quit!`)
    // });

    // const source = of(1, 2, 3, 4, 5);

    // source.pipe(
    //   tap(n => {
    //     if (n > 3) {
    //       throw new TypeError(`Value ${ n } is greater than 3`);
    //     }
    //   })
    // )
    // .subscribe({ next: console.log, error: err => console.log(err.message) });

    // const clicks = fromEvent(document, 'click');
    // const delayedClicks = clicks.pipe(
    //   delayWhen(() => interval(Math.random() * 5000))
    // );
    // delayedClicks.subscribe(x => console.log(x));

    // const letters = of('a', 'b', 13, 'd');
    // const upperCase = letters.pipe(map((x: any) => x.toUpperCase()));
    // const materialized = upperCase.pipe(materialize());

    // materialized.subscribe(x => console.log(x));

    // const notifA: NextNotification<string> = { kind: 'N', value: 'A' };
    // const notifB: NextNotification<string> = { kind: 'N', value: 'B' };
    // const notifE: ErrorNotification = { kind: 'E', error: new TypeError('x.toUpperCase is not a function') };

    // const materialized = of(notifA, notifB, notifE);

    // const upperCase = materialized.pipe(dematerialize());
    // upperCase.subscribe({
    //   next: x => console.log(x),
    //   error: e => console.error(e)
    // });

    // const seconds = interval(90);

    // seconds
    //   .pipe(timeInterval())
    //   .subscribe(value => console.log(value));

    const clickWithTimestamp = fromEvent(document, 'click').pipe(timestamp());

    // Emits data of type { value: PointerEvent, timestamp: number }
    clickWithTimestamp.subscribe((data) => {
      console.log(data);
    });

    const source = interval(1000);
    const example = source.pipe(take(10), toArray());
    example.subscribe(console.log);

    const clicks = fromEvent(document, 'click');
    const clicksBeforeFive = clicks.pipe(takeUntil(interval(5000)));
    const result = clicksBeforeFive.pipe(defaultIfEmpty('no clicks'));
    result.subscribe((x) => console.log(x));
  }
}
