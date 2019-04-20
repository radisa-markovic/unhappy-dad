import { Obaveza } from './Obaveza.js';

export class Dete extends Obaveza
{
    constructor(ime, prezime, godine, nivoZadovoljstva, prohtevZaParama)
    {
        super(ime, prezime, godine, nivoZadovoljstva, prohtevZaParama);
        this.cale = null;
        this.kontejnerDeteta = null;
    }

    nacrtajDete()
    {
        this.kontejnerDeteta = document.createElement('div');
        this.kontejnerDeteta.className = 'kontejnerJednogDeteta';
        this.kontejnerDeteta.innerHTML = super.vratiSadrzajObaveze();
        this.kontejnerDeteta.innerHTML += '<button name="btnPodmiti" value=2>Podmiti</button>';

        let kontejnerSvakogDeteta = document.getElementById('kontejnerDece');
        kontejnerSvakogDeteta.appendChild(this.kontejnerDeteta);
    }
}