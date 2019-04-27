import { Obaveza } from './Obaveza.js';

export class Zena extends Obaveza
{
    constructor(ime, prezime, godine, prohtevZaParama)
    {
        super(ime, prezime, godine, prohtevZaParama);
        this.muz = null;
        this.zeninKontejner = document.getElementsByName('zeninKontejner')[0];
        this.nivoZadovoljstva = 0;
        this.deca = [];
    }

    nacrtajZenu()
    {
        this.zeninKontejner.querySelector("h3").innerHTML = "Zena:";
        this.zeninKontejner.innerHTML += super.vratiSadrzajObaveze();
        this.preracunajPocetnoZadovoljstvo();
        if(this.nivoZadovoljstva < 5)
        {
            this.zeninKontejner.style.backgroundColor = "red";
            let dugmeSvadje = document.createElement('button');
            dugmeSvadje.innerHTML = 'Svađa';
            dugmeSvadje.value = (10 - this.nivoZadovoljstva) * 5;
            this.zeninKontejner.appendChild(dugmeSvadje);
            dugmeSvadje.addEventListener('click', () => {
                if(parseInt(dugmeSvadje.value) !== 0)
                {
                    dugmeSvadje.value--;
                    this.uzmiMuzuPare();
                    this.muz.azurirajPlatu();
                    console.log(dugmeSvadje.value);
                }
                else
                {
                    dugmeSvadje.disabled = true;
                    this.zeninKontejner.style.backgroundColor = "yellow";
                }
            });
        }

    }

    preracunajPocetnoZadovoljstvo()
    {
        let muzevaPlata = this.muz.plata;
        this.nivoZadovoljstva += (Math.trunc(muzevaPlata / 10000) - Math.trunc(this.godine / 10)) % 10;//sto je nesrecnija, odlaze pare
        this.zeninKontejner.querySelector("input[name='inpZadovoljstvoObaveze']").value = this.nivoZadovoljstva;
    }

    uzmiMuzuPare()
    {
        this.nivoZadovoljstva = (this.nivoZadovoljstva + 1) % 10;
        this.muz.novacOdPlate -= (10 - this.nivoZadovoljstva) * 200;
    }
}