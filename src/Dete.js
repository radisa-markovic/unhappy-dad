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
     
        //ovo je mehanizam da dete samo uzme pare iz steka kad je nezadovoljno...
        //...zato je subscribe na promenu zadovoljstva
        this.pracenjeCaletovogSteka = this.promenaZadovoljstva$.subscribe(() => {
            let dugmePodmiti = this.kontejner.querySelector('button[name="btnPodmiti"]');
            if(this.nivoZadovoljstva <= 4)
            {
                //stare supskripcije ostaju, te tzv zombi supskripcije menjaju tekst dugmeta
                //dal da uradim switchMap nekako, tj dal on resava moj problem?
                if(this.cale.tajniStek - this.prohtevZaParama * 1000 >= 0)
                {
                    this.cale.azurirajStek(-1 * this.prohtevZaParama * 1000);
                    dugmePodmiti.innerHTML = `Dete je nezadovoljno, podmiti ili odlazi ${this.prohtevZaParama * 1000}`;
                }            
            }
            else
                dugmePodmiti.innerHTML = `Podmiti (košta: ${this.prohtevZaParama * 1000})`;
        });
        
        this.pracenjeCaletovogSteka.add(this.promenaZadovoljstvaSubscription);
        this.promenaZadovoljstvaSubscription.add(this.farbanjeKontejneraSubscription);
    }

    nacrtajDete()
    {
        document.getElementById("natkontejnerDece").querySelector("h3").innerHTML = "Deca:";
        this.kontejner = document.createElement('div');
        this.kontejner.className = 'list-group';
        this.kontejner.innerHTML = super.vratiSadrzajObaveze();
        this.kontejner.innerHTML += `<button name="btnPodmiti" value="5000" 
                                      title="Daj ${this.prohtevZaParama * 1000} da bi povećao detetu zadovoljstvo za 3"
                                      >Podmiti (košta: ${this.prohtevZaParama * 1000})</button>`;

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