import './style.css'
import { StellarWalletsKit, Networks } from '@creit.tech/stellar-wallets-kit'
import { defaultModules } from '@creit.tech/stellar-wallets-kit/modules/utils'

// (esto es solo un testnet)
StellarWalletsKit.init({
  modules: defaultModules(),
  network: Networks.TESTNET,
})

document.querySelector('#app').innerHTML = `
  <section style="text-align:center; padding:2rem;">
    <h1>Mi primera app en Stellar</h1>
    <p>un wallet para empezar.</p>
    <button id="connect">Conectar wallet</button>
    <button id="disconnect" style="display:none;">Desconectar</button>
    <p id="status"></p>
  </section>
`

const connectBtn = document.querySelector('#connect')
const disconnectBtn = document.querySelector('#disconnect')
const status = document.querySelector('#status')

connectBtn.addEventListener('click', async () => {
  try {
    const { address } = await StellarWalletsKit.authModal()
    status.textContent = `Wallet conectada: ${address}`
    connectBtn.style.display = 'none'
    disconnectBtn.style.display = 'inline-block'
  } catch (error) {
    status.textContent = 'No se pudo conectar la wallet.'
    console.error(error)
  }
})

disconnectBtn.addEventListener('click', async () => {
  await StellarWalletsKit.disconnect()
  status.textContent = ''
  connectBtn.style.display = 'inline-block'
  disconnectBtn.style.display = 'none'
})