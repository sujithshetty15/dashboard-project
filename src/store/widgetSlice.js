import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('widgetState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Failed to load state from localStorage:", err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('widgetState', serializedState);
  } catch (err) {
    console.error("Failed to save state to localStorage:", err);
  }
};


const initialState = loadState() || {
  categories: [
    {
      id: 1,
      name: 'CSPM Executive Dashboard',
      widgets: [
        { id: 1, title: 'Cloud Account', content: '2 Total' },
        { id: 2, title: 'Cloud Account Risk Assessment', content: '9659 Total' },
      ],
    },
    {
      id: 2,
      name: 'CWPP Dashboard',
      widgets: [
        { id: 3, title: 'Top 5 Namespace Specific Alerts', content: 'No Graph data available!' },
        { id: 4, title: 'Workload Alerts', content: 'No Graph data available!' },
      ],
    },
  ],
};


const widgetSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    addCategory(state, action) {
      const { category } = action.payload;
      state.categories.push(category);
      saveState(state); // Save state to localStorage after adding a category
    },
    removeCategory(state, action) {
      const { categoryId } = action.payload;
      state.categories = state.categories.filter((cat) => cat.id !== categoryId);
      saveState(state); // Save state to localStorage after removing a category
    },
    addWidget(state, action) {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        category.widgets.push(widget);
        saveState(state); // Save state to localStorage after adding a widget
      }
    },
    removeWidget(state, action) {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter((widget) => widget.id !== widgetId);
        saveState(state); 
      }
    },
  },
});

export const { addCategory, removeCategory, addWidget, removeWidget } = widgetSlice.actions;
export default widgetSlice.reducer;
