import {createAsyncThunk} from "@reduxjs/toolkit"
import {productsAPI, RootDocumentsType} from '../../api';
import {errorHandlerUtil} from '../../common/utils/errors-utils';

export const getDocuments = createAsyncThunk<RootDocumentsType[], void, { rejectValue: string } >(
    'dataTable/getDocuments', async (_, {rejectWithValue}) => {
        try {
            return (await Promise.all([
                productsAPI.getFirstDocuments(),
                productsAPI.getSecondDocuments(),
            ])).map(el => el.data)
        } catch (err) {
            return rejectWithValue(errorHandlerUtil(err));
        }
    })
