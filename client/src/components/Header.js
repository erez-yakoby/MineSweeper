import { Button, Typography, Grid } from "@mui/material";
import "../App.css";

export default function Header({ onReset, flagCount, time }) {
  return (
    <Grid container alignItems="center">
      <Grid item xs={5} textAlign="center">
        <Typography variant="h5">Flag count: {flagCount}</Typography>
      </Grid>
      <Grid item xs={2} textAlign="center">
        <Button
          variant="contained"
          onClick={onReset}
          size="large"
          sx={{ borderRadius: 5, boxShadow: 10 }}
        >
          reset
        </Button>
      </Grid>
      <Grid item xs={5} textAlign="center">
        <Typography variant="h5">Time passed: {time}</Typography>
      </Grid>
    </Grid>
  );
}
