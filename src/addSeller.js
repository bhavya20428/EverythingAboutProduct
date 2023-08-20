import * as React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import "@fontsource/roboto/300.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ethers } from "ethers";
import abi from './abi.json';
// Contract address of the deployed smart contract
const contractAddress = "0x84b8B40bD7fc3c0BDdfc0d381Ff5BFe370585c28";
export default function AddSeller(props) {
  const [sellerWalletId, setSellerWalletId] = React.useState("");


  const [walletAddress, setWalletAddress] = React.useState("");
  const [provider , setProvider] = React.useState("");
  const [signer , setSigner] = React.useState("");
  const [contract , setContract] = React.useState("");
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
      // readData();
      
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);
 
   const  submit = () => {
  
      (async () => {
        const transaction = await contract.addSeller("name" , walletAddress , 100 , 100);
        await transaction.wait();
      })();

    return;
  };

  return (
    <Paper square sx={{ p: 2, pb: "50px", boxShadow: 0 }}>
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        sx={{ pb: 0, mb: 2, fontFamily: "Arial", fontWeight: 500 }}
      >
        Add Seller
      </Typography>
      <Divider sx={{ mb: 4 }}></Divider>
      <form onSubmit={submit}>
        <TextField
          id="newSellerWalletId"
          label="sellerWalletId"
          rows={2}
          fullWidth
          multiline
          margin="normal"
          required
          onChange={(event) => {
            setSellerWalletId(event.target.value);
          }}
        />
        <br></br>

        <Button
          type="submit"
          variant="contained"
          size="large"
          color="info"
          sx={{
            mt: 4,
            "&:hover": { backgroundColor: "#000000" },
            backgroundColor: "#000000",
            fontWeight: 900,
            color: "#ffffff",
            borderRadius: 0,
            boxShadow: 0,
          }}
        >
          Add Seller
        </Button>
      </form>
    </Paper>
  );
}
