import { put } from 'redux-saga/effects';

import axios from "../../axios-orders";
import * as actions from '../actions/index'

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try {
        const response = (yield axios.post('/orders.json?auth=' + action.token, action.orderData));
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData))
    } catch (error) {
        yield put(actions.purchaseBurgerFail(error))
    }
    // dispatch(purchaseBurgerStart());
    // axios.post('/orders.json?auth=' + token, orderData)
    //     .then(response => {
    //         // console.log(response.data);
    //         dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    //     })
    //     .catch(error => {
    //         dispatch(purchaseBurgerFail(error));
    //     });
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try {
        const response = yield axios.get('/orders.json' + queryParams);
        const fetchedOrders =  [];
        for (let key in response.data) {
            fetchedOrders.push(
                {...response.data[key],
                    id: key});
        }
        yield put(actions.fetchOrdersSuccess(fetchedOrders))
    } catch (error) {
        yield put(actions.fetchOrdersFail(error))
    }
//     dispatch(fetchOrdersStart());
//     const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
//     // axios.get('./orders.json?auth=' + token)
//     axios.get('/orders.json' + queryParams)
//         .then(res => {
//             // console.log(res.data);
//             const fetchedOrders =  [];
//             for (let key in res.data) {
//                 fetchedOrders.push(
//                     {...res.data[key],
//                         id: key});
//             }
//             dispatch(fetchOrdersSuccess(fetchedOrders))
//             // this.setState({loading: false, orders: fetchedOrders})
//         })
//         .catch(error => {
//             dispatch(fetchOrdersFail(error))
//             // this.setState({loading: false})
//         })
// }
}