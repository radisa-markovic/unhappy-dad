import { Zena } from '../models/Zena';
import Reaktivnost from '../reaktivneStvari/Reaktivnost';
import { CaleKomponenta } from './CaleKomponenta';
import { ObavezaKomponenta } from './ObavezaKomponenta';

export class ZenaKomponenta extends ObavezaKomponenta
{
    public reaktivnost: Reaktivnost;

    constructor(public zenaModel: Zena, public muz: CaleKomponenta)
    {
        super(zenaModel, 0);//nivo zadovoljstva trebam da preracunam
        this.reaktivnost = new Reaktivnost(this.nivoZadovoljstva);
    }

    nacrtajZenu(): HTMLElement
    {
        super.nacrtajObavezu();
        this.kontejner.querySelector("h3")!.innerHTML = "Žena";
        let posebanSadrzajZaZenu = `
            <div class="btn-group-vertical">
                 <button name="btnIzvediZenuNaVeceru" 
                         value="{this.prohtevZaParama * 100}" 
                         class="btn btn-success" 
                         title="+1 sreća za oca +1, za ženu, -{this.prohtevZaParama * 1000} od novca od plate">
                         Izvedi na večeru
                </button>
                <button name="btnIzvediZenuUKupovinu" 
                        value="{this.prohtevZaParama * 100}" 
                        class="btn btn-success" 
                        title="+2 sreća za oca, +2 za ženu, -{this.prohtevZaParama * 1000} od novca od plate">
                        Idi u kupovinu
                </button>
                <button name="btnPozajmiPareOdTazbine" 
                        value="10000" 
                        class="btn btn-success" 
                        title="+100 000 u štek ulazi, -5 sreća za muža">
                        Pozajmi novac od tazbine 
                </button>
            </div>
        `;
        this.kontejner.innerHTML += posebanSadrzajZaZenu;
        this.hendlujKlikove();
        this.reaktivnost.ofarbajKontejner(this.kontejner, this.nivoZadovoljstva);

        return this.kontejner;
    }

    hendlujKlikove(): void
    {
        this.kontejner.querySelector("button[name='btnIzvediZenuNaVeceru']")!.addEventListener("click", (event) => { 
            this.izvediZenuNegde(event, 1) 
            this.reaktivnost.zakljucajDugme((<HTMLButtonElement>event.target)!, 10);
            
            this.reaktivnost.promenaZadovoljstva$.next(this.nivoZadovoljstva);
            this.muz.reaktivnaStvar.promenaZadovoljstva$.next(this.muz.nivoZadovoljstva);
        });
        this.kontejner.querySelector("button[name='btnIzvediZenuUKupovinu']")!.addEventListener("click", (event) => {
            this.izvediZenuNegde(event, 2)
            this.reaktivnost.zakljucajDugme((<HTMLButtonElement>event.target)!, 15);
            
            this.reaktivnost.promenaZadovoljstva$.next(this.nivoZadovoljstva);
            this.muz.reaktivnaStvar.promenaZadovoljstva$.next(this.muz.nivoZadovoljstva);
        });
        this.kontejner.querySelector("button[name='btnPozajmiPareOdTazbine']")!.addEventListener("click", (event) => {
            this.pozajmiMuzuPareOdTazbine();
            this.reaktivnost.zakljucajDugme((<HTMLButtonElement>event.target)!, 20);
            
            this.reaktivnost.promenaZadovoljstva$.next(this.nivoZadovoljstva);
            this.muz.reaktivnaStvar.promenaZadovoljstva$.next(this.muz.nivoZadovoljstva);
        });

        
    }

    izvediZenuNegde(event: Event, dodatakZadovoljstvu: number): void
    {
        super.azurirajZadovoljstvo(dodatakZadovoljstvu);
        this.muz.azurirajZadovoljstvo(3);//nema se redux
        //odraditi nekako formulu za ovo...
        this.muz.azurirajNovacOdPlate(-1 * (10 - this.nivoZadovoljstva) * 50 /** this.prohtevZaParama*/);
    }

    pozajmiMuzuPareOdTazbine(): void
    {
        this.muz.azurirajStek(200000);//nije bas taj stek onda tajni, al sta je tu je
        this.muz.azurirajZadovoljstvo(-5);//kazna za sujetu, mada opet vecna debata dal nivo zadovoljstva treba ovde biti
    }

}