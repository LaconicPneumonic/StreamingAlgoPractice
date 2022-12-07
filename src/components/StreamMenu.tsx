import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { useEffect, useRef, useState } from "react";

import db, { Faucet, Algo } from "../lib/db";
import { useAlgoStore } from "../lib/store";

function SelectSmall({
  name,
  options,
  callback,
}: {
  name: string;
  options: Array<{
    uuid: string;
    name: string;
  }>;
  callback: (v: string) => void;
}) {
  const [formValue, setFormValue] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setFormValue(event.target.value);
    callback(event.target.value);
  };

  return (
    <>
      <InputLabel id="demo-simple-select-label">{name}</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={formValue}
        label="Algo"
        onChange={handleChange}
        sx={{
          width: "100%",
        }}
      >
        {options.map((o, i) => (
          <MenuItem key={i} value={o.uuid}>
            {o.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}

export function StreamMenu(): JSX.Element {
  const [activeStep, setActiveStep] = useState(0);
  const [faucets, setFaucets] = useState<Array<Faucet>>([]);
  const [algos, setAlgos] = useState<Array<Algo>>([]);
  const streamAlgoPair = useAlgoStore();

  const formResponse = useRef<{
    selectedFaucet: null | string;
    selectedAlgo: null | string;
  }>({
    selectedFaucet: null,
    selectedAlgo: null,
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    formResponse.current = {
      selectedFaucet: null,
      selectedAlgo: null,
    };
    setActiveStep(0);
  };

  const handleSave = () => {
    console.log(formResponse.current);
    streamAlgoPair.setAlgo(formResponse.current.selectedAlgo);
    streamAlgoPair.setFaucet(formResponse.current.selectedFaucet);
  };

  useEffect(() => {
    setFaucets(db.faucets);
    setAlgos(db.algos);
  }, []);

  return (
    <Box sx={{ maxWidth: 400, padding: "10%" }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>
            <Typography variant="h6" component="div">
              FAUCETS
            </Typography>
          </StepLabel>
          <StepContent>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Box>
                <SelectSmall
                  name={"faucet"}
                  options={faucets}
                  callback={(v) => (formResponse.current.selectedFaucet = v)}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Continue
                  </Button>
                  <Button
                    disabled={true}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </FormControl>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>
            <Typography variant="h6" component="div">
              ALGOS
            </Typography>
          </StepLabel>
          <StepContent>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Box>
                <SelectSmall
                  name={"algo"}
                  options={algos}
                  callback={(v) => (formResponse.current.selectedAlgo = v)}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Finished
                  </Button>
                  <Button
                    disabled={false}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </FormControl>
          </StepContent>
        </Step>
      </Stepper>
      {activeStep === 2 && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{ mt: 1, mr: 1 }}
          >
            Submit
          </Button>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
