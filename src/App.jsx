import { Card, TextField } from "@mui/material";
import "./App.css";

function App() {
  return (
    <div className="center-container">
      <h1 className="title">Online Dictionary</h1>
      <TextField id="outlined-basic" label="Search word" variant="outlined" />
    </div>
  );
}

export default App;
