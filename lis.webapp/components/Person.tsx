import { PersonModel } from "@/api_client";
import { Grid2, Typography } from "@mui/material";

export type PersonProps = {
  person: PersonModel;
};

export const Person = ({ person }: PersonProps) => {
  return (
    <>
    <h2>Your Entry</h2>
    <Grid2 container spacing={2} direction="column" sx={{ marginTop: 2 }}>
      <Grid2 size={4}>
        <Typography fontWeight="bold">Name:</Typography>
        <Typography>{person.name}</Typography>
      </Grid2>
      <Grid2 size={4}>
        <Typography fontWeight="bold">Age:</Typography>
        <Typography>{person.age}</Typography>
      </Grid2>
      <Grid2 size={4}>
        <Typography fontWeight="bold">Title:</Typography>
        <Typography>{person.title}</Typography>
      </Grid2>
      <Grid2 size={4}>
        <Typography fontWeight="bold">Hometown:</Typography>
        <Typography>{person.hometown}</Typography>
      </Grid2>
    </Grid2>
    </>
  );
};
