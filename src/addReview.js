import * as React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import "@fontsource/roboto/300.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import {ethers } from "ethers";
import abi from'./abi.json';
import { useParams } from "react-router-dom";
import { BigNumber} from "@ethersproject/bignumber";
/* global BigInt */

export default function AddReview(props) {
  const { id } = useParams();
  const [topic, setTopic] = React.useState("");
  const [review, setReview] = React.useState("");
  const [rating, setRating] = React.useState(0);

  const contractAddress = "0x0b0615a0b71a20126CEf157dE230bcE07001eF89";
  // const contract=props["contract"];
  const [provider, setProvider] = React.useState("");
  const [signer, setSigner] = React.useState("");

  const [sellerAddress, setSellerAddress] = React.useState("");
  async function setEverything(){
    const provider = new ethers.BrowserProvider(window.ethereum);
    const address = await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    setProvider(provider);
    setSigner(signer);
  }
  React.useEffect(() => {
    (async () => {
     await setEverything();
    })();
  }, []);
  const contract = new ethers.Contract(contractAddress , abi , signer);

  const submit = (event) => {
    event.preventDefault();
    (async () => {
      try{
        const transaction = await contract.addReviews(BigInt(id) ,topic ,review , rating );
        console.log(transaction);
      }
      catch(err){
        alert("You are not the Buyer for this item!");
      }
    
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
        Add Review
      </Typography>
      <Divider sx={{ mb: 4 }}></Divider>
      <form onSubmit={submit}>
        <TextField
          id="newTopic"
          label="Topic"
          rows={2}
          multiline
          margin="normal"
          fullWidth
          required
          onChange={(event) => {
            setTopic(event.target.value);
          }}
        />
        <br></br>
        <TextField
          id="newReview"
          label="Review"
          rows={4}
          multiline
          margin="normal"
          fullWidth
          required
          onChange={(event) => {
            setReview(event.target.value);
          }}
        />
        <br></br>

        <Rating
          name="simple-controlled"
          size="large"
          defaultValue={0}
          precision={1}
          onChange={(event, newValue) => {
            setRating(newValue);
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
          ADD REVIEW
        </Button>
      </form>
    </Paper>
  );
}
