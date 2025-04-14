import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

const IncidentReporting = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/incidents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          child_id: data.childId,
          incident_date: data.date,
          incident_time: data.time,
          incident_type: data.type,
          description: data.description,
          location: data.location,
          severity: data.severity,
          action_taken: data.actionTaken,
          reported_by: data.reportedBy
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit incident report');
      }

      const result = await response.json();
      console.log('Incident report submitted successfully:', result);
      reset();
      // Show success message or redirect
    } catch (error) {
      console.error('Error submitting incident:', error);
      // Show error message to user
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Incident Reporting
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Please fill out the form below to report any incidents involving children.
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Child's Name"
                {...register('childName', { required: true })}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date of Incident"
                type="date"
                InputLabelProps={{ shrink: true }}
                {...register('incidentDate', { required: true })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Type of Incident"
                {...register('incidentType', { required: true })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                {...register('description', { required: true })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Action Taken"
                multiline
                rows={2}
                {...register('actionTaken', { required: true })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Reported By"
                {...register('reportedBy', { required: true })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                sx={{ mt: 2 }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default IncidentReporting;
