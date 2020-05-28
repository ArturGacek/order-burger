import axios from "../../axios-orders";
import { put } from 'redux-saga/effects';
import * as actions from "../actions/index"

export function* initIngredientsSaga(action) {
    try {
        const response  = yield axios.get('https://my-order-burger.firebaseio.com/ingredients.json');
        yield put(actions.setIngredients(response));
    } catch (error) {
        yield put(actions.fetchIngredientsFailed());
    }
    // axios.get('https://my-order-burger.firebaseio.com/ingredients.json')
    //     .then(response => {
    //         dispatch(setIngredients(response.data));
    //     })
    //     .catch(error => {
    //         dispatch(fetchIngredientsFailed())
    //     });
}