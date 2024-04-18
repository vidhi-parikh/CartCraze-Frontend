import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';



import { UserLoginReducer,
         UserRegisterReducer,
         UserDetailReducer,
         UserUpdateProfileReducer,
         userListReducer,
         userDeleteReducer
        } from './reducers/userReducers'


const reducer = combineReducers({
 
    userLogin: UserLoginReducer,
    userRegister: UserRegisterReducer,
    userDetail: UserDetailReducer,
    userUpdateProfile: UserUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,

})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')): [];

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')): null;

const shippingAddressFromStorage = localStorage.getItem('shipping') ? JSON.parse(localStorage.getItem('shipping')) :{};

const initialState= {
    cart: {cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage},
    userLogin: { userInfo : userInfoFromStorage}

}


const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store