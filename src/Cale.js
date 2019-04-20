export class Cale
{
    constructor(ime, prezime, godine, nivoZadovoljstva, novacOdPlate, tajniStek, zena)
    {
        this.ime = ime;
        this.prezime = prezime;
        this.godine = godine;
        this.nivoZadovoljstva = nivoZadovoljstva;
        this.novacOdPlate = novacOdPlate;
        this.tajniStek = tajniStek;
        this.zena = zena;
        this.deca = [];
        this.kontejner = document.getElementById('caletovKontejner');//valjda moze ovako...
    }
//mozda mi zatreba metod za dodavanje zene i dodavanje dece nakon sto ih ucitam iz json baze
//sad cu da vidim uostalom, pogledau par stvari o ucitavanju iz baze, potrebna mi je i dorada glavne forme
    nacrtajCaleta()
    {
        const formaZaCaleta = `
            Ime: <input type='text' name='inpCaletovoIme' readonly value='${this.ime}'> 
            Prezime: <input type='text' name='inpCaletovoPrezime' readonly value='${this.prezime}'>
            Godine: <input type='number' name='inpCaletoveGodine' readonly value='${this.godine}'>
            Nivo zadovoljstva: <input type='number' name='inpCaletovNivoZadovoljstva' readonly value='${this.nivoZadovoljstva}'>
            Plata: <input type='number' name='inpCaletovaPlata' readonly value='${this.novacOdPlate}'>
            Tajni štek: <input type='number' name='inpCaletovTajniStek' readonly value='${this.tajniStek}'>
            <button name='btnOpljackajKomsiju' value='5000' class='caletovoDugme'>Opljačkaj komšiju</button>
            <button name='btnOpljackajProdavnicu' value='10000' class='caletovoDugme'>Opljačkaj prodavnicu</button>
            <button name='btnSverc' value='15000' class='caletovoDugme'>Obavi šverc</button>
            <button name='btnOpljackajBanku' value='30000' class='caletovoDugme'>Opljačkaj banku</button>`;
        this.kontejner.innerHTML = formaZaCaleta; //ovde postoji i += za dodavanje dugmeta
        //prva faza: ne majem se sa rxjs, samo kostur napravim, posle baza, pa osnovna simulacija, pa dalje
        let nizCaletovihOpcija = document.querySelectorAll('button[class="caletovoDugme"]');
        for(let i=0; i < nizCaletovihOpcija.length; i++)
            nizCaletovihOpcija[i].onclick = (event) => this.zaradiPareVanPlate(event.target.value); 
    }

    zaradiPareVanPlate(vrednostPlena)
    {
        console.log(vrednostPlena);
        this.tajniStek += parseInt(vrednostPlena);//value cu da vratim posle...
        console.log("Caletov stek: " + this.tajniStek);
        document.querySelector('input[name="inpCaletovTajniStek"]').value = this.tajniStek;//.innerHTML = this.tajniStek;
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
            // i okoncati igricu, inace se nista ne dogadja
    }
}