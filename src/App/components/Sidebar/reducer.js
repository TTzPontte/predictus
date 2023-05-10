import React from "react";

const initialState = {
  // navState: false,
  fixed: true,
  offCanvas: false,
  toogled: false
};
// if toogled must be fixed
const reducer = (state = initialState, action) => {
  const setState = (params) => ({ ...{ ...state, ...params } });
  switch (action.type) {
    // case "fixed":
    //   return {  fixed: true, toogled: false,   offCanvas: false };
    case "offCanvas":
      return {  fixed: false, toogled: false,   offCanvas: true };
    case "fixed_toogled_open":
      return {  fixed: true, toogled: true,   offCanvas: false };
    case "fixed_toogled_close":
      return {  fixed: true, toogled: false,   offCanvas: false };
    default:
      throw new Error();
  }
};
