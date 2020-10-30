import { ObavezaKomponenta } from './ObavezaKomponenta';
import { CaleKomponenta } from './CaleKomponenta';
import { Dete } from '../models/Dete';

export class DeteKomponenta extends ObavezaKomponenta
{
    constructor(public deteModel: Dete)
    {
        super(deteModel, 0);//preracunati nivoZadovoljstva posle
        
        // this.promenaZadovoljstva$ = interval((100 - this.godine) * 100).pipe(
        //     sample(interval((100 - this.godine) * 50)), //nek sempluje upola manje od generisanja 
        //     map(vrednost => this.nivoZadovoljstva - 1),
        //     distinctUntilChanged()
        // );
        // this.glavniSubscription.add(this.promenaZadovoljstva$.subscribe((vrednost) => {
        //                                 this.nivoZadovoljstva = vrednost;
        // }));
     
        // //ovo je mehanizam da dete samo uzme pare iz steka kad je nezadovoljno...
        // //...zato je subscribe na promenu zadovoljstva
        // //ovo prati caletov stek
        // this.glavniSubscription.add(this.promenaZadovoljstva$.subscribe(() => {
        //     let dugmePodmiti = this.kontejner.querySelector('button[name="btnPodmiti"]');
        //     if(this.nivoZadovoljstva <= 4)
        //     {
        //         if(this.cale.tajniStek - this.prohtevZaParama * 1000 >= 0)
        //         {
        //             this.cale.azurirajStek(-1 * this.prohtevZaParama * 1000);
        //             dugmePodmiti.innerHTML = `Dete je nezadovoljno, podmiti ili odlazi ${this.prohtevZaParama * 1000}`;
        //         }
        //         else
        //             dugmePodmiti.innerHTML = `Nema para, imam ${this.cale.tajniStek}, a treba ${this.prohtevZaParama * 1000}`;            
        //     }
        //     else
        //         dugmePodmiti.innerHTML = `Podmiti (košta: ${this.prohtevZaParama * 1000})`;
        // }));
        
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

        return this.kontejner;
        // this.kontejner.querySelector('button[name="btnPodmiti"]').addEventListener("click", () =>
        //                                                     this.uzmiPareOdCaleta(event));
    }

    // uzmiPareOdCaleta(event)
    // {
    //     if((this.cale.tajniStek - this.prohtevZaParama * 1000) >= 0)
    //     {
    //         this.cale.azurirajStek(-1 * this.prohtevZaParama * 1000);
    //         this.cale.azurirajZadovoljstvo(1);

    //         super.azurirajZadovoljstvo(3);
    //         bajaFunkcije.hendlerKlikaSaTajmerom(event);
    //     }
    // }
}