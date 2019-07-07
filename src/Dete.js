import { Obaveza } from './Obaveza.js';
import { interval } from 'rxjs';
import { map, distinctUntilChanged, sample } from 'rxjs/operators';
import * as bajaFunkcije from './MojeUtilityFunkcije';


export class Dete extends Obaveza
{
    constructor(ime, prezime, godine, prohtevZaParama, cale)
    {
        super(ime, prezime, godine, prohtevZaParama, null);
        this.cale = cale;
        this.nivoZadovoljstva = 5;

        this.promenaZadovoljstva$ = interval((100 - this.godine) * 100).pipe(
            sample(interval((100 - this.godine) * 50)), //nek sempluje upola manje od generisanja 
            map(vrednost => this.nivoZadovoljstva - 1),
            distinctUntilChanged()
        );
        this.promenaZadovoljstvaSubscription = this.promenaZadovoljstva$.subscribe((vrednost) => {
                                        this.nivoZadovoljstva = vrednost;
                                    });
        //nije skroz korektno, imam ono prekidanje i osposobljavanje dugmeta kad ne bi trebalo
        //tj ubaci se ovaj observable ovde gde kao ne bi trebao da se ubaci...
        //...nista, da smislim ovaj switchMap gde ide i gde ide scan
        //ovo cu da regulisem kad sutra budem odmorniji
        
        
        //switchMap se koristi kad se opali jedan dogadjaj, ja uzmem drugi pa njegove vrednosti tumacim
        //sad je samo do sinhronizacije, ne stize informacija o steku kako treba, tj sporo ide i to vecno prvi
        //ovde mozda i neki merege dolazi u opticaj, trebam da nateram da tajmer saceka...
        //...ovo da se zavrsi, tj nema unakrsnog disable-a i tih stvari
        //...vtals fhou vaikavt wmxos vta zamxpyxnm? gaimqem tn maives....
        this.pracenjeCaletovogStekaSubscription = this.promenaZadovoljstva$
                                                  .subscribe(() => {
                                                      let dugmePodmiti = this.kontejner.querySelector('button[name="btnPodmiti"]');
                                                      if(/*this.nivoZadovoljstva <= 4 &&*/ this.cale.tajniStek - this.prohtevZaParama * 1000 >= 0)
                                                      {
                                                        this.cale.azurirajStek(-1 * this.prohtevZaParama * 1000);
                                                        dugmePodmiti.disabled = false;
                                                          dugmePodmiti.innerHTML = `Podmiti (košta: ${this.prohtevZaParama * 10000} )`;
                                                      }
                                                      else
                                                      {
                                                          dugmePodmiti.disabled = true; 
                                                          dugmePodmiti.innerHTML = `Nema cale para, cale ima ${this.cale.tajniStek}, a treba ${this.prohtevZaParama * 1000}`;
                                                      }
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
        this.kontejner.innerHTML += `<button name="btnPodmiti" value="5000" title="Daj ${this.prohtevZaParama * 1000} da bi povećao detetu zadovoljstvo za 3">Podmiti</button>`;

        let kontejnerSvakogDeteta = document.getElementById('kontejnerDece');
        kontejnerSvakogDeteta.appendChild(this.kontejner);

        this.kontejner.querySelector('button[name="btnPodmiti"]').addEventListener("click", () =>
                                                            this.uzmiPareOdCaleta(event));
    }

    uzmiPareOdCaleta(event)
    {
        let kliknutoDugme = event.target;
        if((this.cale.tajniStek - this.prohtevZaParama * 1000) >= 0)
        {
            this.cale.azurirajStek(-1 * this.prohtevZaParama * 1000);
            this.cale.azurirajZadovoljstvo(1);

            super.azurirajZadovoljstvo(3);
            bajaFunkcije.hendlerKlikaSaTajmerom(event);
        }
    }
}