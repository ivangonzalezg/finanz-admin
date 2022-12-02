import React, { useEffect, useMemo, useReducer, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ReactLoading from "react-loading";
import constants from "./constants";
import { initialState, StateContext, stateReducer } from "./contexts";
import API, { getErrorMessage } from "./api";

import Admin from "./layouts/Admin";
import Auth from "./layouts/Auth";

const { USER, JWT, BUSINESSES, BUSINESS, IS_LOGGED_IN } = constants.state;

// TODO: Create Root compoennt as react native version

function App() {
  const [state, dispatchState] = useReducer(stateReducer, initialState);
  const [isLoading, setIsLoading] = useState(true);

  const stateContext = useMemo(
    () => ({
      updateUser: user => dispatchState({ type: USER, user }),
      updateJwt: jwt => dispatchState({ type: JWT, jwt }),
      updateBusinesses: businesses => dispatchState({ type: BUSINESSES, businesses }),
      updateBusiness: business => dispatchState({ type: BUSINESS, business }),
      updateIsLoggedIn: isLoggedIn => dispatchState({ type: IS_LOGGED_IN, isLoggedIn }),
      ...state
    }),
    [state]
  );

  const initialize = async () => {
    try {
      // TODO: Enable analytics in debug mode if is in development
      let uuid = localStorage.getItem(constants.UUID);
      if (!uuid) {
        uuid = uuidv4();
        localStorage.setItem(constants.UUID, uuid);
      }
      // TODO: Set analytics client id
      const jwt = localStorage.getItem(JWT);
      if (jwt) {
        const { data: user } = await API(jwt).get("/users/me");
        const { data: businesses } = await API(jwt).get(`/businesses/business-by-user/${user.id}`);
        // TODO: Set analytics user id
        dispatchState({ type: JWT, jwt });
        dispatchState({ type: USER, user });
        dispatchState({ type: BUSINESSES, businesses });
        dispatchState({ type: BUSINESS, business: businesses[0] });
        dispatchState({ type: IS_LOGGED_IN, isLoggedIn: true });
      }
    } catch (error) {
      alert(getErrorMessage(error));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    initialize();
  }, []);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center	items-center">
        <ReactLoading type="spin" color="#0284C7" />
      </div>
    );
  }

  return (
    <StateContext.Provider value={stateContext}>
      <BrowserRouter>
        <Switch>
          {/* add routes with layouts */}
          {state.isLoggedIn ? <Route path="/" component={Admin} /> : <Route path="/" component={Auth} />}
          {/* add redirect for first page */}
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </StateContext.Provider>
  );
}

export default App;
