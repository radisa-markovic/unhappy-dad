import { Obaveza } from './Obaveza.js';
import { interval } from 'rxjs';
import { switchMap, map, distinctUntilChanged, filter, tap } from 'rxjs/operators';

export class Dete extends Obaveza
{
    constructor(ime, prezime, godine, prohtevZaParama, cale)
    {
        super(ime, prezime, godine, prohtevZaParama, null);
        this.cale = cale;
        this.nivoZadovoljstva = 5;//nek bude neutralno

        this.pracenjeCaletovogStekaSubscription = interval(400).
                                       pipe(switchMap(() => this.cale.emitovanjeSteka$))
                                       .subscribe(() => console.log("Nije uradjeno subscribe za pracenje"));
                                        //neki if da uradim, npr uzmi pare van redosleda, al samo jednom, bem ga
                                        //ili da uradim "curenje"
        this.promenaZadovoljstva$ = interval((100 - this.godine) * 100)
                                    .pipe(map(vrednost => this.nivoZadovoljstva - 1),
                                          distinctUntilChanged()
                                          )
        this.promenaZadovoljstvaSubscription = this.promenaZadovoljstva$.subscribe((vrednost) => {
                                        this.nivoZadovoljstva = vrednost;
                                    });
        
        this.pracenjeCaletovogStekaSubscription.add(this.promenaZadovoljstvaSubscription);
        this.promenaZadovoljstvaSubscription.add(this.farbanjeKontejneraSubscription);
    }

    nacrtajDete()
    {
        document.getElementById("natkontejnerDece").querySelector("h3").innerHTML = "Deca:";
        this.kontejner = document.createElement('div');
        this.kontejner.className = 'list-group';
        this.kontejner.innerHTML = super.vratiSadrzajObaveze();
        this.kontejner.innerHTML += `<button name="btnPodmiti" value="5000">Podmiti</button>`;

        let kontejnerSvakogDeteta = document.getElementById('kontejnerDece');
        kontejnerSvakogDeteta.appendChild(this.kontejner);

        this.kontejner.querySelector('button[name="btnPodmiti"]').addEventListener("click", () =>
                                                            this.uzmiPareOdCaleta(event.target));
    }

    uzmiPareOdCaleta(kliknutoDugme)
    {
        if((this.cale.tajniStek - this.prohtevZaParama * 1000) >= 0)
        {//jedan switchMap mislim da resava posao
            kliknutoDugme.disabled = true;
            this.cale.azurirajStek(-1 * this.prohtevZaParama * 1000);//bolje je neko dete uciniti srecnijim zbog posledica
            this.cale.azurirajZadovoljstvo(1);
            this.nivoZadovoljstva += 3;
            this.kontejner.querySelector("input[name='inpZadovoljstvoObaveze']").value = this.nivoZadovoljstva;

            let odbrojavanje = parseInt(kliknutoDugme.value) / 1000;
            let tajmerNeaktivnosti = setInterval(() => kliknutoDugme.innerHTML = odbrojavanje--, 1000);

            setTimeout(() => {
                kliknutoDugme.disabled = false;
                kliknutoDugme.innerHTML = `Podmiti`;
                clearInterval(tajmerNeaktivnosti);
            }, parseInt(kliknutoDugme.value) + 2000);
        }
        else
            alert(`Ćale nema dovoljno novca, potrebno je ${this.prohtevZaParama * 1000} da se dete podmiti`)
    }
}