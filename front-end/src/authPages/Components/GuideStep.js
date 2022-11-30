import * as React from 'react';
import { Card, Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

const steps = [
  {
    label: 'Chat with your friend',
    description: `Take-notes.chat is a messenging app grants you productivity and collaboration, whcih differentiate it from any other messenging apps in the market`,
  },
  {
    label: 'Record an inpiring moment',
    description:
      'An inspring moment frequently happens when you chat with your freinds, colleagues or love ones, to just let it go is a waste! Record these moments and transform them into true productivity!',
  },
  {
    label: 'Export to collaboration platfom',
    description: `Export your ideas to the third party platform with your partners, share your insights and impress your team`,
  },
];

export default function GuideStep() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Card sx={{ opacity: 0.8 }}>
      <Box
        sx={{
          maxWidth: 600,
          alignItems: 'center',
          align: 'center',
          padding: '20px',
        }}
      >
        <Box display="flex" alignItems={'center'} marginRight="10px">
          <Typography component="h1" variant="h5">
            How to use?
          </Typography>
        </Box>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>Start your trail today!</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Box>
    </Card>
  );
}
