import * as React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import "@fontsource/roboto/300.css";
import { useParams } from "react-router-dom";
import { BigNumber } from "@ethersproject/bignumber";
/* global BigInt */
export default function Reviews(props) {

  const contract = props["contract"];
  const [info, setInfo] = React.useState([]);
  const {id}=useParams();
  const [average,setAverage]=React.useState(0);

  React.useEffect(() => {
    (async () => {

      const data = await contract.getAllReviews(BigInt(id));
      console.log(data);
      setAverage(Number(await contract.getRatingOfItem(id))/100.000);

      let array = [];
      console.log(data);
      data.map((item) => {
       
        let topic = item.topic;
        let review = item.review;
        let rating = item.rating.toString();
        array.push({
          primary: topic,
          secondary: review,
          rating:rating,
        });
        return true;
      });

      setInfo(array);
    })();

    return () => {};
  }, []);




  
  return (
    <Paper square sx={{ p: 2, pb: "50px", boxShadow: 0 }}>
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        sx={{ pb: 0, mb: 2, fontFamily: "Arial", fontWeight: 500 }}
      >
        Customer Reviews and Ratings
      </Typography>
      <Divider sx={{ mb: 4 }}></Divider>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item sm={6} xs={12}>
          <Typography
            variant="h5"
            gutterBottom
            align="center"
            component="div"
            sx={{
              fontWeight: 500,
              fontFamily: "Roboto",
              color: "#46474a",
            }}
          >
            Average Rating: {average} / 5
          </Typography>
        </Grid>

        <Grid item sm={6} xs={12}>
          <Typography gutterBottom align="center" component="div">
            <Rating
              align="center"
              name="read-only"
              value={average}
              precision={0.05}
              readOnly
            />
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ mb: 4 }}></Divider>

      <Grid container spacing={2} alignItems="center">
        {info.map(({ id, primary, secondary, rating }) => (
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

              <Typography variant="body2" sx={{ height: 75 }}>
                {secondary}
              </Typography>
            </CardContent>
            <CardActions>
              <Rating
                name="read-only"
                value={rating}
                sx={{ mb: 2, ml: 1 }}
                precision={0.05}
                readOnly
              />
            </CardActions>
          </Card>
        ))}
      </Grid>
    </Paper>
  );
}