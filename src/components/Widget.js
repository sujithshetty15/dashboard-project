import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, Typography, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeWidget } from '../store/widgetSlice'; // Ensure correct import path
import ChartWidget from './ChartWidget'; // Assuming a chart widget example

const Widget = ({ widget, categoryId }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeWidget({ categoryId, widgetId: widget.id }));
  };

  return (
    <Card style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', margin: '10px', position: 'relative' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>{widget.title}</Typography>
        {widget.content.includes('Graph') ? (
          <ChartWidget /> // Use chart widget if content is a graph
        ) : (
          <Typography variant="body2">{widget.content}</Typography>
        )}
        <Tooltip title="Remove Widget">
          <IconButton label="delete" onClick={handleDelete} style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardContent>
    </Card>
  );
};

export default Widget;