function novaConta(){
    let idadeUsuario = document.getElementById("idadeUsuario").value

    let letras = document.getElementById("idadeUsuario")

    let erro = document.getElementById("erro")

    if( idadeUsuario >= 18 ){
        window.location.href = "Teste.html"
    }else if( idadeUsuario <= 18 ){
        erro.style.display = "block"
    }else if( letras ){
        alert ("A forma de digitação solicitada é inválida, escreva/digite corretamente e tente novamente")
    }
}
