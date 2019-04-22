export function ucitajOverlay() //mozda da ovo umotam u klasu i da imam pokazivac na servis baze podataka
{//pa da tu prebacim funkciju za vracanje podataka, a ovde samo preusmeravam taj objekat koji ubacujem
    document.getElementsByName("btnOverlay")[0].addEventListener("click", () => {
        document.getElementById("overlay").style.height = '100%';
    });

    //logika je prebacena u BazaPodatakaServis, sad samo da uhvatim podatke iz onih kontrola...
    //...pa da ih ubacim ovde dole i da upakujem u podatak
    document.getElementById("btnPotvrdaPodataka").addEventListener("click", () => {
        document.getElementById("overlay").style.height = '0%';
        fetch("http://localhost:3000/porodice/", {
            method: "POST",
            headers: 
            {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "ime": "Radisa",
                "prezime": "Markovic",
                "godine": 22,
                "zena":
                {
                    "ime": "Nemam pojma jos uvek",
                    "prezime": "Kad se uda, Markovic",
                    "godine": 99
                }
            })
        }).then(odgovor => { return odgovor.json()})
        .then(console.log("Sad cu da vidim dal su hardkodovani podaci ubaceni u bazu"))
        .catch(greska => console.log(greska));
    });
}
//posle cu da ubacim kod gde treba, sad mi samo treba nesto sto radi
/*
function ubaciPodatkeUBazu()
{
    fetch("http://localhost:3000/porodice/", {
        method: "POST",
        headers: 
        {
            'Accept': 'application.json',
            'Content-type': 'application.json'
        },
        body: JSON.stringify({
            "ime": "Radisa",
            "prezime": "Markovic",
            "godine": 22
        })
    }).then(odgovor => console.log(odgovor.json()))
    .then(console.log("Sad cu da vidim dal su hardkodovani podaci ubaceni u bazu"));
}*/