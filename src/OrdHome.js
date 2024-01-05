import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import './App.css';
import logo from "./Ordinals.png"
import arrow from "./arrow.svg"
import favicon from "./logo1.png"
import burger from "./burger.svg"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import maker from "./Maker.jpg"
import check from "./check-single.svg"
import { Card } from '@mui/material';
import Dividerimg from './divider.svg'
import TextField from '@mui/material/TextField';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import useSWR from 'swr'
import {ZeroAddress, ethers, providers} from "ethers";
import { ThirtyFpsOutlined } from '@mui/icons-material';

const drawerWidth = 240;
const navItems = ['TWITTER', 'DISCORD', 'DOCS'];
const CONTRACT_ADDRESS = '0x29Ff0139ff9FC8184982b34706256C8740386D97';
const contractAbi = [{"inputs":[{"internalType":"uint256","name":"_rate","type":"uint256"},{"internalType":"address","name":"_wallet","type":"address"},{"internalType":"uint256","name":"_cap","type":"uint256"},{"internalType":"uint256","name":"_individualcap","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"TotalRaised","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_beneficiary","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"buyTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"cap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"capReached","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"contributions","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"finalize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_beneficiary","type":"address"}],"name":"getUserCap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_beneficiary","type":"address"}],"name":"getUserContribution","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hasclosed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"individualcap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isFinalized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"setToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"wallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"weiRaised","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawTokens","outputs":[],"stateMutability":"nonpayable","type":"function"}]

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function DrawerAppBar(props) {
  //const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currentAccount, setCurrentAccount] = React.useState('');
  const [balance, setBalance] = React.useState('');
  const [input, setInput] = React.useState('');
  const [rate, setRate] = React.useState('');
  const [ethbalance, setEthbalance] = React.useState('');

  const rateunit = 10000000000000;
  let change
  let rule

  const change3 = (event) => {
    setInput(event.target.value);
    //console.log("td", ethers.parseUnits(event.target.value ? event.target.value : 0, 18) * rateunit)
    change = ethers.parseUnits(event.target.value ? event.target.value : 0, 18)
    console.log("change", change)
    rule = Number(change) / Number(rateunit)
    console.log('rule',rule)
    setRate(rule)
  };

  console.log("rate", rate)

  const connectWallet = async () => {
    try {
        const { ethereum } = window;
  
        if (!ethereum) {
            alert("Get MetaMask -> https://metamask.io/");
            return;
        }
  
        // Fancy method to request access to account.
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    
        // Boom! This should print out public address once we authorize Metamask.
        console.log("Connected", accounts[0]);
        setCurrentAccount(accounts[0]);
    } catch (error) {
        console.log(error)
    }
  };

  async function Getbal() {
    try {
        const { ethereum } = window;
        if (ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = provider.getSigner();
            //const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, signer);
            const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, provider)
  
            let tx = await contract.balanceOf(currentAccount);
            //await tx.wait();
            console.log("bal", ethers.formatUnits(tx, 18))
            setBalance(ethers.formatUnits(tx, 18))
        }
      } catch(error) {
        console.log(error);
      }
  };


  const Mint = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, signer)
          let tx = await contract.buyTokens(currentAccount, ethers.parseUnits(input, 18), {value: ethers.parseEther(input)});
          await tx.wait();
      }
    } catch(error) {
      console.log(error);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      {/*<Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>*/}
      <Link href="#" className='mr2'>
        <img src={logo}></img>
        <Typography>Base Ordinals</Typography>
      </Link>
      <Divider />
      <div className=''>
        <Link >
          <Typography>Home</Typography>
        </Link>
      </div>
    </Box>
  );

  //const container = window !== undefined ? () => window().document.body : undefined;

  const { data, error} = useSWR('Getbal', Getbal, {refreshInterval: 1000})

  useEffect(() => {
    //connectWallet();
    Getbal();
}, [currentAccount]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" position="fixed" className='fixed'>
        <Toolbar>
          {/*<Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>*/}
          <div className='innernav'>
            <Link href="#" className='mr1'>
              <img src={logo}></img>
              <Typography className=''>Base Ordinals</Typography>
            </Link>
            <div className='nav-items'>
              <Link href="" underline="none" color="inherit" className='css-1fn6sd1'>
                <Typography >Home</Typography>
              </Link>
              <Link href="/" underline="none" color="inherit" className='css-1fn6sd1 none'>
                <Typography >Inscribe</Typography>
              </Link>
              <Link href="" underline="none" color="inherit" className='css-1fn6sd1'>
                <Typography >Marketplace</Typography>
              </Link>
              <Link href="" underline="none" color="inherit" className='css-1fn6sd1'>
                <Typography >Collections</Typography>
              </Link>
              <Link href="" underline="none" color="inherit" className='css-1fn6sd1'>
                <Typography >My Inscriptions</Typography>
              </Link>
            </div>
            <Link href="" underline="none" color="inherit" className='css-1fn6sd1'>
              <Typography >Leaderboard</Typography>
            </Link>
            { currentAccount ? <span className="connect">{currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}</span> : <span> Connect Wallet </span> }
          </div>
            
          {/*<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
            </Box>*/}
            <div className='mobile'>
              <Link href="#" className='lu1'>
                <img src={logo}></img>
                <Typography className=''>Base Ordinals</Typography>
              </Link>
              { currentAccount ? <span className="connect">{currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}</span> : <Button variant='contained'> Connect Wallet </Button> }
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                className=''
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
              <MenuIcon />
              {/*<SearchRoundedIcon />*/}
            </IconButton>
          </div>
        </Toolbar>
          <Divider className='divide'/>
      </AppBar>
      <nav>
        <Drawer
          //container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Container maxWidth="lg" className='mtp2'>
          <Grid container className='genesis'>
            <Grid item xs={12} sm={12} md={6} lg={6} >
              <div className=''>
                <Typography className=''>Base Ordinals</Typography>
                <Typography className=''>
                The Ethernals protocol is a new way of inscribing inscriptions on the Ethereum blockchain. The content of the inscription is immutable, and the data is permanently stored on the Ethereum blockchain. Inscription supports a variety of content formats, including text, images, HTMLs, and videos.
                </Typography>
                <div className='btnway'>
                  <Button variant='contained' className=''>Whitepaper</Button>
                </div>
              </div>
              <div className='divider'>
                <img className='' src={Dividerimg}></img>
              </div>
              <div className=''>
                <Typography>Recent Inscriptions</Typography>
                <div className='start-wrap'>
                  <Card className='width20'></Card>
                </div>
              </div>
            </Grid>
          </Grid> 
        </Container>
      </Box>
    </Box>
  );
}

export default DrawerAppBar;
