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
import { BigNumber } from "@ethersproject/bignumber";
import { MetaMaskSDK } from '@metamask/sdk';
export default function AllItems(props) {
  const contract = props["contract"];
  const [info, setInfo]=React.useState([]);
  const options = {
    injectProvider: true,
    communicationLayerPreference: 'webrtc',
  };
  // const MMSDK = new MetaMaskSDK(options);

  // const provider =  detectEthereumProvider();
  // console.log(provider);
  React.useEffect(()=>{
    (async () => {
      console.log(contract);
      const data = (await contract.getAllItems());
      let array=[]
      data.map((item)=>{
        console.log(item);
        
        let price = (item.price?item.price:10).toString();
        let description = item.description;
        let itemname = item.name;
        let id=BigNumber.from(item.serialNumber).toString();
       
        array.push({
          id: id,
          primary: itemname,
          description: description,
          secondary: price,
        });
        return true;
      });
      
      setInfo(array);
    })();

    return () => {};

  },[]);



  return (
    <Paper square sx={{ p: 2, pb: "50px", boxShadow: 0 }}>
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        sx={{ pb: 0, mb: 2, fontFamily: "Arial", fontWeight: 500 }}
      >
        Items ({info.length})
      </Typography>

      <Divider sx={{ mb: 4 }}></Divider>

      <Grid container spacing={2} alignItems="center">
        {info.map(({ id, primary, secondary, description }) => (
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
                  <Typography variant="h6">Rs. {secondary}</Typography>
                </Grid>

                <Grid item sm={6} xs={12}>
                  <NavLink class="navlink" to={`/product/${id}`} exact>
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
