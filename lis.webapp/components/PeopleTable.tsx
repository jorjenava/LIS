import { PersonModel } from "@/api_client";
import ApiClient from "@/lib/ApiClient";
import {
  Alert,
  Button,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";

export type PeopleTableProps = {
  onReturn: () => void;
};

export const PeopleTable = ({ onReturn }: PeopleTableProps) => {
  const [people, setPeople] = useState<PersonModel[]>([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await ApiClient.getPeople();

        if (result.status === 200) setPeople(result.data);
        else setSnackbarOpen(true);
      } catch (err) {
        setSnackbarOpen(true);
        console.error(err);
      }
    };

    fetch();
  });

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Hometown</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.age}</TableCell>
                <TableCell>{p.title}</TableCell>
                <TableCell>{p.hometown}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" sx={{ marginTop: 2 }} onClick={onReturn}>
        Return to form
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          An error occured attempting to fetch the list of people
        </Alert>
      </Snackbar>
    </>
  );
};
