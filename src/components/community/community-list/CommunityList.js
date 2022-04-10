import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './CommunityList.css'
import {
  StylesProvider,
  Typography,
  Button,
  Container,
} from '@material-ui/core'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

function CommunityList({ account, contractData }) {
  // Add variables
  const [communities, setCommunities] = useState([])
  const [communityCount, setCommunityCount] = useState(0)

  useEffect(() => {
    const getCommunityList = async () => {
      try {
        // gets communityCount from chain
        const count = await contractData.methods.count().call()
        setCommunityCount(count)
        console.log('communityCount', communityCount)

        // gets community data
        const temp = []
        for (let i = count; i >= 1; i--) {
          const community = await contractData.methods.communityList(i).call()
          community.image = await getImage(community.imageURL)
          temp.push(community)
        }

        setCommunities(temp)
      } catch (error) {
        console.log(error)
        // setLoading(false)
      }
    }
    getCommunityList()
  }, [contractData, communityCount])

  const getImage = (ipfsURL) => {
    if (!ipfsURL) return
    ipfsURL = ipfsURL.split('://')
    return 'https://ipfs.io/ipfs/' + ipfsURL
  }

  const createData = (image, name, location, description) => {
    return { image, name, location, description }
  }

  const rows = [
    createData(
      'https://images.unsplash.com/photo-1567989995326-46ed902b0494?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      'RIver West Side Soccer',
      '123 W 89th St, New York, NY 10024',
      'One of the best Soccer communities of NYC, Upper West Side. Beautiful and Peaceful place.',
    ),
    createData(
      'https://images.unsplash.com/photo-1628891890377-57dba2715caf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
      'RIver West Side Soccer',
      '123 W 89th St, New York, NY 10024',
      'One of the best Soccer communities of NYC, Upper West Side. Beautiful and Peaceful place.',
    ),
    createData(
      'https://images.unsplash.com/flagged/photo-1568105631375-d992b82a905b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
      'RIver West Side Soccer',
      '123 W 89th St, New York, NY 10024',
      'One of the best Soccer communities of NYC, Upper West Side. Beautiful and Peaceful place.',
    ),
    createData(
      'https://images.unsplash.com/photo-1598881034666-6d3443d4b1bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      'RIver West Side Soccer',
      '123 W 89th St, New York, NY 10024',
      'One of the best Soccer communities of NYC, Upper West Side. Beautiful and Peaceful place.',
    ),
    createData(
      'https://images.unsplash.com/photo-1598881034666-6d3443d4b1bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      'RIver West Side Soccer',
      '123 W 89th St, New York, NY 10024',
      'One of the best Soccer communities of NYC, Upper West Side. Beautiful and Peaceful place.',
    ),
    createData(
      'https://images.unsplash.com/photo-1529325708907-1c972159dbfb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      'RIver West Side Soccer',
      '123 W 89th St, New York, NY 10024',
      'One of the best Soccer communities of NYC, Upper West Side. Beautiful and Peaceful place.',
    ),
  ]

  return (
    <StylesProvider injectFirst>
      <Container>
        <div>
          <Typography className="title" color="textPrimary" gutterBottom>
            Soccer DAO Communities
          </Typography>
        </div>
        {communities ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead></TableHead>
              <TableBody>
                {communities.map((row, idx) => (
                  <TableRow
                    key={idx}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <img
                        src={row.image}
                        className="community-img"
                        alt="community"
                      />
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        className="subtitle"
                        color="textPrimary"
                        gutterBottom
                      >
                        {row.communityName}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">{row.physicalAddress}</TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="left">
                      <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/page-community"
                      >
                        Visit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          'Loading...'
        )}

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead></TableHead>
            <TableBody>
              {rows.map((row, idx) => (
                <TableRow
                  key={idx}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img
                      src={row.image}
                      className="community-img"
                      alt="community"
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      className="subtitle"
                      color="textPrimary"
                      gutterBottom
                    >
                      {row.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">{row.location}</TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                  <TableCell align="left">
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to="/page-community"
                    >
                      Visit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </StylesProvider>
  )
}

export default CommunityList
