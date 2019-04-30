import { Obaveza } from './Obaveza.js';

export class Dete extends Obaveza
{
    constructor(ime, prezime, godine, prohtevZaParama, cale)
    {
        super(ime, prezime, godine, prohtevZaParama, null);
        this.cale = cale;
        this.kontejner = null;

        this.farbanjeDetetovogKontejneraZadovoljstvom = this.emitovanjeZadovoljstva$
                                                        .subscribe((vrednost) => super.promeniBoju(vrednost));
    }

    nacrtajDete()
    {
        document.getElementById("natkontejnerDece").querySelector("h3").innerHTML = "Deca:";
        this.kontejner = document.createElement('div');
        this.kontejner.className = 'list-group';
        this.kontejner.innerHTML = super.vratiSadrzajObaveze();
        this.kontejner.innerHTML += '<button name="btnPodmiti">Podmiti</button>';

        let kontejnerSvakogDeteta = document.getElementById('kontejnerDece');
        kontejnerSvakogDeteta.appendChild(this.kontejner);

        this.kontejner.querySelector('button[name="btnPodmiti"]').addEventListener('click', () => {
            if((this.cale.tajniStek - 10000) >= 0)
            {
                this.cale.tajniStek -= 10000;
                this.cale.azurirajStek();
                this.cale.nivoZadovoljstva++;
                this.cale.azurirajZadovoljstvo();
                this.nivoZadovoljstva += 3;
                this.kontejner.querySelector("input[name='inpZadovoljstvoObaveze']").value = this.nivoZadovoljstva;
            }
            else
                this.kontejner.querySelector('button[name="btnPodmiti"]').disabled = true;
                //srediti VHDL stil nezeljenu memoriju
        });  
    }
    
    preracunajZadovoljstvo()
    {
        console.log("Nedefinisano racunanje srece za dete");
    }
}