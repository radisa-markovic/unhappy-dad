import { Obaveza } from "../models/Obaveza";

export class ObavezaKomponenta
{
    public kontejner: HTMLElement;

    //neke stvari cu da dinamicki racunam, zato sam ostavio nivoZadovoljstva kao posebnu stvar
    constructor(public obavezaModel: Obaveza, 
                public nivoZadovoljstva: number)
    {
        this.kontejner = document.createElement("div");
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

    azurirajZadovoljstvo(vrednost: number): void
    {
        this.nivoZadovoljstva += vrednost;
        (<HTMLInputElement>this.kontejner.querySelector(`input[name="inpZadovoljstvoObaveze"]`))!.value = this.nivoZadovoljstva.toString();
    }
}