import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";

import "./App.css";

// COMPONENT IMPORTS //
import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

// firebase
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // setCurrentUser = dispatch(setCurrentUser)

    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          dispatch(
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data(),
            })
          );
        });
      } else {
        dispatch(setCurrentUser(userAuth));
      }
    });

    return unsubscribeFromAuth();
  }, []);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={ShopPage} />
        <Route exact path="/signin" component={SignInAndSignUpPage} />
      </Switch>
    </div>
  );
};

export default App;
