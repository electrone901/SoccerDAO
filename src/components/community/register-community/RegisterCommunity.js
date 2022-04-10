import React, { useState, useEffect } from 'react'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import './RegisterCommunity.css'
import {
  TextField,
  Container,
  StylesProvider,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core'
import { File } from 'nft.storage'

import { providers } from 'ethers'
import { init } from '@textile/eth-storage'

function RegisterCommunity({ account, contractData }) {
  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [PhysicalAddress, setPhysicalAddress] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const [imageName, setImageName] = useState('')
  const [imageType, setImageType] = useState('')

  useEffect(() => {
    const loadCommunity = async () => {
      try {
        // pass the cid
        const cid = 'QmTFaLUesrjbQLKxNszz2DWZ33N9YuGBSVCLpwXnvyiumz'

        let fileData = await fetch(`https://ipfs.io/ipfs/${cid}`)

        const yourData = await fileData.json()
        console.log(yourData)
      } catch (error) {
        console.log(error)
      }
    }
    loadCommunity()
  }, [])

  const handleImage = (event) => {
    setImage(event.target.files[0])
    setImageName(event.target.files[0].name)
    setImageType(event.target.files[0].type)
    console.log(imageName, imageType)
  }

  const saveToTextile = async () => {
    try {
      // connects to ethereum & web3
      await window.ethereum.enable()
      const provider = new providers.Web3Provider(window.ethereum)
      const wallet = provider.getSigner()
      const storage = await init(wallet)

      // creates a file to save data
      const communityImage = new Blob([image], { type: 'text/plain' })
      const file = new File([communityImage], 'community.txt', {
        type: 'text/plain',
        lastModified: new Date().getTime(),
      })

      // await storage.addDeposit()
      const { cid } = await storage.store(file)
      let formattedCid = cid['/']
      return formattedCid
    } catch (err) {
      console.error(err)
    }
  }

  const saveToChain = async (event) => {
    event.preventDefault()
    const imageFromTextile = await saveToTextile()

    try {
      // save image to textil, get the imageURL then save imgURL and data to chain using the contract
      await contractData.methods
        .registerCommunity(
          imageFromTextile,
          name,
          description,
          PhysicalAddress,
          walletAddress,
        )
        .send({ from: account })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <StylesProvider injectFirst>
      <Container
        className="root-create-pet"
        style={{ minHeight: '70vh', paddingBottom: '3rem' }}
      >
        <div>
          <Typography className="title" color="textPrimary" gutterBottom>
            Register Your Soccer Community
          </Typography>

          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="pet"
              className="img-preview"
            />
          ) : (
            ''
          )}
          <div className="form-container">
            <form className="form" noValidate autoComplete="off">
              {/* Community image */}
              <p className="image-label">Community image</p>
              <input
                accept="image/*"
                className="input"
                id="icon-button-photo"
                defaultValue={image}
                onChange={handleImage}
                type="file"
              />
              <label htmlFor="icon-button-photo">
                <IconButton color="primary" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
              {/* Community image */}

              <TextField
                fullWidth
                id="outlined-basic"
                label="Name"
                variant="outlined"
                className="text-field"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                fullWidth
                id="outlined-basic"
                label="Short Description"
                variant="outlined"
                className="text-field"
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <TextField
                fullWidth
                id="outlined-basic"
                label="Physical Address"
                variant="outlined"
                className="text-field"
                defaultValue={PhysicalAddress}
                onChange={(e) => setPhysicalAddress(e.target.value)}
              />

              <TextField
                fullWidth
                id="outlined-basic"
                label="Digital Wallet Address"
                variant="outlined"
                className="text-field"
                defaultValue={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />

              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={saveToChain}
              >
                Submit
              </Button>
            </form>
          </div>
          {/* <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={saveToTextile}
          >
            getList
          </Button> */}
        </div>
      </Container>
    </StylesProvider>
  )
}

export default RegisterCommunity
