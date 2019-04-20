import { Obaveza } from './Obaveza.js';

export class Zena extends Obaveza
{
    constructor(ime, prezime, godine, nivoZadovoljstva, prohtevZaParama)
    {
        super(ime, prezime, godine, nivoZadovoljstva, prohtevZaParama);
        this.muz = null;
        this.zeninKontejner = document.getElementById('zeninKontejner');
        this.deca = [];
    }

    nacrtajZenu()
    {
        this.zeninKontejner.innerHTML = super.vratiSadrzajObaveze();
        if(this.nivoZadovoljstva < 5)
        {
            let dugmeSvadje = document.createElement('button');
            dugmeSvadje.innerHTML = 'Svađa';
            dugmeSvadje.value = this.nivoZadovoljstva * 5;
            this.zeninKontejner.appendChild(dugmeSvadje);
        }
    }

    uzmiPareMuzu()
    {//kako implementirati to da dete moze da javi majci za caletov tajni stek?
        this.muz.novacOdPlate -= this.prohtevZaParama/10 * this.muz.nivoZadovoljstva;
    }


/*
    zapocniSvadju()
    {
        if(this.nivoZadovoljstva < 5)
        {
            let dugmeSvadje = document.createElement('button');
            dugmeSvadje.innerHTML = nivoZadovoljstva * 7;
            document.body.appendChild(dugmeSvadje);//ne bi bilo lose da se ubaci atribut koji pamti hosta Zene
        }    
    }
    */
}