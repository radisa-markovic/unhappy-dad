import { BehaviorSubject, from, interval, Observable, of, pipe } from "rxjs";
import { distinctUntilChanged, finalize, map, mapTo, switchMap, take, tap } from "rxjs/operators";
import { CaleKomponenta } from "../components/CaleKomponenta";

export default class Reaktivnost
{
    /*nista, imam tajmer, sad mi treba farbanje kontejnera zavisno od nivoa zadovoljstva,
        -omoguciti primanje plate na svakih n sekundi
        -ako je zena nezadovoljna, onda omoguciti uzimanje novca od plate na svakih 2 sekunde, 
        i to doda zadovoljstvo
        -omoguciti da deca uzmu novac iz steka ako su nezadovoljna, na svakih 3 sekunde npr
        -odraditi krajnji cilj u zivotu za caleta (10 zadovoljstvo, i 200 000 u steku) i kraj svega
    */
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
                komponenta.innerHTML = `${stariTekst} ${broj.toString()}s`;
            }),
            finalize(() => {
                komponenta.innerHTML = stariTekst;
                komponenta.disabled = false;
            })
        );

       tajmerZaDugme$.subscribe();
    }

    ofarbajKontejner(kontejner: HTMLElement, prikazSrece: HTMLSpanElement, nivoZadovoljstva: number): void
    {
        this.promenaZadovoljstva$.subscribe((nivoZadovoljstva) => {

            if(nivoZadovoljstva < 3)
                kontejner.style.backgroundColor = 'red';
            if(nivoZadovoljstva >= 3 && nivoZadovoljstva <= 7)
                kontejner.style.backgroundColor = 'yellow';
            if(nivoZadovoljstva > 7)
                kontejner.style.backgroundColor = 'green';

            //treba da se doradi... mada ono
            console.log(prikazSrece);
            console.log(nivoZadovoljstva);
            prikazSrece.innerHTML = `Novo zadovoljstvo ${nivoZadovoljstva}`; 
        });
    }

    uplatiCaletuPlatu(kontejner: HTMLElement, 
                      iznosPlate: number, 
                      azuriranjePrikaza: (iznos: number) => void): void
    {
        const kontejnerZaVremeIsplate = kontejner.querySelector("span[name='vremeIsplate']")!;
        const kontejnerPromenePlate = kontejner.querySelector("span[name='promenaUIznosuPlate']")!;
        const vremeUplate = 10;
        
        const tajmerPlate$ = interval(1000).pipe(
            map(vrednost => vrednost % vremeUplate),
            map(broj => vremeUplate - broj)
        );

        tajmerPlate$.subscribe((vrednost) => {
            kontejnerZaVremeIsplate.innerHTML = `Nova uplata za: ${vrednost.toString()} s`;
            if(vrednost === 1)
            {
                kontejnerPromenePlate!.innerHTML = `Leglo je +${iznosPlate}`;
                azuriranjePrikaza(iznosPlate);
            }
            else
            {
                kontejnerPromenePlate.innerHTML = "";
            }
        });
    }

};