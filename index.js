let dark = true
let reg = false
let persona = "visitatore"
//let persona = "admin"
let idPersona
const root = document.querySelector(":root")


// ============================================================
//  Dati di esempio – Gestione Clinica Veterinaria
// ============================================================

// ── UTENTI ───────────────────────────────────────────────────
// codUtente | nome | cognome | password | dataNascita | email | ruolo

var utenti = [
    [1, "Marco",   "Rossi",    "1985-03-12", "marco.rossi@email.it",      "cliente"],
    [2, "Giulia",  "Bianchi",  "1992-07-24", "giulia.bianchi@email.it",   "cliente"],
    [3, "Luca",    "Ferrari",  "1979-11-05", "luca.ferrari@email.it",     "cliente"],
    [4, "Alessia", "Conti",    "2000-01-30", "alessia.conti@email.it",    "cliente"],
    [5, "Davide",  "Marino",   "1988-09-18", "davide.marino@email.it",    "cliente"],
    [6, "Sofia",   "Esposito", "1975-04-22", "sofia.esposito@clinica.it", "medico" ],
    [7, "Andrea",  "Ricci",    "1980-08-14", "andrea.ricci@clinica.it",   "medico" ],
    [8, "Elena",   "Gallo",    "1990-06-03", "elena.gallo@clinica.it",    "admin"  ],
];


// ── ANIMALI ───────────────────────────────────────────────────
// codAnimale | nome | razza | specie | dataNascita | note

var animali = [
    [1, "Fido",   "Labrador",         "Cane",     "2019-05-10", "Allergia al pollame"      ],
    [2, "Micia",  "Europeo",          "Gatto",    "2020-02-14", null                       ],
    [3, "Rex",    "Pastore Tedesco",  "Cane",     "2018-11-23", "Displasia all'anca lieve" ],
    [4, "Birba",  "Persiano",         "Gatto",    "2021-08-07", "Sterilizzata"             ],
    [5, "Tweety", "Canarino",         "Uccello",  "2022-03-01", null                       ],
    [6, "Palla",  "Coniglio Nano",    "Coniglio", "2023-01-15", "Vaccinazioni aggiornate"  ],
    [7, "Luna",   "Golden Retriever", "Cane",     "2020-07-19", null                       ],
];


// ── PRENOTAZIONI ──────────────────────────────────────────────
// codPrenotazione | dataPrenotazione | dataAppuntamento | codCliente | codAnimale | codMedico | commentoCliente | commentoMedico | effettuata

var prenotazioni = [
    [1, "2026-04-01", "2026-04-10 09:00", 1, 1, 6, "Fido gratta spesso le orecchie.",         "Otite lieve, prescritto trattamento topico.",    true ],
    [2, "2026-04-05", "2026-04-15 10:30", 2, 2, 7, "Micia ha perso peso nell'ultimo mese.",   "Eseguiti esami del sangue, valori nella norma.", true ],
    [3, "2026-04-10", "2026-04-20 11:00", 3, 3, 6, "Zoppica dalla zampa posteriore destra.",  "Confermata displasia, consigliata fisioterapia.", true],
    [4, "2026-04-28", "2026-05-08 09:30", 4, 4, 7, "Controllo post-sterilizzazione.",         null,                                             false],
    [5, "2026-04-30", "2026-05-12 14:00", 5, 7, 6, "Prima visita, vaccini da aggiornare.",    null,                                             false],
    [6, "2026-05-02", "2026-05-15 16:00", 1, 1, 7, "Controllo orecchie dopo il trattamento.", null,                                             false],
];


//sezioni
const _home = document.getElementById("home")
const _prenotazioni = document.getElementById("prenotazione")
const _visione = document.getElementById("visione")
const _storico = document.getElementById("storico")
const _login = document.getElementById("login")

//nav
const _navHome = document.getElementById("navHome")
const _navPren = document.getElementById("navPren")
const _navVis = document.getElementById("navVis")
const _navStor = document.getElementById("navStor")

//accesso
const _inputEmail = document.getElementById("inputEmail")
const _inputPassword = document.getElementById("inputPassword")
const _inputNome = document.getElementById("inputNome")
const _inputCognome = document.getElementById("inputCognome")
const _inputData = document.getElementById("inputData")
const _divNome = document.getElementById("divNome")
const _divCognome = document.getElementById("divCognome")
const _divData = document.getElementById("divData")

const _btnAccedi = document.getElementById("accedi")
const _btnRegistrati = document.getElementById("registrazione")
const _cambia = document.getElementById("cambia")

//darkmode
const _lblDark = document.getElementById("lblDark")
const _divDark = document.getElementById("divDark")

//prenotazione
const _cmbAnimali = document.getElementById("animali")
const _cmbInfermieri = document.getElementById("infermieri")


cambia()
darkMode()
autorizzazioni()
visualizza("home")
caricaCmb()



