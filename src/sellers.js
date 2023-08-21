import * as React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import "@fontsource/roboto/300.css";

export default function Sellers(props) {
  //  const contract = props["contract"];
   const [info, setInfo] = React.useState([
     { id: "0x5B1C157D807879a5098C78bfd890b736BBE3238a" },
     { id: "0x8A48d85d15d8BcdeF07c2F855CbEcDaDC774d5DE" },
   ]);

  //  React.useEffect(() => {
  //    (async () => {
  //      console.log(contract);
  //      const data = await contract.getAllSellers();
  //      let array = [];
  //      data.map((item) => {
  //        console.log(item);

  //        let walletId = item.walletId;
  //        let sellerName = item.sellerName;
        
  //        array.push({
  //          id: walletId,
  //          primary: sellerName,
           
  //        });
  //        return true;
  //      });

  //      setInfo(array);
  //    })();

  //    return () => {};
  //  }, []);

  return (
    <Paper square sx={{ p: 2, pb: "50px", boxShadow: 0 }}>
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        sx={{ pb: 0, mb: 2, fontFamily: "Arial", fontWeight: 500 }}
      >
        Verified Sellers ({info.length})
      </Typography>

      <Divider sx={{ mb: 4 }}></Divider>

      <Grid container spacing={2} alignItems="center">
        {info.map(({ id}) => (
          <Card
            key={id}
            sx={{
              margin: 2,
              border: 0,
              width: { sm: 300, xs: "90%" },
              borderRadius: 3,
              boxShadow: 2,
              wordWrap:"normal"
            }}
          >
            <CardContent>
              <Typography
                variant="body1"
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
                {id}
              </Typography>

              {/* <Typography variant="h6">{id}</Typography> */}
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Paper>
  );
}
