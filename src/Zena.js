import { Obaveza } from './Obaveza.js';
import { interval } from 'rxjs';
import { map, distinctUntilChanged, tap, filter } from 'rxjs/operators';

export class Zena extends Obaveza
{
    constructor(ime, prezime, godine, prohtevZaParama, muz)
    {
        super(ime, prezime, godine, prohtevZaParama, document.getElementsByName('zeninKontejner')[0]);
        this.muz = muz;
   
        this.promenaRaspolozenja$ = interval((100 - this.godine) * 500)
                                    .pipe(map(vrednost => vrednost - 2),
                                          filter(vrednost => vrednost < 10),
                                          tap(vrednost => console.log("Medjuzadovoljstvo: " + vrednost)),
                                          distinctUntilChanged()
                                    );

        this.pracenjeMuzevePlateSubscription = this.muz.primanjePlate$
                                               .subscribe(() => {
                                                   if(this.nivoZadovoljstva < 5)
                                                        this.uzmiMuzuPare();
                                               });

        this.promenaRaspolozenjaSubscription = this.promenaRaspolozenja$.subscribe(vrednost => this.nivoZadovoljstva = vrednost);
        this.promenaRaspolozenjaSubscription.add(this.farbanjeKontejneraSubscription);
        this.muz.primanjePlateSubscription.add(this.promenaRaspolozenjaSubscription);
    }

    nacrtajZenu()
    {
        this.kontejner.querySelector("h3").innerHTML = "Žena:";
        this.kontejner.innerHTML += super.vratiSadrzajObaveze();
        let posebanSadrzajZaZenu = `<div class="btn-group-vertical">
                <button name="btnIzvediZenuNaVeceru" value="${this.prohtevZaParama * 100}" class="btn btn-success" title="+1 sreća za oca +1, za ženu, -${this.prohtevZaParama * 1000} od novca od plate">Izvedi na večeru</button>
                <button name="btnIzvediZenuUKupovinu" value="${this.prohtevZaParama * 100}" class="btn btn-success" title="+2 sreća za oca, +2 za ženu, -${this.prohtevZaParama * 1000} od novca od plate">Idi u kupovinu</button>
                <button name="btnPozajmiPareOdTazbine" value="100000" class="btn btn-success" title="+100 000 u štek ulazi, -5 sreća za muža">Pozajmi novac od tazbine </button>
                </div>
        `;
        this.kontejner.innerHTML += posebanSadrzajZaZenu;

        this.kontejner.querySelector(`button[name="btnIzvediZenuNaVeceru"]`).addEventListener(`click`, (event) => this.izvediZenuNegde(event.target, 1));
        this.kontejner.querySelector(`button[name="btnIzvediZenuUKupovinu"]`).addEventListener(`click`, (event) => this.izvediZenuNegde(event.target, 2));

        this.kontejner.querySelector(`button[name="btnPozajmiPareOdTazbine"]`).addEventListener(`click`, (event) => this.uzmiPareOdTazbine(event.target));

        this.preracunajPocetnoZadovoljstvo();
    }

    preracunajPocetnoZadovoljstvo()
    {
        let muzevaPlata = this.muz.plata;
        this.nivoZadovoljstva += (Math.trunc(muzevaPlata / 10000) - Math.trunc(this.godine / 10)) % 10;
        this.kontejner.querySelector("input[name='inpZadovoljstvoObaveze']").value = this.nivoZadovoljstva;
    }

    uzmiMuzuPare()
    {
        this.muz.azurirajNovacOdPlate(-1 * (10 - this.nivoZadovoljstva) * 50 * this.prohtevZaParama);
    }

    izvediZenuNegde(dugmeAkcije, dodatakZadovoljstvu)
    {  
        if(this.muz.novacOdPlate - parseInt(dugmeAkcije.value) >= 0)
        {
            dugmeAkcije.disabled = true;
            this.muz.azurirajNovacOdPlate(-1 * parseInt(dugmeAkcije.value));
            this.muz.azurirajZadovoljstvo(dodatakZadovoljstvu);
            super.azurirajZadovoljstvo(dodatakZadovoljstvu);        
            
            let stariTekst = dugmeAkcije.innerHTML;
            let vrednostTajmera = parseInt(dugmeAkcije.value) / 1000;
            let vrednostZaTimeout = (vrednostTajmera + 2) * 1000;
            let tajmerNeaktivnosti = setInterval(() => dugmeAkcije.innerHTML = vrednostTajmera--, 1000);
            setTimeout(() => {
                if(!this.muz.krajnjiCiljUZivotu())
                    dugmeAkcije.disabled = false;
                dugmeAkcije.innerHTML = stariTekst;
                clearInterval(tajmerNeaktivnosti);
            }, vrednostZaTimeout);
        }
    }

    uzmiPareOdTazbine(dugmeAkcije)
    {
        this.muz.azurirajStek(parseInt(dugmeAkcije.value));
        this.muz.azurirajZadovoljstvo(-5);
        dugmeAkcije.disabled = true;

        let stariTekst = dugmeAkcije.innerHTML;
        let vrednostTajmera = 15;
        let vrednostZaTimeout = (vrednostTajmera + 2) * 1000;
        let tajmerNeaktivnosti = setInterval(() => dugmeAkcije.innerHTML = vrednostTajmera--, 1000);
        setTimeout(() => {
            if(!this.muz.krajnjiCiljUZivotu())
                dugmeAkcije.disabled = false;
            dugmeAkcije.innerHTML = stariTekst;
            clearInterval(tajmerNeaktivnosti);
        }, vrednostZaTimeout);
    }
}