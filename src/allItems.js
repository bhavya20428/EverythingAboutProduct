import * as React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import "@fontsource/roboto/300.css";
import { NavLink } from "react-router-dom";
import { ethers } from "ethers";
import abi from './abi.json';
// Contract address of the deployed smart contract
const contractAddress = "0x6F993E29B0f357351068667FEFE5aC3F59d5C5db";
export default function AllItems() {
  const [walletAddress, setWalletAddress] = React.useState("");
  const [provider , setProvider] = React.useState("");
  const [signer , setSigner] = React.useState("");
  const [contract , setContract] = React.useState("");
  const [sellerAddress , setSellerAddress] = React.useState("");
  React.useEffect(() => {
    (async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const address = await provider.send("eth_requestAccounts", []);
      setProvider(provider);
      setWalletAddress(address);
      setSigner(provider.getSigner())
      const contract= new ethers.Contract(contractAddress , abi , provider);
      setContract(contract);
      console.log(contract);
      readData();
      
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  async function  readData() {
    // const mainData = await contract.getAllItems();
    console.log(await contract.getAllItems()[0].description);

  }
 
  const info = [
    { id: "1", primary: "Natural Facewash", secondary: "Rs. 50", description: "People fgtrbb  tghyhy6" },
  ];
  const count = info.length;
  return (
    <Paper square sx={{ p: 2, pb: "50px", boxShadow: 0 }}>
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        sx={{ pb: 0, mb: 2, fontFamily: "Arial", fontWeight: 500 }}
      >
        Items ({count})
      </Typography>

      <Divider sx={{ mb: 4 }}></Divider>

      <Grid container spacing={2} alignItems="center">
        {info.map(({ id, primary, secondary,description }) => (
          <Card
            key={id}
            sx={{
              margin: 2,
              border: 0,
              width: { sm: 300, xs: "90%" },
              borderRadius: 3,
              boxShadow: 2,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  height: 40,
                  fontFamily: "Roboto",
                  color: "#46474a",
                  lineHeight: "1.5",
                }}
              >
                {primary}
              </Typography>

              <Typography
                variant="body2"
                component="div"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  height: 40,
                  fontFamily: "Roboto",
                  color: "#46474a",
                  lineHeight: "1.5",
                }}
              >
                {description}
              </Typography>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item sm={6} xs={12}>
                  <Typography variant="h6">{secondary}</Typography>
                </Grid>

                <Grid item sm={6} xs={12}>
                  <NavLink class="navlink" to={`/product/${primary}`} exact>
                    <Button
                      variant="contained"
                      sx={{
                        "&:hover": { backgroundColor: "#000000" },
                        backgroundColor: "#000000",
                        fontWeight: 900,
                        color: "#ffffff",
                        borderRadius: 2,
                        boxShadow: 0,
                      }}
                    >
                      Open
                    </Button>
                  </NavLink>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Paper>
  );
}
