import { Obaveza } from './Obaveza.js';
import { interval } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

export class Zena extends Obaveza
{
    constructor(ime, prezime, godine, prohtevZaParama)
    {
        super(ime, prezime, godine, prohtevZaParama, document.getElementsByName('zeninKontejner')[0]);
        this.muz = null;

        this.farbanjeKontejneraZadovoljstvom = this.emitovanjeZadovoljstva$.subscribe((vrednost) => super.promeniBoju(vrednost));
        //koliko god da je logicno da gore ide "super" kao atribut natklase, ide "this", ALI za metode to ne vazi
        //this.preracunajPocetnoZadovoljstvo();//muz je null, izregulisati situaciju kad se "dobija" muz
    }

    nacrtajZenu()
    {
        this.kontejner.querySelector("h3").innerHTML = "Žena:";
        this.kontejner.innerHTML += super.vratiSadrzajObaveze();
        this.preracunajPocetnoZadovoljstvo();
        if(this.nivoZadovoljstva < 5)
        {
            this.kontejner.style.backgroundColor = "red";
            let dugmeSvadje = document.createElement('button');
            dugmeSvadje.value = (10 - this.nivoZadovoljstva) * 5;
            dugmeSvadje.innerHTML = `Svađa ` + `(${dugmeSvadje.value})`;
            this.kontejner.appendChild(dugmeSvadje);
            dugmeSvadje.addEventListener('click', () => {
                if(parseInt(dugmeSvadje.value) !== 0)
                {
                    dugmeSvadje.value--;
                    this.uzmiMuzuPare();
                    this.muz.azurirajPlatu();
                    dugmeSvadje.innerHTML = `Svađa ` + `(${dugmeSvadje.value})`;
                }
                else
                {
                    dugmeSvadje.disabled = true;
                    this.kontejner.style.backgroundColor = "yellow";
                }
            });
        }

    }

    preracunajPocetnoZadovoljstvo()
    {
        let muzevaPlata = this.muz.plata;
        this.nivoZadovoljstva += (Math.trunc(muzevaPlata / 10000) - Math.trunc(this.godine / 10)) % 10;//sto je nesrecnija, odlaze pare
        this.kontejner.querySelector("input[name='inpZadovoljstvoObaveze']").value = this.nivoZadovoljstva;
    }

    uzmiMuzuPare()
    {
        this.nivoZadovoljstva = (this.nivoZadovoljstva + 1) % 10;
        this.muz.novacOdPlate -= (10 - this.nivoZadovoljstva) * 200;
        this.kontejner.querySelector("input[name='inpZadovoljstvoObaveze']").value = this.nivoZadovoljstva;
    }

}