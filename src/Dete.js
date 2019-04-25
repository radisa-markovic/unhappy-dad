import { Obaveza } from './Obaveza.js';

export class Dete extends Obaveza
{
    constructor(ime, prezime, godine, nivoZadovoljstva, prohtevZaParama, cale)
    {
        super(ime, prezime, godine, nivoZadovoljstva, prohtevZaParama);
        this.cale = cale;
        this.kontejnerDeteta = null;
    }

    nacrtajDete()
    {
        this.kontejnerDeteta = document.createElement('div');
        this.kontejnerDeteta.className = 'list-group';
        this.kontejnerDeteta.innerHTML = super.vratiSadrzajObaveze();
        this.kontejnerDeteta.innerHTML += '<button name="btnPodmiti">Podmiti</button>';

        let kontejnerSvakogDeteta = document.getElementById('kontejnerDece');
        kontejnerSvakogDeteta.appendChild(this.kontejnerDeteta);

        this.kontejnerDeteta.querySelector('button[name="btnPodmiti"]').addEventListener('click', () => {
            console.log(this.cale);
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
}