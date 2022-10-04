// Web3
const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum)
        try {
          // ask user permission to access his accounts
          await window.ethereum.request({ method: 'eth_requestAccounts' })
          resolve(web3)
        } catch (error) {
          reject(error)
        }
      } else {
        reject('MetaMask no esta Instalado')
      }
    })
  })
}

const contractAddress = '0xe8199be9F64A76509E69d257d593F104FCcc51D6'
const abi = JSON.parse(
  '[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"string","name":"message","type":"string"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"},{"indexed":false,"internalType":"string","name":"keyword","type":"string"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address payable","name":"addressTo","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"message","type":"string"},{"internalType":"string","name":"keyword","type":"string"}],"name":"addToBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getAllTransfer","outputs":[{"components":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"string","name":"message","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"string","name":"keyword","type":"string"}],"internalType":"struct Transacciones.TransferStruct[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTransferCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]',
)

// Contract
const getContract = async web3 => {
  const quote = new web3.eth.Contract(abi, contractAddress)
  return quote
}


//Smart contract functions
const getTransferCount = async (result, contract) => {
  result = await contract.methods.getTransferCount().call()
  document.getElementById('transacciones').innerHTML = result
}

//Smart contract functions
const getAllTransferencia = async (result, contract) => {
  result = await contract.methods.getAllTransfer().call()
 
  document.getElementById('lastInfo').innerHTML = result
}


  
const envioRemesas = async (result, contract, accounts) => {

 

let inputCuenta
$('#cuenta').on('change', e => {
  inputCuenta = e.target.value
  console.info('Cuenta',inputCuenta)
})


let inputMonto
$('#monto').on('change', e => {
  inputMonto = e.target.value
  console.info('Monto',inputMonto)
})

let inputMensaje
$('#mensaje').on('change', e => {
  inputMensaje = e.target.value
  console.info('Mensaje',inputMensaje)
})

  $('#form').on('submit', async e => {
    e.preventDefault()
    
    result =  await contract.methods.addToBlock(inputCuenta,'1',inputMensaje,'keyword').send({ from: accounts[0] })
   // getQuote(result, contract)
  })
}



// App
async function quoteApp() {
  const web3 = await getWeb3()
  const accounts = await web3.eth.getAccounts()
  const contract = await getContract(web3)
  let quote
console.info('cuenta origen ',accounts)
console.info('idcontracto inteligente',contract)

getTransferCount(quote, contract)
getAllTransferencia(quote, contract)

envioRemesas(quote, contract, accounts)
  //setQuote(quote, contract, accounts)
}

quoteApp()