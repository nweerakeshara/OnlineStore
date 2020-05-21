import React from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import axios from "axios";

export default function SimpleRating() {
  const [value, setValue] = React.useState(2);

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Read only</Typography>
        <Rating name="read-only" value={value} readOnly />
      </Box>
    </div>
  );
}

export function UserRating({ productId }) {
  const [value, setValue] = React.useState(5);

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Controlled</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            const rating = {
              user_id: 3,
              product_id: productId,
              value: newValue,
            };
            axios
              .post("http://localhost:5000/api/rating/add", rating)
              .then((res) => {
                if (res.data.success) {
                  console.log(res.data);
                  alert("Rating Successful");
                }
              });
          }}
        />
      </Box>
    </div>
  );
}
