alert ("Bienvenido al simulador para pedir comida, crea tu cuenta para poder iniciar sesión y hacer tu pedido")

const usuario = prompt ("Ingresa tu nombre")
const clave = prompt ("Crea tu contraseña")
let ingresarClave = ""
let intentos = 3

const saludar = (nombreUsuario) => "¡Hola " + nombreUsuario + "!"
alert(saludar(usuario))


function ingresar(usuario, clave){
    while (ingresarClave !== clave && intentos > 0) {
        ingresarClave = prompt("Escribe tu contraseña para realizar el pedido")
        if (ingresarClave === clave) {
            console.log("Genial", usuario, "ingresaste correctamente")
        }else{
            intentos--
            console.log("Clave incorrecta, te quedan", intentos ,"intentos")
        }
    }
}
ingresar(usuario, clave)

function comidaCorrecta(comidaElegida){
    if (comidaElegida === "pizza" || comidaElegida === "tacos" || comidaElegida === "empanadas") {
        return comidaElegida
    }else{
        return null
    }
}

function bebidaCorrecta(bebidaElegida){
    if (bebidaElegida === "sprite" || bebidaElegida === "limonada") {
        return bebidaElegida
    }else{
        return null
    }
}

function pedidoCorrecto(comidaValidada, bebidaValidada) {
    if (comidaValidada && bebidaValidada) {
        let ordenCompleta = "Estamos preparando " + comidaValidada + " y " + bebidaValidada
        return ordenCompleta
    } else if (!comidaValidada && bebidaValidada) {
        let errorComida = "Esa comida no la tenemos, podes elegir pizza, tacos o empanadas. Pero sí tenemos " + bebidaValidada
        return errorComida
    } else if (comidaValidada && !bebidaValidada) {
        let errorBebida = "Esa bebida no la tenemos, podes elegir sprite o limonada. Pero sí tenemos " + comidaValidada
        return errorBebida
    } else {
        return "No tenemos esas opciones de comida y bebida " + usuario + ", mira nuevamente nuestras opciones"
    }
}

function hacerPedido() {            
    let comida = prompt("Escribe que comida deseas pedir (pizza, tacos, empanadas)")                
    let bebida = prompt("Escribe que bebida deseas pedir (sprite, limonada)")

    const comidaOk = comidaCorrecta(comida)
    const bebidaOk = bebidaCorrecta(bebida)

    const pedidoFinal = pedidoCorrecto(comidaOk, bebidaOk)

    return pedidoFinal
}

function pedidirComida(){
    if (intentos === 0) {
    console.log("Cuenta bloqueada por demasiados intentos")
    return
}else{
        alert(hacerPedido())
    }
}

while (intentos > 0 && confirm("Deseas hacer una orden?")) {
    pedidirComida()
}
if (intentos === 0) {
    alert("Tu cuenta quedó bloqueada por demasiados intentos fallidos al ingresar la contraseña")
}