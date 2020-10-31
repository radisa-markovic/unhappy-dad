import { ObavezaKomponenta } from './ObavezaKomponenta';
import { CaleKomponenta } from './CaleKomponenta';
import { Dete } from '../models/Dete';
import Reaktivnost from '../reaktivneStvari/Reaktivnost';

export class DeteKomponenta extends ObavezaKomponenta
{
    public reaktivnost: Reaktivnost;

    constructor(public deteModel: Dete, public cale: CaleKomponenta)
    {
        super(deteModel, 0);//preracunati nivoZadovoljstva posle
        this.reaktivnost = new Reaktivnost(0);
    }

    nacrtajDete(): HTMLElement
    {
        super.nacrtajObavezu();
        this.kontejner.querySelector("h3")!.innerHTML = "Dete";
        
        this.kontejner.innerHTML += `
            <button name="btnPodmiti" 
                    value="5000" 
                    title="Daj {this.prohtevZaParama * 1000} da bi povećao detetu zadovoljstvo za 3">
                    Podmiti (košta: {this.prohtevZaParama * 1000})
            </button>
        `;

        this.kontejner.querySelector('button[name="btnPodmiti"]')!.addEventListener("click", (event) => {
            this.uzmiPareOdCaleta(event);
            this.reaktivnost.zakljucajDugme((<HTMLButtonElement>event.target)!, 7);
        });

        return this.kontejner;
    }

    uzmiPareOdCaleta(event: Event): void
    {
        if(this.cale.caleModel.tajniStek /* this.prohtevZaParama * 1000*/ >= 0)
        {
            this.cale.azurirajStek(-1 /** this.prohtevZaParama*/ * 1000);
            this.cale.azurirajZadovoljstvo(1);

            this.azurirajZadovoljstvo(3);        }
    }
}