import { BehaviorSubject, from, interval, Observable, of, pipe } from "rxjs";
import { distinctUntilChanged, finalize, map, mapTo, switchMap, take, tap } from "rxjs/operators";

export default class Reaktivnost
{
    /*nista, imam tajmer, sad mi treba farbanje kontejnera zavisno od nivoa zadovoljstva*/
    public promenaZadovoljstva$: BehaviorSubject<number>;
    constructor(private reaktivniParametar: number)
    {
        this.promenaZadovoljstva$ = new BehaviorSubject(this.reaktivniParametar);
    }

    zakljucajDugme(komponenta: HTMLButtonElement, vremeTrajanja: number): void
    {
        komponenta.disabled = true;
        const stariTekst = komponenta.innerHTML;

        const tajmerZaDugme$ = interval(1000).pipe(
            map(broj =>  vremeTrajanja - broj), //za brojanje unazad
            take(vremeTrajanja + 1), //+1 je da bi brojao do 0, ovako izgleda nece da je prikaze na HTML, iako odbroji dotle
            tap((broj) => {
                komponenta.innerHTML = broj.toString();
            }),
            finalize(() => {
                komponenta.innerHTML = stariTekst;
                komponenta.disabled = false;
            })
        );

       tajmerZaDugme$.subscribe();
    }

    ofarbajKontejner(kontejner: HTMLElement, nivoZadovoljstva: number): void
    {
        this.promenaZadovoljstva$.next(nivoZadovoljstva);//da vidim dal ovo radi

        this.promenaZadovoljstva$.subscribe((nivoZadovoljstva) => {
            console.log(nivoZadovoljstva);

            if(nivoZadovoljstva < 3)
                kontejner.style.backgroundColor = 'red';
            if(nivoZadovoljstva >= 3 && nivoZadovoljstva <= 7)
                kontejner.style.backgroundColor = 'yellow';
            if(nivoZadovoljstva > 7)
                kontejner.style.backgroundColor = 'green';
        });
    }

};