function visualizza(sezione){
    switch(sezione){
        case "home":
            _home.style.display = "block"

            _visione.style.display = "none"
            _storico.style.display = "none"
            _prenotazioni.style.display = "none"
            _login.style.display = "none"
            break
        case "login":
            _login.style.display = "block"
            _login.style.display = "flex"

            _home.style.display = "none"
            _visione.style.display = "none"
            _storico.style.display = "none"
            _prenotazioni.style.display = "none"
            break
        case "prenotazioni":
            _prenotazioni.style.display = "block"
            _prenotazioni.style.display = "flex"

            _login.style.display = "none"
            _home.style.display = "none"
            _visione.style.display = "none"
            _storico.style.display = "none"
            break
        case "visione":
            _visione.style.display = "block"    
            
            _prenotazioni.style.display = "none"
            _login.style.display = "none"
            _home.style.display = "none"
            _storico.style.display = "none"
            break
        case "storico":
            _storico.style.display = "block"

            _visione.style.display = "none"    
            _prenotazioni.style.display = "none"
            _login.style.display = "none"
            _home.style.display = "none"
            break
    }
}






//#region Darkmode

    function darkMode(){
    dark = !dark
    if (!dark) {
        root.style.setProperty('--colore1', '#65d2cd');
        root.style.setProperty('--colore2', '#666666');
        root.style.setProperty('--colore3', '#4b8db9');
        root.style.setProperty('--colore4', '#373737');

        _lblDark.style.backgroundColor = 'var(--chiaro3)'
        _divDark.style.marginLeft = "0.2vw"
        _divDark.style.backgroundColor = "yellow"
    }
    else{
        root.style.setProperty('--colore1', '#196360');
        root.style.setProperty('--colore2', '#b3b3b3');
        root.style.setProperty('--colore3', '#315f7d');
        root.style.setProperty('--colore4', '#e1e1e1');

        _lblDark.style.backgroundColor = 'var(--scuro3)'
        _divDark.style.marginLeft = "2.2vw"
        _divDark.style.backgroundColor = "white"
    }

    if (_lblDark.classList.contains("darkLblOn")) {
        _lblDark.classList.remove("darkLblOn")
        _lblDark.classList.add("darkLblOff")

        _divDark.classList.remove("darkDivOn")
        _divDark.classList.add("darkDivOff")
        
    }
    else{
        _lblDark.classList.remove("darkLblOff")
        _lblDark.classList.add("darkLblOn")

        _divDark.classList.remove("darkDivOff")
        _divDark.classList.add("darkDivOn")
    }
    _lblDark.offsetHeight 
    _divDark.offsetHeight
}

//#endregion


//#region registragione/login



aggiungiPassword()

function aggiungiPassword(){
    for (let i = 0; i < utenti.length; i++) {
        utenti[i].splice(3,0,generaPassword())
        console.log(utenti[i][3])
        
    }
}
function generaPassword(){
    let caratteri = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","1","2","3","4","5","6","7","8","9","0"]
    let password = ""
    for (let i = 0; i < 10; i++) {
        password += caratteri[generaNumero(0,62)]
    }
    return password
}



function registrazione(){
    _home.style.display = "none"
    _prenotazioni.style.display = "none"
    _storico.style.display = "none"
    _visione.style.display = "none"

    _login.style.display = "block"
}


function autorizzazioni(){
    switch(persona){
        case "visitatore":
            _navHome.style.display = "block"
            _navPren.style.display = "none"
            _navStor.style.display = "none"
            _navVis.style.display = "none"
            break
        case "cliente":
            _navHome.style.display = "block"
            _navPren.style.display = "block"
            _navStor.style.display = "block"
            _navVis.style.display = "none"
            break
        case "medico":
            _navHome.style.display = "block"
            _navPren.style.display = "none"
            _navStor.style.display = "none"
            _navVis.style.display = "block"
            break
        case "admin":
            _navHome.style.display = "block"
            _navPren.style.display = "block"
            _navStor.style.display = "block"
            _navVis.style.display = "block"
            break
    }
}

function accedi(){
    let trovato = false
    for (let i = 0; i < utenti.length; i++) {
        
        if (_inputEmail.value == utenti[i][5] && _inputPassword.value == utenti[i][3]) {
            trovato = true
            idPersona = i+1
            persona = utenti[i][6]
        }
        else if(_inputEmail.value == utenti[i][5] && _inputPassword.value != utenti[i][3]){
            alert("Password errata")
            trovato = true
            _inputPassword.value = ""
        }
    }
    if (!trovato) {
        alert("spiacente ma l'account non esiste")
    }
    else{
        alert("Accesso effettuato")
        visualizza("home")
    }
    autorizzazioni()
}


