import { Obaveza } from './Obaveza.js';

export class Zena extends Obaveza
{
    constructor(ime, prezime, godine, prohtevZaParama)
    {
        super(ime, prezime, godine, prohtevZaParama);
        this.muz = null;
        this.zeninKontejner = document.getElementsByName('zeninKontejner')[0];
        this.nivoZadovoljstva = 0;//gaimqesm ti interpretator
        this.deca = [];
    }

    nacrtajZenu()
    {
        this.zeninKontejner.innerHTML = super.vratiSadrzajObaveze();
        if(this.nivoZadovoljstva < 5)
        {
            this.zeninKontejner.style.backgroundColor = "red";
            let dugmeSvadje = document.createElement('button');
            dugmeSvadje.innerHTML = 'Svađa';//ovo mozda da dodam da bude stalno na formi, al kao da bude nevidljivo...
            dugmeSvadje.value = (10 - this.nivoZadovoljstva) * 5;
            this.zeninKontejner.appendChild(dugmeSvadje);
            dugmeSvadje.addEventListener('click', () => {
                if(parseInt(dugmeSvadje.value) !== 0)
                {
                    dugmeSvadje.value--;
                    this.muz.novacOdPlate -= 1000;
                    this.muz.azurirajPlatu();
                    console.log(dugmeSvadje.value);
                }
                if(parseInt(dugmeSvadje.value) === 0)
                {    
                    this.nivoZadovoljstva = 5;
                    this.zeninKontejner.querySelector("input[name='inpZadovoljstvoObaveze']").value = this.nivoZadovoljstva;
                    dugmeSvadje.disabled = true;
                    this.zeninKontejner.style.backgroundColor = "yellow";
                }
            });
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