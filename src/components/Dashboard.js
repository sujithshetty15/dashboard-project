import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { addCategory, addWidget } from '../store/widgetSlice';
import Category from './Category';
import { v4 as uuidv4 } from 'uuid';

const Dashboard = () => {
  const categories = useSelector((state) => state.widgets.categories);
  const dispatch = useDispatch();

  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openWidgetDialog, setOpenWidgetDialog] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [widgetName, setWidgetName] = useState('');
  const [widgetContent, setWidgetContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddCategory = () => {
    const newCategory = {
      id: uuidv4(),
      name: newCategoryName,
      widgets: [],
    };
    dispatch(addCategory({ category: newCategory }));
    setNewCategoryName('');
    setOpenCategoryDialog(false);
  };

  const handleAddWidget = () => {
    if (selectedCategoryId && widgetName && widgetContent) {
      const newWidget = {
        id: uuidv4(),
        title: widgetName,
        content: widgetContent,
      };
      dispatch(addWidget({ categoryId: selectedCategoryId, widget: newWidget }));
      setWidgetName('');
      setWidgetContent('');
      setOpenWidgetDialog(false);
    }
  };

  return (
    <div style={{ padding: '20px'}}>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
    <h1 style={{ textAlign: 'center', marginRight: '20px' }}>Dashboard</h1>
    <TextField
      label="Search Widgets"
      variant="outlined"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{ width: '250px', height: '50px' }}
    />
  </div>

  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
    <Button
      variant="contained"
      color="primary"
      style={{ marginRight: '10px' }}
      onClick={() => setOpenCategoryDialog(true)}
    >
      + Add Category
    </Button>

    <Button
      variant="contained"
      color="secondary"
      onClick={() => setOpenWidgetDialog(true)}
    >
      + Add Widget
    </Button>
  </div>

  <Grid container spacing={3}>
    {categories.map((category) => {
      const filteredWidgets = category.widgets.filter(widget =>
        widget.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        widget.content.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (filteredWidgets.length === 0) return null;

      return (
        <Grid item xs={12} key={category.id}>
          <Typography variant="h6" style={{ marginBottom: '10px' }}>{category.name}</Typography>
          <Category category={{ ...category, widgets: filteredWidgets }} />
        </Grid>
      );
    })}
  </Grid>

  {/*Category */}
  <Dialog open={openCategoryDialog} onClose={() => setOpenCategoryDialog(false)}>
    <DialogTitle>Add New Category</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        label="Category Name"
        type="text"
        fullWidth
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setOpenCategoryDialog(false)} color="primary">
        Cancel
      </Button>
      <Button onClick={handleAddCategory} color="primary">
        Add
      </Button>
    </DialogActions>
  </Dialog>

  {/* Widget */}
  <Dialog open={openWidgetDialog} onClose={() => setOpenWidgetDialog(false)}>
    <DialogTitle>Add New Widget</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        label="Widget Name"
        type="text"
        fullWidth
        value={widgetName}
        onChange={(e) => setWidgetName(e.target.value)}
      />
      <TextField
        margin="dense"
        label="Widget Content"
        type="text"
        fullWidth
        value={widgetContent}
        onChange={(e) => setWidgetContent(e.target.value)}
      />
      <TextField
        select
        margin="dense"
        label="Select Category"
        fullWidth
        SelectProps={{
          native: true,
        }}
        onChange={(e) => setSelectedCategoryId(e.target.value)}
      >
        <option value="" disabled>
          Select Category
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </TextField>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setOpenWidgetDialog(false)} color="primary">
        Cancel
      </Button>
      <Button onClick={handleAddWidget} color="primary">
        Add
      </Button>
    </DialogActions>
  </Dialog>
</div>

  );
};

export default Dashboard;
