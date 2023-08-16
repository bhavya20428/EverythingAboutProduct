import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
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
import './ResponsiveDrawer.css';
import Comments from "./comments.js";


const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ fontWeight: "500" }}
        >
          Herbal Facewash
        </Typography>

      </Toolbar>
      <Divider sx={{backgroundColor: "#ffffff"}} />
      <List sx={{ elevation: 20 }}>
        <ListItem key="Product Reviews" disablePadding onclick="setActive()">
          <ListItemButton>
            <ListItemIcon>
              <ReviewsOutlinedIcon sx={{ color: "#ffffff" }} />
            </ListItemIcon>
            <ListItemText primary="Reviews" />
          </ListItemButton>
        </ListItem>

        <ListItem key="AI Summary" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LightbulbOutlinedIcon sx={{ color: "#ffffff" }} />
            </ListItemIcon>
            <ListItemText primary=" AI Summary" />
          </ListItemButton>
        </ListItem>

        <ListItem key="Add Comment" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AddCommentOutlinedIcon sx={{ color: "#ffffff" }} />
            </ListItemIcon>
            <ListItemText primary="Add Comment" />
          </ListItemButton>
        </ListItem>
      </List>
      {/* <Divider /> */}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      {/* <CssBaseline /> */}

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
        <Typography paragraph>
          <Comments />
        </Typography>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
