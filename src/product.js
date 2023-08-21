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
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Reviews from "./reviews";
import AIChatbot from "./aiChatbot";
import AddReview from "./addReview";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import abi from "./abi.json";

// Contract address of the deployed smart contract
const contractAddress = "0x6F993E29B0f357351068667FEFE5aC3F59d5C5db";


const drawerWidth = 240;

function Product(props) {

  const [walletAddress, setWalletAddress] = React.useState("");
  const [provider, setProvider] = React.useState("");
  const [signer, setSigner] = React.useState("");
  const [contract, setContract] = React.useState("");
  const [sellerAddress, setSellerAddress] = React.useState("");

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
  

  const { windowDisplay } = props;
  const {id}=useParams();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mainContent, setMainContent] = React.useState("");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuBar = (key) => {
    if ( key  === "reviews") {
      setMainContent(<Reviews reviews contract={contract}/>);
    } else if (key === "chatbot") {
      setMainContent(<AIChatbot />);
    } else if ( key  === "add") {
      setMainContent(<AddReview />);
    } 
  };


  const drawer =(
    <div>
      <Toolbar>
        <Typography
          variant="h6"
          align="center"
          
          component="div"
          sx={{ fontWeight: "700" ,letterSpacing:2,m:2}}
        >
          {id}
        </Typography>
      </Toolbar>
      {/* <Divider sx={{ backgroundColor: "#ffffff" }} /> */}
      <List sx={{ elevation: 20 }}>
        <ListItem
          key="reviews"
          disablePadding
          onClick={() => handleMenuBar("reviews")}
        >
          <ListItemButton>
            <ListItemIcon>
              <ReviewsOutlinedIcon sx={{ color: "#ffffff" }} />
            </ListItemIcon>
            <ListItemText primary="Reviews" />
          </ListItemButton>
        </ListItem>

        <ListItem
          key="chatbot"
          disablePadding
          onClick={() => handleMenuBar("chatbot")}
        >
          <ListItemButton>
            <ListItemIcon>
              <LightbulbOutlinedIcon sx={{ color: "#ffffff" }} />
            </ListItemIcon>
            <ListItemText primary="AI ChatBot" />
          </ListItemButton>
        </ListItem>

        <ListItem key="add" disablePadding onClick={() => handleMenuBar("add")}>
          <ListItemButton>
            <ListItemIcon>
              <AddCommentOutlinedIcon sx={{ color: "#ffffff" }} />
            </ListItemIcon>
            <ListItemText primary="Add Review" />
          </ListItemButton>
        </ListItem>
      </List>
      {/* <Divider /> */}
    </div>);

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
            <MenuIcon/>
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ fontWeight: "900" }}
          >
          
          </Typography>
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

export default Product;
