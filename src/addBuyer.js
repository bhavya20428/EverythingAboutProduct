import * as React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import "@fontsource/roboto/300.css";
import {
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import Button from "@mui/material/Button";
import { ethers } from "ethers";
import abi from "./abi.json";
import { BigNumber } from "@ethersproject/bignumber";


export default function AddBuyer(props) {
  const [itemId, setItemId] = React.useState(0);
  const [buyerWalletId, setBuyerWalletId] = React.useState("");
  const [items, setItems] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setItemId(value);
  };

  const contractAddress = "0x0b0615a0b71a20126CEf157dE230bcE07001eF89";

  // const contract=props["contract"];
  const [provider, setProvider] = React.useState("");
  const [signer, setSigner] = React.useState("");
  const [sellerAddress, setSellerAddress] = React.useState("");
  

  async function setEverything(props) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const address = await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    setProvider(provider);
    setSigner(signer);
  }

  React.useEffect(() => {
    (async () => {
      await setEverything();
      
      
      
      const data = await props["contract"].getAllItems();
      let array = [];
      data.map((item) => {
        console.log(item);
        let itemname = item.name;
        let id = BigNumber.from(item.serialNumber).toString();

        array.push({
          id: id,
          name: itemname, 
        });
        setItems(array);
        return true;
      });


    })();
  }, []);

  const contract = new ethers.Contract(contractAddress, abi, signer);


  const submit = (event) => {
    event.preventDefault();
    (async () => {
      const transaction = await contract.addBuyer(
        buyerWalletId,
        BigNumber.from(itemId).toString()
      );
      console.log(transaction);
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
        Add Buyer
      </Typography>
      <Divider sx={{ mb: 4 }}></Divider>
      <form onSubmit={submit}>
        <FormControl fullWidth>
          <InputLabel id="itemChoose">Choose Item</InputLabel>
          <Select
            labelId="itemChoose"
            id="setItemChoose"
            value={itemId}
            onChange={handleChange}
          >
            {items.map(({ id, name }) => (
              <MenuItem value={id}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <br></br>

        <TextField
          id="newBuyerWalletId"
          label="BuyerWalletId"
          rows={3}
          fullWidth
          multiline
          margin="normal"
          required
          onChange={(event) => {
            setBuyerWalletId(event.target.value);
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
          Add Item
        </Button>
      </form>
    </Paper>
  );
}
