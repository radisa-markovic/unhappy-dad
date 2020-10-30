import { Obaveza } from "../models/Obaveza";

export class ObavezaKomponenta
{
    public kontejner: HTMLElement;

    //neke stvari cu da dinamicki racunam, zato sam ostavio nivoZadovoljstva kao posebnu stvar
    constructor(public obavezaModel: Obaveza, 
                public nivoZadovoljstva: number)
    {
        this.kontejner = document.createElement("div");
    //     this.emitovanjeZadovoljstva$ = interval(100)
    //                                    .pipe(map(vrednost => vrednost = this.nivoZadovoljstva),
    //                                          distinctUntilChanged());                        
    //     this.glavniSubscription = this.emitovanjeZadovoljstva$.subscribe((vrednost) => this.promeniBoju(vrednost));
    }

    nacrtajObavezu(): HTMLElement
    {
        const{ime,prezime,godine,prohtevZaParama}=this.obavezaModel;
        this.kontejner.innerHTML =  `
            <h3></h3>
            <p>
                Ime: <input type='text' 
                            name='inpImeObaveze' 
                            readonly 
                            value='${ime}'>
            </p>
            <p>
                Prezime: <input type='text' 
                                name='inpPrezimeObaveze' 
                                readonly 
                                value='${prezime}'>
            </p>
            <p>
                Godine: <input type='number' 
                            name='inpBrojGodina' 
                            readonly 
                            value='${godine}'>
            </p>
            <p>
                Nivo zadovoljstva: <input type='number' 
                                        name='inpZadovoljstvoObaveze' 
                                        readonly 
                                        value='${this.nivoZadovoljstva}'>
            </p>
            <p>
                Prohtev za parama: <input type='number' 
                                        name='inpProhtevZaParama' 
                                        readonly 
                                        value='${prohtevZaParama}'>
            </p>
        `;    
        
        return this.kontejner;
    }

    // promeniBoju(vrednost)
    // {
    //     if(vrednost < 4)
    //         this.kontejner.style.backgroundColor = "red";
    //     else
    //         if(vrednost < 7)
    //             this.kontejner.style.backgroundColor = "yellow";
    //         else
    //             this.kontejner.style.backgroundColor = "green";
    // }

    azurirajZadovoljstvo(vrednost: number): void
    {
        this.nivoZadovoljstva += vrednost;//videcu ako je ovo negde string
        (<HTMLInputElement>this.kontejner.querySelector(`input[name="inpZadovoljstvoObaveze"]`))!.value = this.nivoZadovoljstva.toString();
    }
}