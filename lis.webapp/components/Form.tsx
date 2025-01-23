"use client";
import { Button, Grid2, TextField } from "@mui/material";
import { useState } from "react";

export const Form = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [title, setTitle] = useState("");
  const [hometown, setHometown] = useState("");

  return (
    <Grid2 container spacing={2} direction="column" sx={{ marginTop: 2 }}>
      <Grid2 size={4}>
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </Grid2>
      <Grid2 size={4}>
        <TextField
          label="Age"
          type="number"
          fullWidth
          value={age}
          onChange={(e) => setAge(e.currentTarget.value)}
        />
      </Grid2>
      <Grid2 size={4}>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
      </Grid2>
      <Grid2 size={4}>
        <TextField
          label="Hometown"
          fullWidth
          value={hometown}
          onChange={(e) => setHometown(e.currentTarget.value)}
        />
      </Grid2>
      <Grid2 size={4}>
        <Button variant="contained">Submit</Button>
      </Grid2>
    </Grid2>
  );
};