function registrati(){
    let email
    let password
    let nome
    let cognome
    let data
    let cont = valoreContatore()

    let trovato = false
    for (let i = 0; i < utenti.length; i++) {
        if (_inputEmail.value == utenti[i][5]) {
            trovato = true
        }
    }
    if (trovato) {
        alert("Spiacente, l'account è già esistente")
    }
    else{
        if (_inputEmail.value != "" && _inputPassword.value != "" && _inputNome.value != "" && _inputCognome.value != "" && _inputData.value != "") {
            let nuovoUtente = []
            email = _inputEmail.value
            password = _inputPassword.value
            nome = _inputNome.value
            cognome = _inputCognome.value
            data = _inputData.value
            nuovoUtente.push(cont)
            nuovoUtente.push(nome)
            nuovoUtente.push(cognome)
            nuovoUtente.push(password)
            nuovoUtente.push(data)
            nuovoUtente.push(email)
            nuovoUtente.push("cliente")
            utenti.push(nuovoUtente)
            alert("Account creato con successo")
            persona = "cliente"
            idPersona = cont
            autorizzazioni()
            visualizza("home")

        }
        else{
            alert("riempire tutti i campi")
        }
    }
}


function cambia(){
    reg = !reg
    if (reg) {
        _btnRegistrati.style.display = "block"
        _btnAccedi.style.display = "none"  
        
        _inputNome.style.display = "block"
        _inputCognome.style.display = "block"
        _inputData.style.display = "block"

        _divNome.style.display = "block"
        _divCognome.style.display = "block"
        _divData.style.display = "block"

        _cambia.textContent = "Hai già un accout? accedi"
    }
    else{
        _btnRegistrati.style.display = "none"
        _btnAccedi.style.display = "block" 
        
        _inputNome.style.display = "none"
        _inputCognome.style.display = "none"
        _inputData.style.display = "none"

        _divNome.style.display = "none"
        _divCognome.style.display = "none"
        _divData.style.display = "none"
        
        _cambia.textContent = "Niente account? registrati"
    }
}

function valoreContatore(){
    let cont
    for (let i = 0; i < utenti.length; i++) {
        cont = utenti[i][0]
        
    }
    return cont+1
}

//#endregion

//#region Gestione sezione prenotazione

function genera(){

}

//#endregion

//#region Gestione prenotazione

function caricaCmb() {
    
    for (let i = 0; i < animali.length; i++) {
        const _elementoCmbAnimali = document.createElement("option")
        _elementoCmbAnimali.value = i+1
        _elementoCmbAnimali.textContent = animali[i][1].toString()
        _cmbAnimali.appendChild(_elementoCmbAnimali)
    }
    for (let i = 0; i < utenti.length; i++) {
        if (utenti[i][5] == "medico") {
            const _elementoCmbDottori = document.createElement("option")
            _elementoCmbDottori.value = i+1
            _elementoCmbDottori.textContent = utenti[i][1] + " " + utenti[i][2]
            _cmbInfermieri.appendChild(_elementoCmbDottori)
        }
        
    }
}
function prenota(){
    // codPrenotazione | dataPrenotazione | dataAppuntamento | codCliente | codAnimale | codMedico | commentoCliente | commentoMedico | effettuata
    const _testoPren = document.getElementById("testoPren")
    const _dataPren = document.getElementById("dataPren")
    const _oraPren = document.getElementById("oraPren")
    const _animalePren = document.getElementById("animali")
    const _infermierePren = document.getElementById("infermieri")
    if (_testoPren.value != "" && _dataPren.value != "" && _animalePren.value != "" && _infermierePren.value != "") {
        let prenotazione = []
        let codPren = calcolaCodicePrenotazione()
        let data = new Date().toLocaleDateString('fr-CA');
        let dataApp = _dataPren.value + " " + _oraPren.value
        let codCliente = idPersona
        let codAnimale = +_animalePren.value
        let codMedico = +_infermierePren.value
        let commentoCliente = _testoPren.value
        let commentoMedico = ""
        let effettuata = false
        prenotazione.push(codPren)
        prenotazione.push(data)
        prenotazione.push(dataApp)
        prenotazione.push(codCliente)
        prenotazione.push(codAnimale)
        prenotazione.push(codMedico)
        prenotazione.push(commentoCliente)
        prenotazione.push(commentoMedico)
        prenotazione.push(effettuata)
        prenotazioni.push(prenotazione)
    }
    else{
        alert("riempire tutti i campi")
    }
}

function calcolaCodicePrenotazione(){
    let cont = 0;
    for (let i = 0; i < prenotazioni.length; i++) {
        cont++
        
    }
    cont++
    return cont
}

//#endregion

//#region varie
//funzione di test
function saluta(){
    alert("ciao")
}


function generaNumero(min, max){
    let n = Math.floor((max - min) * Math.random() + min); // genera un numero da 0 a 0,9999 poi moltiplico per max - min poi addo min al fondo
    return n;
}

//#endregion
