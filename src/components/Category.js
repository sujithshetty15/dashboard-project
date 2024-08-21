import React from 'react';
import { Grid } from '@mui/material';
import Widget from './Widget';

const Category = ({ category }) => {
  return (
    <Grid container spacing={3}>
      {category.widgets.map((widget) => (
        <Grid item xs={12} sm={6} md={4} key={widget.id}>
          <Widget widget={widget} categoryId={category.id} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Category;
