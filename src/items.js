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

export default function Items() {
  const info = [{id:"1", primary: "Natural Facewash", secondary: "Rs. 50" }];
  const count = info.length;
  return (
    <Paper square sx={{ p: 2, pb: "50px", boxShadow: 0 }}>
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        sx={{ pb: 0, mb: 2, fontFamily: "Arial", fontWeight: 500 }}
      >
        Added Items ({count})
      </Typography>

      <Divider sx={{ mb: 4 }}></Divider>

      <Grid container spacing={2} alignItems="center">
        {info.map(({ id, primary, secondary }) => (
          <Card
            key={id}
            sx={{
              margin: 2,
              border: 0,
              width: { sm: 250, xs: "90%" },
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
