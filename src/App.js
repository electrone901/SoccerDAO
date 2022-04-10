import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/layout/navbar/Navbar'
import Footer from './components/layout/footer/Footer'
import Home from './components/home-container/home/Home'
import PetDetails from './components/home-container/pet-details/PetDetails'
import CreatePet from './components/create-post/CreatePlant'

import PlantswapContainer from './components/plantswap/plantswap-container/PlantswapContainer'
import CommunityContainer from './components/community/community-container/CommunityContainer'
import PageCommunity from './components/community/page-community/PageCommunity'
import DonateNFT from './components/donate-nft/DonateNFT'

//  new
import RegisterCommunity from './components/community/register-community/RegisterCommunity'
import CommunityList from './components/community/community-list/CommunityList'

import Web3 from 'web3'
import community from './abis/Community.json'
import { useState } from 'react'

function App() {
  // Add variables
  const [account, setAccount] = useState('')
  const [contractData, setContractData] = useState('')

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.request({ method: 'eth_requestAccounts' })
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying Metamask!',
      )
    }
  }

  const getContract = async () => {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])
    const networkId = await web3.eth.net.getId()
    const networkData = community.networks[networkId]

    if (networkData) {
      const abi = community.abi
      const address = community.networks[networkId].address
      const myContract = new web3.eth.Contract(abi, address)

      setContractData(myContract)
    } else {
      window.alert(
        'Contract is not deployed to the detected network. Connect to the correct network!',
      )
    }
  }

  const connectWallet = async () => {
    await loadWeb3()
    await getContract()
  }

  return (
    <Router>
      <div className="cl">
        <Navbar account={account} connectWallet={connectWallet} />
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/">
          <CommunityList account={account} contractData={contractData} />
        </Route>

        <Switch>
          <Route path="/register-community">
            <RegisterCommunity account={account} contractData={contractData} />
          </Route>

          <Route exact path="/create-pet" component={CreatePet} />

          <Route path="/plant-swap">
            <PlantswapContainer account={account} contractData={contractData} />
          </Route>

          {/* <Route exact path="/community" component={CommunityContainer} /> */}

          <Route path="/community">
            <CommunityContainer account={account} contractData={contractData} />
          </Route>

          <Route exact path="/page-community" component={PageCommunity} />
          <Route exact path="/create-pet" component={CreatePet} />
          <Route exact path="/donate" component={DonateNFT} />

          <Route path="/pet-details/:petId">
            <PetDetails account={account} contractData={contractData} />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App
