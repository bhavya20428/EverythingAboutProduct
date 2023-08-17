import * as React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import "@fontsource/roboto/300.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";


export default function AddReview(props) {
  const [review, setReview] = React.useState("");
  const [rating, setRating] = React.useState(0);

  const addToComments = ()=>{
    alert(review);
    alert(rating);
    return;
  }
  

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
      <form onSubmit={addToComments}>
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
          precision={0.5}
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
          sx={{ mt: 4 }}
        >
          ADD REVIEW
        </Button>
      </form>
    </Paper>
  );
}
