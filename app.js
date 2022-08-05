let inversion;
//Ejemplo de definicion de clase
class plazoFijo{
    constructor(){
        this.mes,
        this.tna,
        this.interes,
        this.inversion
    }
}
function calcular() {
    //Ejemplo de definicion de array
    const arrayInversion = [];
    if ( validarInversion()) {
        //Ejemplo de Uso de arrow function
        const TASA = () => document.getElementById("inpTasa").value / 100;
        let tna = TASA();
        let totalMeses = document.getElementById("inpMeses").value;
        let ganaciaNeta = 0;
       
        let inversionInicial = inversion;
        for (let index = 0; index < totalMeses; index++) {
            let interes = calcularInteres(inversion, tna);
            //creacion de Objeto y seteo de atributos
            let miPlazoFijo = new plazoFijo();
            miPlazoFijo.mes = index + 1;
            miPlazoFijo.tna=document.getElementById("inpTasa").value;
            miPlazoFijo.interes=interes;
            miPlazoFijo.inversion = inversion;          
            if (document.getElementById("flagReInvertir").checked) {
                inversion = parseFloat(inversion) + parseFloat(interes);

            }
            else {
                ganaciaNeta = ganaciaNeta + interes;
            }
            //Agregado al array del objeto
            arrayInversion.push(miPlazoFijo);
        }
        mesage(armarMensaje(arrayInversion,inversion,inversionInicial,ganaciaNeta));
    }
}


function calcularInteres(valor, tasa) {
    return valor * (tasa * 30 / 365);
}
function formatNumero(numero) {
    let numeroStr= Intl.NumberFormat('de-DE').format(numero);
    if(numeroStr.indexOf(",")<0)
    {
        return numeroStr+",00";    
    }
    return numeroStr;
}
function mesage(mensaje) {
    if (document.getElementById("alert").checked) {
        alert(mensaje);
    }
    if (document.getElementById("console").checked) {
        console.log(mensaje);
    }
}

function formatoNumerico(input) {
    if (validarInversion()) {
        document.getElementById("inpInversion").value = Intl.NumberFormat('de-DE').format(parseInt(input.value)) + ",00";
   
    }

}
function validarInversion()
{
    
    inversion = (document.getElementById("inpInversion").value).replaceAll(".", "").replace(",", ".");
    if (isNaN(inversion)||inversion=="") {
        alert("debe ingresar un numero valido");
        document.getElementById("inpInversion").focus();
        return false;
    }
    else
    {   
        return true;
    }
    
}
function armarMensaje (array,inversion,inversionInicial,ganaciaNeta)
{
    let mensaje="";
    //recorrido del array con los objetos guardados
    /*for (let index = 0; index < array.length; index++) {
        const element = array[index];
        mensaje = `${mensaje}mes: ${element.mes} acumulado: ${formatNumero(element.inversion)} interes=${formatNumero(element.interes)}\n`;
        
    }*/
    for (const element of array)  {
        mensaje = `${mensaje}mes: ${element.mes} acumulado: ${formatNumero(element.inversion)} interes=${formatNumero(element.interes)}\n`;   
    }

    if (document.getElementById("flagReInvertir").checked) {
        mensaje = `${mensaje}total ganancia ${formatNumero(parseFloat(inversion) - parseFloat(inversionInicial))}`;
    }
    else {
        mensaje = `${mensaje}total ganancia ${formatNumero(ganaciaNeta)}`;
    }
    return mensaje;
}