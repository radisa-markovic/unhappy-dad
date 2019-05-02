import { Obaveza } from './Obaveza.js';
import { interval } from 'rxjs';
import { map, distinctUntilChanged, switchMap } from 'rxjs/operators';

export class Zena extends Obaveza
{
    constructor(ime, prezime, godine, prohtevZaParama, muz)
    {
        super(ime, prezime, godine, prohtevZaParama, document.getElementsByName('zeninKontejner')[0]);
        this.muz = muz;

        this.kreirajPotrebuZaSvadjom$ = interval(1000)
                                        .pipe(switchMap( () => this.emitovanjeZadovoljstva$),
                                        distinctUntilChanged())
                                        .subscribe(() => this.zapocniSvadju());

        this.promenaRaspolozenja$ = interval((100 - this.godine) * 50)
                                    .pipe(map(vrednost => Math.floor(Math.random() * 10)),
                                          distinctUntilChanged()
                                    );

        this.pracenjeMuzevePlateSubscription = this.muz.emitovanjePlate$
                                               .subscribe(() => {
                                                   this.uzmiMuzuPare();
                                               })

        this.promenaRaspolozenjaSubscription = this.promenaRaspolozenja$.subscribe(vrednost => this.nivoZadovoljstva = vrednost);
        this.promenaRaspolozenjaSubscription.add(this.farbanjeKontejneraSubscription);//to je ondaj add subscription
    }

    //ovde isto moze da ide jedan "super" u klasi Obaveza, pa da se dodaju neke pojedinosti
    nacrtajZenu()
    {
        this.kontejner.querySelector("h3").innerHTML = "Žena:";
        this.kontejner.innerHTML += super.vratiSadrzajObaveze();
        this.preracunajPocetnoZadovoljstvo();
    }

    zapocniSvadju()
    {//ovde cu da "unsubscribe-ujem" kad se javi svadja, pa nakon svadje opet subscribe
        if(this.kontejner.querySelector("button"))
            this.kontejner.removeChild(this.kontejner.querySelector("button"));

        if(this.nivoZadovoljstva < 4)
        {
            let dugmeSvadje = document.createElement("button");
            dugmeSvadje.value = parseInt((10 - this.nivoZadovoljstva) * 5);
            dugmeSvadje.innerHTML = `Svađa (${dugmeSvadje.value})`;
            this.kontejner.appendChild(dugmeSvadje);
            dugmeSvadje.addEventListener("click", () => {
                if(dugmeSvadje.value == 0)
                {
                    dugmeSvadje.disabled = true;
                    this.nivoZadovoljstva = 5;
                    this.kontejner.querySelector(`input[name='inpZadovoljstvoObaveze']`).value = this.nivoZadovoljstva;
                    this.muz.azurirajZadovoljstvo(3);//za sada staticki, treba mi formula i za to mozda
                }
                else
                {
                    dugmeSvadje.value = this.funkcijaSvadje(dugmeSvadje.value);
                    dugmeSvadje.innerHTML = `Svađa (${dugmeSvadje.value})`;
                }
            });
        }
    }

    funkcijaSvadje(nivoLjutnje)
    {
        if(nivoLjutnje !== 0)
        {
            nivoLjutnje--;
            this.uzmiMuzuPare();
            return nivoLjutnje;
        }
        else
            return 0;
    }

    preracunajPocetnoZadovoljstvo()
    {
        let muzevaPlata = this.muz.plata;
        this.nivoZadovoljstva += (Math.trunc(muzevaPlata / 10000) - Math.trunc(this.godine / 10)) % 10;//sto je nesrecnija, odlaze pare
        this.kontejner.querySelector("input[name='inpZadovoljstvoObaveze']").value = this.nivoZadovoljstva;
    }

    uzmiMuzuPare()
    {
        this.muz.azurirajNovacOdPlate(-1 * (10 - this.nivoZadovoljstva) * 1000);
        super.azurirajZadovoljstvo(1);//nek bude ova vrednost
    }

}