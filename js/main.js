//pega o elemento dentro do input com o id do historico
function getHistorico() {                                   
    return document.getElementById("historico").value;   
}

//imprime o historico dentro co input com o id do historico
function printHistorico(numero){                            
    document.getElementById("historico").value = numero;
}

//pega o elemento dentro do input com o id do valor
function getResultado() {                                   
    return document.getElementById("valor").value; 
}

//imprime o historico dentro co input com o id do valor
function printResultado(numero) {                            

    if(numero == ""){
        document.getElementById("valor").value = numero;
    }
    else{
        document.getElementById("valor").value = getNumeroFormatado(numero);
    }
}

//pega o numero no id valor e converte com virgula e etc
function getNumeroFormatado(numero){        
    if (numero == "-"){
        return "";
    }                
    let n = Number(numero);
    let valor = n.toLocaleString("pt-br");
    return valor;
}

//volta o numero sem as virgulas para calculos
function reverseNumeroFormatado(numero){                    
    //isso é uma coisa chamada de expressão regular (essa no caso tira tudo que não for dígito da string)  
    return Number(numero.replace(/[^\d]+/g,''));                 
}

//pega todos os elementos com a classe operador e coloca na variável (o que parece que a torna uma espécie de array)
var operador = document.getElementsByClassName("operador");         

for(let i = 0; i<operador.length; i++){
    operador[i].addEventListener('click', function(){
        //limpa as telas da calculadora 
        if(this.id=="limpar"){
           printHistorico("");
           printResultado("");
        }
        //limpa o último dígito
        else if(this.id=="voltar"){
            let resultado = reverseNumeroFormatado(getResultado()).toString();
            //se o resultado tiver algum valor
            if(resultado){
                resultado = resultado.substr(0, resultado.length-1);
                printResultado(resultado);
            }
        }else{
            let resultado = getResultado();
            let historico = getHistorico();
            if (resultado =="" && historico != ""){
                if(isNaN(historico[historico.length-1])){
                    historico = historico.substr(0, historico.length-1);
                }
            }
            if(resultado !="" || historico !=""){
                resulado = reverseNumeroFormatado(resultado);
                historico = historico + resultado;
                if (this.id =="="){
                    //pega os dados do historico e faz a conta
                    let valor = eval(historico);
                    printResultado(valor);
                    printHistorico("");
                }else{
                    historico = historico + this.id;
                    printHistorico(historico);
                    printResultado("");
                }
            }
        }
    });
}

//pega todos os elementos com a classe numero e coloca na variável (o que parece que a torna uma espécie de array)
var numero = document.getElementsByClassName("numero");         

for (let i = 0; i < numero.length; i++) {
    numero[i].addEventListener('click', function () {
        let resultado = reverseNumeroFormatado(getResultado());
        if (resultado != NaN) {
            //se o resultado é um número, faça algo
            resultado = parseInt(resultado + this.id);
            printResultado(resultado);
        }
    });
}
