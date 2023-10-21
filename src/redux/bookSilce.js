import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchBook = createAsyncThunk('book/request', async () => {
	const api_key = process.env.REACT_APP_BOOK_KEY;
	const url = `/ttb/api/ItemList.aspx?ttbkey=${api_key}&QueryType=ItemNewSpecial&SearchTarget=Book&Start=1&MaxResults=10&Cover=midBig&Output=JS&Version=20131101 `;

	const result = await axios.get(url);
	return result.data;
});

const bookSilce = createSlice({
	name: 'book',
	initialState: {
		data: [],
		isLoading: false,
	},
	extraReducers: {
		[fetchBook.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchBook.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchBook.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
	},
});

export default bookSilce.reducer;
