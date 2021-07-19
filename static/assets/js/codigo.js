
const setup = () => {
    let divs = document.querySelectorAll('.qr-img')
    divs.forEach((div,i) => {
        const str = (i + 1) + ''
        const qrString = `${window.location.origin}/api/productos?codigo=PRCODE${str.padStart(3,'0')}`
        if(i === 0) {
            
            document.getElementById('example').innerText = qrString
        }
        new QRCode(div,qrString)
    })

}

setup()