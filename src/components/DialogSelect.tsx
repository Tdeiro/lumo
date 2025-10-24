import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";

export default function DialogSelect(props: {
  onSubmitNewCategory: (arg0: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent<unknown>,
    reason?: string
  ) => {
    if (reason !== "backdropClick" && description) {
      setOpen(false);
    }
  };

  const addNewSubmittedCategory = () => {
    props.onSubmitNewCategory(description);
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Add new</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Add new category</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <TextField
                label="Description"
                id="desc-input"
                sx={{ m: 1, width: "35ch" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={addNewSubmittedCategory}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
