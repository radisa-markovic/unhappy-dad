import { Obaveza } from '../ObavezaKomponenta/Obaveza';
import { interval, Observable } from 'rxjs';
import { map, distinctUntilChanged, tap, filter, sample } from 'rxjs/operators';
import * as bajaFunkcije from '../MojeUtilityFunkcije';
import { Cale } from '../CaleKomponenta/Cale';

export class Zena extends Obaveza
{
    constructor(ime, prezime, godine, prohtevZaParama)
    {
        super(ime, prezime, godine, prohtevZaParama, document.getElementsByName('zeninKontejner')[0]);
        this.muz = null;

        //ovo malo da razradim...
        this.promenaRaspolozenja$ = interval((100 - this.godine) * 250).pipe(
            map(vrednost => vrednost - 2),
            filter(vrednost => vrednost < 10),
            tap(vrednost => console.log("Medjuzadovoljstvo: " + vrednost)),
            distinctUntilChanged()
        );

        this.glavniSubscription = this.promenaRaspolozenja$.subscribe(vrednost => this.nivoZadovoljstva = vrednost);
    }

    nacrtajZenu()
    {
        this.kontejner.querySelector("h3").innerHTML = "Žena:";
        this.kontejner.innerHTML += super.nacrtajObavezu();
        let posebanSadrzajZaZenu = `<div class="btn-group-vertical">
                <button name="btnIzvediZenuNaVeceru" value="${this.prohtevZaParama * 100}" class="btn btn-success" title="+1 sreća za oca +1, za ženu, -${this.prohtevZaParama * 1000} od novca od plate">Izvedi na večeru</button>
                <button name="btnIzvediZenuUKupovinu" value="${this.prohtevZaParama * 100}" class="btn btn-success" title="+2 sreća za oca, +2 za ženu, -${this.prohtevZaParama * 1000} od novca od plate">Idi u kupovinu</button>
                <button name="btnPozajmiPareOdTazbine" value="10000" class="btn btn-success" title="+100 000 u štek ulazi, -5 sreća za muža">Pozajmi novac od tazbine </button>
                </div>
        `;
        this.kontejner.innerHTML += posebanSadrzajZaZenu;

        this.kontejner.querySelector(`button[name="btnIzvediZenuNaVeceru"]`).addEventListener(`click`, (event) => this.izvediZenuNegde(event, 1));
        this.kontejner.querySelector(`button[name="btnIzvediZenuUKupovinu"]`).addEventListener(`click`, (event) => this.izvediZenuNegde(event, 2));

        this.kontejner.querySelector(`button[name="btnPozajmiPareOdTazbine"]`).addEventListener(`click`, (event) => this.uzmiPareOdTazbine(event));

        this.preracunajPocetnoZadovoljstvo();
    }

    postaviMuza(muz)
    {
        this.muz = muz;
        /*
        this.glavniSubscription = this.muz.primanjePlate$.pipe(
            sample(interval(1000)),
            distinctUntilChanged()
            ).subscribe(() => { if(this.nivoZadovoljstva < 5)
                                    this.uzmiMuzuPare(); });*/

       //this.glavniSubscription.add(this.promenaRaspolozenja$.subscribe(vrednost => this.nivoZadovoljstva = vrednost));
    }

    preracunajPocetnoZadovoljstvo()
    {
        let muzevaPlata = this.muz.plata;
        this.nivoZadovoljstva += (Math.trunc(muzevaPlata / 10000) - Math.trunc(this.godine / 10)) % 10;
        this.kontejner.querySelector("input[name='inpZadovoljstvoObaveze']").value = this.nivoZadovoljstva.toString();
    }

    //ovo mogu i da uklonim odavde mislim, posto sam dodao zip tamo gde treba, samo sad da testiram
    uzmiMuzuPare()
    {
        this.muz.azurirajNovacOdPlate(-1 * (10 - this.nivoZadovoljstva) * 50 * this.prohtevZaParama);
    }

    izvediZenuNegde(event, dodatakZadovoljstvu)
    {  
        let dugmeAkcije = event.target;
        if(this.muz.novacOdPlate - parseInt(dugmeAkcije.value) >= 0)
        {
            this.muz.azurirajNovacOdPlate(-1 * parseInt(dugmeAkcije.value));
            this.muz.azurirajZadovoljstvo(dodatakZadovoljstvu);
            super.azurirajZadovoljstvo(dodatakZadovoljstvu);        
            
            bajaFunkcije.hendlerKlikaSaTajmerom(event);
        }
        else
            dugmeAkcije.innerHTML = "Nema muz pare, a ovo ne treba biti hardkodovano";
    }

    uzmiPareOdTazbine(event)
    {
        let dugmeAkcije = event.target;
        this.muz.azurirajStek(parseInt(dugmeAkcije.value) * 10);
        this.muz.azurirajZadovoljstvo(-5);
        bajaFunkcije.hendlerKlikaSaTajmerom(event);
    }
}