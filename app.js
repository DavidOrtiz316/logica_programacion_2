let intentos = 0;
let numeroSecreto = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}
function condicionesIniciales() {
    asignarTextoElemento('h1','Juego del Numero Secreto');
    asignarTextoElemento('p',`Ingresa un numero del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    return;    
}
condicionesIniciales();

function verificarIntento() {
    let numeroDelUsuario = parseInt(document.querySelector('input').value);
    if (numeroSecreto === numeroDelUsuario) {
        asignarTextoElemento('h1','Felicitaciones!');
        asignarTextoElemento('p',`Acertaste el numero secreto en ${intentos} ${(intentos == 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.querySelector('#intentar').setAttribute("disabled", true);
        limpiarCaja();
    } else{
        if (numeroSecreto > numeroDelUsuario) {
            asignarTextoElemento('p','El numero secreto es Mayor');
            limpiarCaja();            
        }else{
            asignarTextoElemento("p",'El numero secreto es Menor');
            limpiarCaja();
        }
    }  
    intentos++; 
    return;
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor((Math.random()*numeroMaximo)+1);
    console.log("El numero secreto es: "+numeroGenerado);
    console.log('Lista numero es: '+listaNumerosSorteados)

    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los numero posibles');
        document.querySelector('#intentar').setAttribute("disabled", 'true');
        document.getElementById("reiniciar").setAttribute('disabled', 'true');
    }else{
        if (listaNumerosSorteados.includes(numeroGenerado)) {
        return generarNumeroSecreto();
        } else{
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }           
}

function limpiarCaja() {
   let valorCaja = document.querySelector('#valorUsuario');
   valorCaja.value = ''; 
   return; 
}
limpiarCaja();

function reiniciarJuego() {
    //limpiar caja
    limpiarCaja();
    //indicar mensajes de inicio juego generar numero aleatorio secreto y reinicar numero de intentos
    condicionesIniciales();
    //deshabiliar boton de nuevo juego
    document.getElementById("reiniciar").setAttribute('disabled', true);
    document.querySelector('#intentar').removeAttribute('disabled');
    return;
}