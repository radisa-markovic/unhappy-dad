import { Obaveza } from './Obaveza.js';

export class Dete extends Obaveza
{
    constructor(ime, prezime, godine, prohtevZaParama, cale)
    {
        super(ime, prezime, godine, prohtevZaParama);
        this.cale = cale;
        this.nivoZadovoljstva = 0;//izracunati srecu deteta po nekoj formuli
        this.kontejnerDeteta = null;
    }

    nacrtajDete()
    {
        document.getElementById("natkontejnerDece").querySelector("h3").innerHTML = "Deca:";
        this.kontejnerDeteta = document.createElement('div');
        this.kontejnerDeteta.className = 'list-group';
        this.kontejnerDeteta.innerHTML = super.vratiSadrzajObaveze();
        this.kontejnerDeteta.innerHTML += '<button name="btnPodmiti">Podmiti</button>';

        let kontejnerSvakogDeteta = document.getElementById('kontejnerDece');
        kontejnerSvakogDeteta.appendChild(this.kontejnerDeteta);

        this.kontejnerDeteta.querySelector('button[name="btnPodmiti"]').addEventListener('click', () => {
            console.log("dete 25");
            console.log(this.cale.tajniStek);
            if((this.cale.tajniStek - 10000) >= 0)
            {
                this.cale.tajniStek -= 10000;
                this.cale.azurirajStek();
                this.cale.nivoZadovoljstva++;
                this.cale.azurirajZadovoljstvo();
                this.nivoZadovoljstva += 3;
                this.kontejnerDeteta.querySelector("input[name='inpZadovoljstvoObaveze']").value = this.nivoZadovoljstva;
            }
            else
                this.kontejnerDeteta.querySelector('button[name="btnPodmiti"]').disabled = true;
                //srediti VHDL stil nezeljenu memoriju
        });  
    }
    
    preracunajZadovoljstvo()
    {
        console.log("Nedefinisano racunanje srece za dete");
    }
}