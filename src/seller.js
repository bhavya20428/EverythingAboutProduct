import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AllItems from "./allItems";
import AddItem from "./addItem";
import AddBuyer from "./addBuyer";
import { NavLink } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { ethers } from "ethers";
import abi from "./abi.json";
// Contract address of the deployed smart contract
const contractAddress = "0x0b0615a0b71a20126CEf157dE230bcE07001eF89";


const drawerWidth = 240;

export default function Seller(props) {
  
  const { windowDisplay } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [walletAddress, setWalletAddress] = React.useState("");
  const [provider, setProvider] = React.useState("");
  const [signer, setSigner] = React.useState("");
  const [contract, setContract] = React.useState("");
  const [sellerAddress, setSellerAddress] = React.useState("");
  const [mainContent, setMainContent] = React.useState(
    ""
  );

  React.useEffect(() => {
    (async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const address = await provider.send("eth_requestAccounts", []);
      setProvider(provider);
      setWalletAddress(address);
      setSigner(provider.getSigner());
      const contracts = new ethers.Contract(contractAddress, abi, provider);
      setContract(contracts);
    })();

    return () => {};
  }, []);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuBar = (key) => {
    if (key === "items") {
      setMainContent(<AllItems contract={contract} />);
    } else if (key === "addItem") {
      setMainContent(<AddItem contract={contract} />);
    } else if (key === "addBuyer") {
      setMainContent(<AddBuyer contract={contract} />);
    }
  };
  const name="Seller";

  const drawer = (
    <div>
      <Toolbar>
        <Typography
          variant="h6"
          align="center"
          component="div"
          sx={{ fontWeight: "700", letterSpacing: 2, m: 2 }}
        >
          {name}
        </Typography>
      </Toolbar>
      <List sx={{ elevation: 20 }}>
        <ListItem
          key="items"
          disablePadding
          onClick={() => handleMenuBar("items")}
        >
          <ListItemButton>
            <ListItemIcon>
              <StoreOutlinedIcon sx={{ color: "#ffffff" }} />
            </ListItemIcon>
            <ListItemText primary="See Items" />
          </ListItemButton>
        </ListItem>

        <ListItem
          key="addItem"
          disablePadding
          onClick={() => handleMenuBar("addItem")}
        >
          <ListItemButton>
            <ListItemIcon>
              <AddCircleOutlineIcon sx={{ color: "#ffffff" }} />
            </ListItemIcon>
            <ListItemText primary="Add Item" />
          </ListItemButton>
        </ListItem>
        <ListItem
          key="addBuyer"
          disablePadding
          onClick={() => handleMenuBar("addBuyer")}
        >
          <ListItemButton>
            <ListItemIcon>
              <AddCircleOutlineIcon sx={{ color: "#ffffff" }} />
            </ListItemIcon>
            <ListItemText primary="Add Buyer" />
          </ListItemButton>
        </ListItem>
        <NavLink class="navlink" to="/" exact>
          <ListItem key="logout" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LogoutOutlinedIcon sx={{ color: "#ffffff" }} />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                sx={{ all: "unset", color: "#ffffff", textDecoration: "none" }}
              />
            </ListItemButton>
          </ListItem>
        </NavLink>
      </List>
    </div>
  );

  const container =
    windowDisplay !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Heading */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          display: { sm: "none" },
          ml: { sm: `${drawerWidth}px` },
          boxShadow: 0,
          backgroundColor: "#000000",
          color: "#ffffff",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },
              backgroundColor: "#000000",
              color: "#ffffff",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ fontWeight: "900" }}
          ></Typography>
        </Toolbar>
      </AppBar>

      {/* MenuBar */}
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="menu bar"
        id="menuBar"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

        {/* Small Screen */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },

            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#000000",
              color: "#ffffff",
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Large Screen */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#000000",
              color: "#ffffff",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar sx={{ display: { sm: "none" } }} />

        {mainContent}
      </Box>
    </Box>
  );
}

