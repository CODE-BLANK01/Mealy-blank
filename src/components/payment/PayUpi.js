import React from "react";
import { render } from "react-dom";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

class PayUpi extends React.Component {
  state = {
    upiId: "",
  };
  handleInputChange = (e) => {
    const newUpiId = e.target.value; // Use e.target.value to get the input value
    this.setState({ upiId: newUpiId });
    this.props.setUpiId(newUpiId);
  };

  render() {
    const { upiId } = this.state;

    return (
      <div key="Payment">
        <div className="App-payment">
          <Grid container spacing={3}>
            <Grid item xs={6} style={{ marginTop: "50px" }}>
              <Typography
                variant="h5"
                gutterBottom
                style={{ textAlign: "center" }}
              >
                Enter Your UPI ID
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <form>
                <div className="form-group">
                  <TextField
                    variant="outlined"
                    type="text"
                    name="upiId"
                    className="form-control"
                    placeholder="Your UPI ID"
                    required
                    style={{ width: 300, margin: "5px" }}
                    value={upiId}
                    onChange={this.handleInputChange}
                  />
                </div>
              </form>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
export default PayUpi;
