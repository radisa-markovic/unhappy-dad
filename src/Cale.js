export class Cale
{
    constructor(ime, prezime, godine, novacOdPlate, tajniStek, zena)
    {
        this.ime = ime;
        this.prezime = prezime;
        this.godine = godine;
        this.nivoZadovoljstva = 0;
        this.novacOdPlate = novacOdPlate;
        this.tajniStek = tajniStek;
        this.zena = zena;//prosledjivanje preko konstruktora vs preko funkcije
        this.deca = [];
        this.kontejner = document.getElementsByName("caletovKontejner")[0];
    }

    nacrtajCaleta()
    {
        const formaZaCaleta = `
            Ime: <input type='text' name='inpCaletovoIme' readonly value='${this.ime}'> 
            Prezime: <input type='text' name='inpCaletovoPrezime' readonly value='${this.prezime}'>
            Godine: <input type='number' name='inpCaletoveGodine' readonly value='${this.godine}'>
            Nivo zadovoljstva: <input type='number' name='inpCaletovNivoZadovoljstva' readonly value='${this.nivoZadovoljstva}'>
            Ukupan novac od plate: <input type='number' name='inpCaletovaPlata' readonly value='${this.novacOdPlate}'>
            Tajni štek: <input type='number' name='inpCaletovTajniStek' readonly value='${this.tajniStek}'>
            <div class="btn-group-vertical">
                <button name='btnOpljackajKomsiju' value='5000' class="btn btn-success">Opljačkaj komšiju</button>
                <button name='btnOpljackajProdavnicu' value='10000' class="btn btn-success">Opljačkaj prodavnicu</button>
                <button name='btnSverc' value='15000' class="btn btn-success">Obavi šverc</button>
                <button name='btnOpljackajBanku' value='30000' class="btn btn-success">Opljačkaj banku</button>
            </div>`;
        this.kontejner.innerHTML = formaZaCaleta; //ovde postoji i += za dodavanje dugmeta
        //prva faza: ne majem se sa rxjs, samo kostur napravim, posle baza, pa osnovna simulacija, pa dalje
        let nizCaletovihOpcija = document.querySelectorAll('button[class="btn btn-success"]');
        for(let i=0; i < nizCaletovihOpcija.length; i++)
            nizCaletovihOpcija[i].onclick = (event) => this.zaradiPareVanPlate(event.target.value); 
    }

    zaradiPareVanPlate(vrednostPlena)
    {
        console.log(vrednostPlena);
        this.tajniStek += parseInt(vrednostPlena);//value cu da vratim posle...
        console.log("Caletov stek: " + this.tajniStek);
        this.azurirajStek();
    }

    azurirajZadovoljstvo()
    {
        document.querySelector('input[name="inpCaletovNivoZadovoljstva"]').value = this.nivoZadovoljstva;
    }

    azurirajPlatu()
    {
        this.kontejner.querySelector('input[name="inpCaletovaPlata"]').value = this.novacOdPlate;
    }
    
    azurirajStek()
    {
        document.querySelector('input[name="inpCaletovTajniStek"]').value = this.tajniStek;
        console.log("Caletov stek: " + this.tajniStek);
    }

    dodajDete(dete)
    {
        this.deca.push(dete);
    }

    primiPlatu(plata)
    {
        this.novacOdPlate += 0.8 * plata;//ovo zena uzima ako me ne ocinkare deca za stek
        this.tajniStek += 0.2 * plata;//naravno, ide u stek, kako ime kaze
    }

    krajnjiCiljUZivotu()
    {
        if(this.tajniStek > 200000 && this.nivoZadovoljstva === 10)
            print('Uspesan sam mnogo, presao sam igricu'); //ponistiti subscriptions, il sta vec,
            // i okoncati igricu, inace se nista ne dogadja, sad dal javascript ima print, podleze diskusiji
    }
}