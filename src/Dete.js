import { Obaveza } from './Obaveza.js';
import { interval } from 'rxjs';
import { switchMap, map, distinctUntilChanged, filter, tap } from 'rxjs/operators';

export class Dete extends Obaveza
{
    constructor(ime, prezime, godine, prohtevZaParama, cale)
    {
        super(ime, prezime, godine, prohtevZaParama, null);
        this.cale = cale;
        this.nivoZadovoljstva = 5;

        this.promenaZadovoljstva$ = interval((100 - this.godine) * 100)
                                    .pipe(map(vrednost => this.nivoZadovoljstva - 1),
                                          distinctUntilChanged());
        this.promenaZadovoljstvaSubscription = this.promenaZadovoljstva$.subscribe((vrednost) => {
                                        this.nivoZadovoljstva = vrednost;
                                    });
                                    
        this.pracenjeCaletovogStekaSubscription = this.promenaZadovoljstva$
                                                  .subscribe((vrednost) => {//treba mi mehanizam da cale prebaci pare u stek, ako nema
                                                      if(this.nivoZadovoljstva <= 4)
                                                        this.cale.azurirajStek(-1 * this.prohtevZaParama * 1000);
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
        {
            kliknutoDugme.disabled = true;
            this.cale.azurirajStek(-1 * this.prohtevZaParama * 1000);
            this.cale.azurirajZadovoljstvo(1);

            super.azurirajZadovoljstvo(3);
            let odbrojavanje = parseInt(kliknutoDugme.value) / 1000;
            let tajmerNeaktivnosti = setInterval(() => kliknutoDugme.innerHTML = odbrojavanje--, 1000);

            setTimeout(() => {
                if(!this.cale.krajnjiCiljUZivotu())
                    kliknutoDugme.disabled = false;
                kliknutoDugme.innerHTML = `Podmiti`;
                clearInterval(tajmerNeaktivnosti);
            }, parseInt(kliknutoDugme.value) + 2000);
            
        }
        else
            alert(`Ćale nema dovoljno novca, potrebno je  jos ${this.prohtevZaParama * 1000 - this.cale.tajniStek} da se dete podmiti`)
    }
}