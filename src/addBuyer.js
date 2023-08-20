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

export default function AddBuyer(props) {
  const [itemIds, setItemIds] = React.useState([]);
  const [buyerWalletId, setBuyerWalletId] = React.useState("");
  const items = [
    { id: "1", name: "abc" },
    { id: "2", name: "xyz" },
  ];
  

  // React.useEffect(() => {
  //   setItems([]);
  // }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setItemIds(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const submit = () => {
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
            multiple
            value={itemIds}
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
