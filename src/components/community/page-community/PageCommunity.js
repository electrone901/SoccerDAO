import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './PageCommunity.css'
import {
  Container,
  StylesProvider,
  Typography,
  Button,
  Card,
  ImageListItem,
} from '@material-ui/core'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import community1 from '../../../images/preview-community.jpg'

import CircularStatic from '../../commons/CircularProgressWithLabel'
import BasicTabs from '../../community/community-container/BasicTabs'

function PageCommunity() {
  const [loading, setLoading] = useState(false)
  const [nfts, setNfts] = useState([])
  const [projectWallet, setProjectWallet] = useState('')
  const [userHistory, setUserHistory] = useState([])
  const [data, setData] = useState('')
  console.log(
    '🚀 ~ file: PageCommunity.js ~ line 24 ~ PageCommunity ~ userHistory',
    userHistory,
  )
  const userWallet = '0x463Eeb088b094D2CeEec50d186A36DdC80c05870' //need to change

  const loadMyCollection = async () => {
    const covalentAPI = 'ckey_d4115699196e4d238fa138e180c'
    try {
      const historyResult = await fetch(
        `https://api.covalenthq.com/v1/137/address/${userWallet}/balances_v2/?nft=true&key=${covalentAPI}`,
      )
      const { data } = await historyResult.json()
      if (data) {
        setData(data)
        setUserHistory(data.items[0].nft_data)
        setLoading(false)
      }
    } catch (error) {
      setLoading(true)
      console.error(error)
    }
  }

  useEffect(() => {
    setLoading(true)
    loadMyCollection()
  }, [])

  console.log(' data', data)
  return (
    <StylesProvider injectFirst>
      <Container
        className="page-community"
        style={{ minHeight: '70vh', paddingBottom: '1rem' }}
      >
        <div>
          <Box sx={{ width: '100%' }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <Typography className="title" color="textPrimary" gutterBottom>
                  RIver West Side Soccer
                </Typography>
                <ImageListItem
                  style={{ height: '300px', width: '450px', listStyle: 'none' }}
                >
                  <img src={community1} alt="community" />
                </ImageListItem>
              </Grid>

              <Grid p xs={6} className="grid-rigth-side">
                <div className="page-wallet-address">
                  <Typography color="textPrimary" gutterBottom>
                    <b> WalletAddress:</b>
                    0x83a8bA10cbc13a5Cd827d020693920cc4a7C1103
                  </Typography>
                  <br />
                  <Button variant="contained" color="primary">
                    Send A Tip
                  </Button>
                  <br />
                  <br />

                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/donate"
                  >
                    Donate NFT
                  </Button>

                  <div className="page-metadata">
                    <Typography variant="body2" color="text.secondary">
                      <b> Description:</b>
                      The RIver West Side Soccer is one of the most beautiful
                      communities in the Upper West Side. Its members are really
                      skillful, friendly and commited. The park hasmany flowers,
                      plants, and trees make this community garden a beautiful
                      and peaceful place.
                    </Typography>
                    <br />

                    <Typography variant="body2" color="text.secondary">
                      <b> Address:</b>123 W 89th St, New York, NY 10024
                    </Typography>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Box>
        </div>

        <br />
        <br />
        <BasicTabs />
        <br />
        <br />
        <Typography className="subtitle" color="textPrimary" gutterBottom>
          The West Side Community Garden NFTs via Covalent
        </Typography>
        <p>
          The Covalent Unified API can be used to pull balances, positions and
          historical granular transaction data from dozens of blockchain
          networks. This data enables hundreds of end-user use-cases like
          wallets, investor dashboards, taxation tools and as-of-yet unknown
          use-cases.
        </p>
        <br />
        <br />

        {data ? (
          <Container>
            <div className="data">
              <p className="info">
                <strong>Contract Address: </strong>
                {data.address}
              </p>
              <p className="info">
                <strong>Last update: </strong> {data.updated_at}
              </p>
              <p>
                <strong className="info">Total Count: </strong>
                {data.items.length}
              </p>
            </div>
          </Container>
        ) : (
          ''
        )}

        {loading ? (
          <CircularStatic />
        ) : (
          <div>
            {userHistory && userHistory.length ? (
              userHistory.map((project, index) => (
                <Card className="card-padding" key={index}>
                  <Grid container spacing={1}>
                    <Grid item xs={2}>
                      <img
                        className="nft-img"
                        src={project.external_data.image}
                        style={{ width: '100%' }}
                        alt=""
                      />
                    </Grid>

                    <Grid item xs={10}>
                      <div className="container-flex">
                        <h2 className="inner2">{project.external_data.name}</h2>
                        <p className="info">
                          TokenId: <strong>{project.token_id}</strong>
                        </p>
                        <p className="info">
                          <strong>Token Balance: </strong>
                          {project.token_balance}
                        </p>
                        <p className="info">
                          <strong>Tokens supported: </strong>
                          {project.supports_erc.length > 0 ? (
                            project.supports_erc.map((index) => (
                              <span>{index}, </span>
                            ))
                          ) : (
                            <p>ERC20</p>
                          )}
                        </p>
                        <p className="info">
                          <strong>Owner: </strong>
                          {project.owner}
                        </p>
                        <p className="info">
                          <strong>Original owner: </strong>
                          {project.original_owner}
                        </p>
                        <p className="info">
                          <strong>Desc: </strong>
                          {project.external_data.description}
                        </p>
                      </div>
                    </Grid>
                  </Grid>
                </Card>
              ))
            ) : (
              <h2>No NFTs Yet...</h2>
            )}
          </div>
        )}
      </Container>
    </StylesProvider>
  )
}

export default PageCommunity
