import "regenerator-runtime/runtime";
import React from "react";

import "./assets/css/global.css";
import NEARLogo from "./assets/img/logo-black.svg";
import UNCHLogo from "./assets/img/unchain_log.png";
import crossLogo from "./assets/img/cross.png";
import TopImage from "./assets/img/top_img.avif";

import AppRouter from "./AppRouter";

import { login, logout } from "./near-api";

export default function App() {
  // Get blockchian state once on component load
  React.useEffect(() => {}, []);

  // check if signed in
  if (!window.walletConnection.isSignedIn()) {
    return (
      // sign in screen
      <div className="grid h-3/4 place-items-center">
        <div className="flex items-center">
          <img src={NEARLogo} className="object-cover h-16 w-16" />
          <img src={crossLogo} className="object-cover h-6 w-6" />
          <img src={UNCHLogo} className="object-cover h-12 w-12 mx-2" />
          <span className="self-center text-3xl font-semibold whitespace-nowrap app_title">
            Election Dapp
          </span>
        </div>
        <div className="text-3xl">Have a liberate and fair election!</div>
        <img src={TopImage} className="mb-4 h-5/6 w-1/2" />
        <button
          className="text-white w-2/5 h-12 bg-gradient-to-r from-rose-500 via-rose-600 to-rose-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none font-medium rounded-lg text-3xl text-center "
          onClick={login}
        >
          Sign In
        </button>
      </div>
    );
  }

  // in case user signed in
  return (
    // home screen
    <div className="bg-white min-h-screen">
      {/* header */}
      <nav className="bg-white pt-2.5">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <div className="flex items-center">
            <img src={NEARLogo} className="object-cover h-12 w-12" />
            <img src={crossLogo} className="object-cover h-4 w-4" />
            <img src={UNCHLogo} className="object-cover h-9 w-9 mx-2" />
            <span className="self-center text-3xl font-semibold whitespace-nowrap app_title">
              Election Dapp
            </span>
          </div>
          <div className="md:block md:w-auto pt-1">
            <ul className="flex md:flex-row md:space-x-8 md:text-xl md:font-medium">
              {/* change url as being pushed button */}
              <li>
                <a href="/"> Home </a>
              </li>
              <li>
                <a href="/candidate"> Add Candidate </a>
              </li>
              <li>
                <a href="/voter"> Add Voter </a>
              </li>
              <button
                className="link text-red-500"
                style={{ float: "right" }}
                onClick={logout}
              >
                Sign out
              </button>
            </ul>
          </div>
        </div>
      </nav>
      {/* body(change depending on url) */}
      <div className="center">
        <AppRouter />
      </div>
    </div>
  );
}
