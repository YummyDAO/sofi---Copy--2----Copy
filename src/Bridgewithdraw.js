import * as React from 'react';
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
import './App1.css';
import logo from "./logo300.png"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';  
import telegram from "./Telegram (3).svg"
import twitter from "./Twitter (1).svg"
import gitbook from "./Gitbook (1).svg"
import doge from './Doge_Icon.svg'
import eth from './eth_Icon.svg'
import { createWeb3Modal, useWeb3ModalProvider , useDisconnect, useWeb3ModalAccount,defaultConfig, useWeb3Modal  } from '@web3modal/ethers5/react'
import arrow from "./arrow.svg"
import favicon from "./logo12.png"
import burger from "./burger.svg"
import maker from "./Maker.jpg"
import dubi from "./dubi1.png"
import check from "./check-single.svg"
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import SwapCallsOutlinedIcon from '@mui/icons-material/SwapCallsOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import TextField from '@mui/material/TextField';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { ethers } from 'ethers'
import Tooltip from '@mui/material/Tooltip';

const drawerWidth = 240;
const navItems = ['TWITTER', 'DISCORD', 'DOCS'];


///START web3modal


// 1. Get projectId
const projectId = 'd3e147eaf8b56fbb496ff0601455574e'

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

// 3. Create modal
const metadata = {
  name: 'Dualbit',
  description: 'Unlocking liquidity for DRC20s on EVM networks',
  url: 'https://www.dualbit.exchange/',
  icons: ['https://www.dualbit.exchange/favicon.ico']
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId
})

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [age, setAge] = React.useState('');
  const [age1, setAge1] = React.useState('');
  const [age2, setAge2] = React.useState('');
  const [CurrentAccount, setAccount] = React.useState('');

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleChange1 = (event) => {
    setAge(event.target.value);
  };
  const handleChange2 = (event) => {
    setAge1(event.target.value);
  };
  const handleChange3 = (event) => {
    setAge2(event.target.value);
  };

  const { open } = useWeb3Modal()
  const { disconnect } = useDisconnect()
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()

  console.log(address, 'address');
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Link href="https://dualbit.exchange/" className='lip fi'>
        <img src={logo}></img>
      </Link>
      <Link href="https://dualbit.gitbook.io/dualbit/" className='itu'>
        <Typography className=''>Docs</Typography>
      </Link>
      <Link href="/" className='itu'>
        <Typography className=''>Bridge</Typography>
      </Link>
      <Link href="/withdraw" className='itu'>
        <Typography className=''>Withdraw</Typography>
      </Link>
      <Link href="#" className='itu'>
      <Tooltip title="Coming soon">
        <Typography className='fir'>Staking </Typography>
        </Tooltip>
      </Link>

      <div className='bottom'>
      <div className='socials-link-wg '>
        <Link href="https://twitter.com/Dualbit_Bridge" className='social-link'>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M13.7036 3.61258C13.2448 3.80921 12.7579 3.94966 12.271 4.00584C12.7954 3.69685 13.1887 3.20059 13.3759 2.62006C12.8797 2.90096 12.3459 3.11632 11.7935 3.22868C10.8478 2.2268 9.2654 2.16126 8.26352 3.10696C7.7579 3.57513 7.46763 4.24929 7.46763 4.94218C7.46763 5.12945 7.47699 5.32608 7.53317 5.51335C5.50132 5.41035 3.62865 4.45529 2.35523 2.90097C1.69043 4.0433 2.01815 5.51335 3.12302 6.24369C2.72976 6.23433 2.34586 6.13133 1.99942 5.9347L1.99942 5.96279C1.99942 7.15194 2.84212 8.18191 4.00318 8.416C3.79719 8.48154 3.57247 8.50027 3.34775 8.50027C3.18857 8.50027 3.02939 8.4909 2.87958 8.46281C3.20729 9.47406 4.14363 10.1669 5.22042 10.2044C4.34026 10.8973 3.25411 11.2718 2.12114 11.2718C1.92451 11.2718 1.72788 11.2625 1.53125 11.2344C2.67358 11.9741 4.00318 12.358 5.37023 12.358C9.96765 12.358 12.477 8.54708 12.477 5.25117C12.477 5.13881 12.477 5.02645 12.4677 4.93282C12.9452 4.55828 13.3666 4.10884 13.7036 3.61258Z" fill="#443F8B" fill-opacity="0.8"></path></svg>
        </Link>
        <Link href="https://t.me/dualbitbridge" className='social-link'>
          <svg width="16" height="15" viewBox="0 0 16 15" fill="none"><path d="M13.8667 2.09876L2.1344 7.16435C2.02204 7.21117 1.96586 7.34225 2.02204 7.45461C2.04077 7.50143 2.06886 7.53888 2.11567 7.55761L4.84978 9.16811C4.87787 9.18684 4.90596 9.21493 4.91532 9.25238L6.17002 12.979C6.20747 13.0914 6.33856 13.1569 6.45092 13.1195C6.48837 13.1101 6.51646 13.0914 6.54455 13.0633L8.18314 11.3123C8.22996 11.2655 8.30487 11.2561 8.36105 11.2842L10.4678 12.4359C10.5708 12.4921 10.7113 12.4547 10.7674 12.3517C10.7768 12.3423 10.7768 12.3236 10.7862 12.3142L14.1663 2.37966C14.2038 2.2673 14.1476 2.13622 14.0259 2.09876C13.9697 2.08004 13.9135 2.08004 13.8667 2.09876ZM6.99399 10.1138L6.38537 11.8179L5.50522 9.13066L11.9098 4.25234L6.99399 10.1138Z" fill="#443F8B" fill-opacity="0.8"></path></svg>
        </Link>
      </div>
      </div>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" position="fixed" className='fixed '>
        <Toolbar>
          {/*<Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>*/}
            <div className='container1 pup'>
              <div className='row1 tipi'>
                <Link href="https://www.dualbit.exchange/" className='lip fi'>
                  <img src={logo}></img>
                </Link>
                  <Link href="/" className='itu non'>
                    <Typography className=''>Bridge</Typography>
                  </Link>
                  <Link href="/withdraw" className='itu non'>
                    <Typography className=''>Withdraw</Typography>
                  </Link>
                  <Link href="#" className='itu non'>
                  <Tooltip title="Coming soon">
                    <Typography className='fir'>Staking</Typography>
                    </Tooltip>
                  </Link>
                <div className='btn-wrap1 non'>
                {isConnected ?
                <Typography className=' btn--primary-border btn'>{address.slice(0, 6)}...{address.slice(-4)}</Typography>
                :
                <a onClick={open} class="btn btn--primary-border non">Connect Wallet</a>}
                </div>


                <div className='socials-link-wg non'>
                <Link href="https://dualbit.gitbook.io/dualbit/" className='social-link'>
                    <img src={gitbook} className=''></img>
                  </Link>
                  <Link href="https://twitter.com/Dualbit_Bridge" className='social-link'>
                  <img src={twitter} className=''></img>
                  </Link>
                  <Link href="https://t.me/dualbitbridge" className='social-link'>
                  <img src={telegram} className=''></img>
                  </Link>
                  {isConnected ?
                  <a onClick={disconnect} class="btn1 btn--primary-border non">
                    <LogoutOutlinedIcon/>
                  </a>
                  :
                  <span></span>}
                </div>

                <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
                className=''
              >
                <MenuIcon />
              </IconButton>
              </div>
            </div>
            
          {/*<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
            </Box>*/}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          className=''
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
        <div className='hero-section'>
          <div className='hero-bg'></div>
          <div className='container1'>
            <div className='row1'>
              <div className='bridge'>
                <Typography className='bridge-text'>Withdraw</Typography>
                <Typography className='w1-bridgei ti2'>Dualbit is the first ever dual-sided bridge designed for easy cross network transfers between DRC20 and ERC20 tokens.</Typography>
                <div className='from'>
                <Box sx={{ minWidth: 120 }} className='meit1'>
                <Typography className='w1-bridge ml'>Enter amount</Typography>
                <Tooltip title="Enter amount to bridge">
                  <TextField id="outlined-basic" placeholder="Enter amount" variant="outlined" className=''/>
                  </Tooltip>
                </Box>
                <Box sx={{ minWidth: 120 }} className='meit2'>
                <Typography className='w1-bridge ml'>Chain</Typography>
                  <FormControl fullWidth>
                  <Tooltip title="Select chain from">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age1}
                      label="Age"
                      onChange={handleChange2}
                    >
                      <MenuItem value={1}>
                      <img className='with' src={eth}></img>  &nbsp;
                        Ethereum
                        </MenuItem>
                    </Select>
                    </Tooltip>
                  </FormControl>
                </Box>

                </div>
                  <Typography className='w1-bridge ml'>To</Typography>
                <div className='to'>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                    <Tooltip title="Select chain to">
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age2}
                        label="Age"
                        onChange={handleChange3}
                      >
                      <MenuItem value={3}><img className='with' src={doge}></img> &nbsp;Doge</MenuItem>
                      </Select>
                      </Tooltip>
                    </FormControl>
                  </Box>
                </div>
                <Typography className='w1-bridge ml'>Recipent Address</Typography>
                <Tooltip title="Enter only supported ethereum addresses">
                <TextField id="outlined-basic" placeholder="Enter address" variant="outlined" className='tit'/>
                </Tooltip>
                <div className='lastdiv'>
                  <div className='ri1'>
                  <InfoOutlinedIcon/>
                  </div>
                  <span className='w1-bridge22 ri'>Bridging takes between 5-10 mins for ERC20 TO DRC20 transfers.</span>
                </div>
                {isConnected ?
                <Button className='btn--primary' variant="contained" disabled>Withdraw</Button>
                :
                <Button onClick={open} className='btn--primary' variant="contained" >Connect Wallet</Button>}
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
}

export default DrawerAppBar;
