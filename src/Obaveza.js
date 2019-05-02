import { interval } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

export class Obaveza
{
    constructor(ime, prezime, godine, prohtevZaParama, kontejner)
    {
        this.ime = ime;
        this.prezime = prezime;
        this.godine = godine;
        this.nivoZadovoljstva = 0;
        this.prohtevZaParama = prohtevZaParama;
        this.kontejner = kontejner;//logicnije je da bude ovde
        this.emitovanjeZadovoljstva$ = interval(100)
                                       .pipe(map(vrednost => this.nivoZadovoljstva),
                                             distinctUntilChanged());                        
        this.farbanjeKontejneraSubscription = this.emitovanjeZadovoljstva$.subscribe((vrednost) => this.promeniBoju(vrednost));
    }

    vratiSadrzajObaveze()
    {
        return `<h3></h3>
        Ime: <input type='text' name='inpImeObaveze' readonly value='${this.ime}'>
        Prezime: <input type='text' name='inpPrezimeObaveze' readonly value='${this.prezime}'>
        Godine: <input type='number' name='inpBrojGodina' readonly value='${this.godine}'>
        Nivo zadovoljstva: <input type='number' name='inpZadovoljstvoObaveze' readonly value='${this.nivoZadovoljstva}'>
        Prohtev za parama: <input type='number' name='inpProhtevZaParama' readonly value='${this.prohtevZaParama}'>`;    
    }

    promeniBoju(vrednost)
    {
        if(vrednost < 4)
            this.kontejner.style.backgroundColor = "red";
        else
            if(vrednost < 7)
                this.kontejner.style.backgroundColor = "yellow";
            else
                this.kontejner.style.backgroundColor = "green";
        this.azurirajZadovoljstvo(0);
    }

    azurirajZadovoljstvo(vrednost)
    {
        this.nivoZadovoljstva += parseInt(vrednost);
        this.kontejner.querySelector(`input[name="inpZadovoljstvoObaveze"]`).value = this.nivoZadovoljstva;
    }
}