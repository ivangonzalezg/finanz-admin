import { createContext } from "react";
import constants from "../constants";

const { USER, JWT, BUSINESSES, BUSINESS, IS_LOGGED_IN } = constants.state;

const user = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  enableNotifications: false,
  createdAt: "",
  updatedAt: "",
  isGoogleCalendarSynced: false
};

const business = {
  id: 1,
  name: "",
  address: "",
  city: "",
  state: "",
  country: "",
  message: ""
};

const initialState = {
  user,
  jwt: "",
  businesses: [business],
  business,
  isLoggedIn: false
};

const StateContext = createContext({
  updateUser: (user = {}) => {},
  updateJwt: (jwt = "") => {},
  updateIsLoggedIn: (isLoggedIn = false) => {},
  updateBusinesses: (businesses = []) => {},
  updateBusiness: (business = {}) => {},
  ...initialState
});

const stateReducer = (prevState, action) => {
  switch (action.type) {
    case USER:
      return {
        ...prevState,
        user: action.user
      };
    case JWT:
      localStorage.setItem(JWT, action.jwt);
      return {
        ...prevState,
        jwt: action.jwt
      };
    case IS_LOGGED_IN:
      if (action.isLoggedIn) {
        return {
          ...prevState,
          isLoggedIn: true
        };
      } else {
        localStorage.removeItem(JWT);
        return {
          ...prevState,
          ...initialState
        };
      }
    case BUSINESSES:
      return {
        ...prevState,
        businesses: action.businesses
      };
    case BUSINESS:
      return {
        ...prevState,
        business: action.business
      };
    default:
      return prevState;
  }
};

export { initialState, StateContext, stateReducer };
