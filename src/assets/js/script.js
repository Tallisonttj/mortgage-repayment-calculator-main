//inputs
let inpClear = document.querySelector('.clearButton').addEventListener('click', () => {
   location.reload()
})


let inpCalc = document.querySelector('.calcButton');
let inputs = document.querySelectorAll('input[type="text"]')
let inpRepay = document.querySelector('#repay')
let inpInterst = document.querySelector('#interst')
let label = document.querySelector('.radio-area')

let inpAmont = document.querySelector('#amount')
let inpTerm = document.querySelector('#term')
let inpRate = document.querySelector('#rate')

inpAmont.addEventListener('change' , () => {
    let floatAmount = parseFloat(inpAmont.value)
    let currentFormat = new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits:0,
        maximumFractionDigits:0,
    }).format(floatAmount)
    inpAmont.value = currentFormat
    
})
inpRate.addEventListener('change' , () => {
    let floatRate = inpRate.value
     floatRate = floatRate.replace(/\D/g, '')
    if(floatRate.length > 2){
        floatRate = `${floatRate.slice(0, -2)}.${floatRate.slice(-2)}`
        inpRate.value = floatRate
        console.log(floatRate)
    }
    
})

inpCalc.addEventListener('click', isRequered)


// Function
function isRequered(){    
    let isOk = true
    document.querySelectorAll('.error').forEach(error => error.remove());
    document.querySelectorAll('.bgError').forEach(span => span.classList.remove('bgError'));
    document.querySelectorAll('.border-Red').forEach(bg => bg.classList.remove('border-Red'));

    
    for (let i of inputs) {
        let inp = parseFloat(i.value)
        if(inp === '' || isNaN(inp)){

            let p = document.createElement('p')
            p.innerHTML = 'This field is requered'
            i.parentElement.after(p)
            i.parentElement.classList.add('border-Red')
            p.classList.add('error')
            let span = i.parentElement.querySelector('span')
            if(span){
              span.classList.add('bgError')}
            isOk = false
        }
    }
    if(!inpRepay.checked && !inpInterst.checked){
        let p = document.createElement('p')
        p.innerHTML = 'This field is requered'
            label.after(p)
            p.classList.add('error')
            isOk = false
    }
    if(isOk){
        calc(inpAmont, inpTerm, inpRate)
    }
}

function calc(inpAmont , inpTerm, inpRate){
    document.querySelector('.emply-results').classList.add('hidden')
    document.querySelector('.complet').classList.remove('hidden')
    let amount = parseFloat(inpAmont.value)
    let term = parseInt(inpTerm.value) * 12
    let rate = parseFloat(inpRate.value)
    
    if(inpRepay.checked){
    let rateM = ((rate / 100) / 12)
    let parcelaM = ((amount * rateM) / (1 - ((1 + rateM)**(-term))))*1000
    let repayTerm = parcelaM * term

    let resultM= Intl.NumberFormat('pt-BR', {
        style:'currency',
        currency:'GBP',
        currencyDisplay:'symbol'
    }).format(parcelaM)
    let totalRepay = Intl.NumberFormat('pt-BR', {
        style:'currency',
        currency:'GBP',
        currencyDisplay:'symbol'
    }).format(repayTerm)
    document.querySelector('.result').innerHTML = resultM
    document.querySelector('.total').innerHTML = totalRepay
    }else{
    let rateM = ((rate / 100) / 12)
    let parcelaM = ((amount * rateM))*1000
    let repayTerm = parcelaM * term

    let resultM= Intl.NumberFormat('pt-BR', {
        style:'currency',
        currency:'GBP',
        currencyDisplay:'symbol'
    }).format(parcelaM)
    let totalRepay = Intl.NumberFormat('pt-BR', {
        style:'currency',
        currency:'GBP',
        currencyDisplay:'symbol'
    }).format(repayTerm)
    document.querySelector('.result').innerHTML = resultM
    document.querySelector('.total').innerHTML = totalRepay
    }
    
}