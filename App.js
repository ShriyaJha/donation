
import React, {Fragment} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link,Redirect } from "react-router-dom";
import { isAuthenticated, signout } from "./Component/helper/userHelper";


import Login from "./Component/login";
import SignUp from "./Component/signup";
import Donation from "./Component/donation.component";
import Welcome from "./Component/welcome.component";
import Payment from './Component/Payment';
import ThankYou from "./Component/thankyou.component";


const App = ({history}) => {
  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>C-19"NGO"</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to={"/"}>WELCOME|</Link>
              </li>
             {!isAuthenticated() && (
               <Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>SignIn|</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>Register|</Link>
                  </li>
               </Fragment>
             )}
              {isAuthenticated() && (
                <Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/donation"}>Donation|</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/payment"}>Payment|</Link>
                  </li>
                </Fragment>
              )}

              <li className="nav-item">
                <Link className="nav-link" to={"/thankyou"}>ThankYou</Link>
              </li>
              {isAuthenticated() && (
                    <li className="nav-item">
                        <Link className="nav-link text-warning" >
                            <span 
                                onClick={()=>{
                                    signout(()=>{
                                        <Redirect to ="/"/>
                                    })
                            }}>
                                SignOut
                            </span>
                        </Link>
                    </li>
                )}
            </ul>
          </div>
        </div>
      </nav>
      <div className="outer">
        <div className="inner">
          <Switch>
            <Route exact path='/' component={Welcome} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/donation" component={Donation} />
            <Route path="/payment" component={Payment} />
            <Route path="/thankyou" component={ThankYou} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}
export default App;