import React, { useState, useEffect } from "react";
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

export function UserRating({ id }) {
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/rating/get_one/3/" + id)
      .then((res) => {
        console.log(res.data[0].value);
        setValue(res.data[0].value);
      });
  });

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Controlled</Typography>
        <Rating
          //   name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            const rating = {
              user_id: 3,
              product_id: id,
              value: event.target.value,
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
