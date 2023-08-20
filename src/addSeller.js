import * as React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import "@fontsource/roboto/300.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function AddSeller(props) {
  const [sellerWalletId, setSellerWalletId] = React.useState("");
  const contract=props["contract"];
  
  const  submit = (event) => {
      event.preventDefault();
      console.log(contract);

  
      (async () => {
        const transaction = (await contract.testerFunction());
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
