import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import "./App.css";
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';

function App() {
  const [word, setWord] = useState("");
  const [data, setData] = useState(null);
  const [audio, setAudio] = useState("");

  const searchWord = async () => {
    try {
      const res = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`
      );

      setData(res.data[0]);

      // pronunciation audio
      const phoneticAudio = res.data[0].phonetics.find((p) => p.audio);
      setAudio(phoneticAudio?.audio || "");
    } catch (error) {
      alert("Word not found");
      setData(null);
    }
  };
  return (
    <div className="center-container">
      <h1 className="title">Online Dictionary</h1>

      <TextField
        label="Search word"
        variant="outlined"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && searchWord()}
      />

      <Button variant="contained" sx={{ mt: 2 }} onClick={searchWord}>
        Search
      </Button>

      {data && (
        <Card sx={{ mt: 4, width: 500 }}>
          <CardContent>
            <Typography variant="h4">{data.word}</Typography>

            {audio && (
              <Button
                variant="outlined"
                sx={{ mt: 1 }}
                onClick={() => new Audio(audio).play()}
              >
                <VolumeUpOutlinedIcon/> Play
              </Button>
            )}

            {data.meanings.map((meaning, index) => (
              <div key={index} style={{ marginTop: "15px" }}>
                <Typography variant="h6" color="green" >
                  Part of Speech: {meaning.partOfSpeech}
                </Typography>

                {meaning.definitions.map((def, i) => (
                  <div key={i}>
                    <Typography>
                      <b>Definition:</b> {def.definition}
                    </Typography>

                    {def.example && (
                      <Typography color="text.secondary">
                        <b>Example:</b> {def.example}
                      </Typography>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default App;
