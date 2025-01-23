"use client";
import { Alert, Button, Grid2, Snackbar, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import ApiClient from "@/lib/ApiClient";
import { PersonModel } from "@/api_client";

export type FormProps = {
  onSubmit: () => void;
};

export const Form = ({ onSubmit }: FormProps) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [title, setTitle] = useState("");
  const [hometown, setHometown] = useState("");

  const [titleHasError, setTitleHasError] = useState(false);
  const [nameHasError, setNameHasError] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = async () => {
    const model = {
      name: name,
      age: parseInt(age),
      title: title,
      hometown: hometown,
    };

    if (!validateModel(model)) return;

    try {
      const result = await ApiClient.savePerson(model);

      if (result.status === 201) onSubmit();
      else setSnackbarOpen(true);
    } catch (err) {
      setSnackbarOpen(true);
    }
  };

  const validateModel = (model: PersonModel) => {
    const nameError = Boolean(model.name);
    const titleError = Boolean(model.title);

    setNameHasError(!nameError);
    setTitleHasError(!titleError);

    return nameError && titleError;
  };

  const handleNameChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.currentTarget.value) setNameHasError(false);

    setName(e.currentTarget.value);
  };

  const handleTitleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.currentTarget.value) setTitleHasError(false);

    setTitle(e.currentTarget.value);
  };

  return (
    <>
      <Grid2 container spacing={2} direction="column" sx={{ marginTop: 2 }}>
        <Grid2 size={4}>
          <TextField
            error={nameHasError}
            label="Name"
            fullWidth
            value={name}
            onChange={handleNameChange}
            helperText={nameHasError ? "Name is required" : ""}
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
            error={titleHasError}
            label="Title"
            fullWidth
            value={title}
            onChange={handleTitleChange}
            helperText={titleHasError ? "Title is required" : ""}
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
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid2>
      </Grid2>
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
          An error occured attempting to save the person
        </Alert>
      </Snackbar>
    </>
  );
};
