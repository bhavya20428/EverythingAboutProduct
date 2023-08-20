import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import { ethers } from "ethers";
// Contract address of the deployed smart contract
// const contractAddress = "0xD2DFf998Ad3B205DC60001C5565498Ff7a6f4b3B";

export default function Signin() {
  const [walletAddress, setWalletAddress] = React.useState("");
  const buttons = [
    <NavLink class="navlink" to="/admin" exact>
      <Button
        variant="outlined"
        key="admin"
        sx={{
          "&:hover": { border: "2px solid" },
          border: "1px solid #ffffff",
          fontWeight: 900,
          color: "#ffffff",
          width: "100%",
          mb: 2,
          borderRadius: 0,
        }}
      >
        {" "}
        Login as Admin
      </Button>
    </NavLink>,
    <NavLink class="navlink" to="/seller" exact>
      <Button
        key="seller"
        variant="outlined"
        sx={{
          "&:hover": { border: "2px solid" },
          border: "1px solid #ffffff",
          fontWeight: 900,
          color: "#ffffff",
          width: "100%",
          mb: 2,
          borderRadius: 0,
        }}
      >
        Login as Seller
      </Button>
    </NavLink>,
    <NavLink class="navlink" to="/customer" exact>
      <Button
        key="customer"
        variant="outlined"
        sx={{
          "&:hover": { border: "2px solid" },
          border: "1px solid #ffffff",
          fontWeight: 900,
          color: "#ffffff",
          width: "100%",
          mb: 2,
          borderRadius: 0,
        }}
      >
        {" "}
        Login as Customer
      </Button>
    </NavLink>,
  ];

  // React.useEffect(() => {
  //   (async () => {
  //     const provider = new ethers.BrowserProvider(window.ethereum);
  //     const address = await provider.send("eth_requestAccounts", []);
  //     setWalletAddress(address);
    
  //     const signer = provider.getSigner();
  //   })();

  //   return () => {
  //     // this now gets called when the component unmounts
  //   };
  // }, []);

  // console.log(walletAddress);

  return (
    <Box
      sx={{
        display: "flex",
        "&:hover": {
          boxShadow: 0,
        },
        background: "#000000",
        height: "100vh",
      }}
    >
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="contained"
        sx={{
          m: "auto",
          display: "block",
          boxShadow: 10,

          my: "10%",
          p: 10,
        }}
      >
        {buttons}
      </ButtonGroup>
    </Box>
  );
}
