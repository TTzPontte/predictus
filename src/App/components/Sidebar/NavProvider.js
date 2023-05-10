import { useReducer, useState } from "react";

const initialState = {
  // navState: false,
  fixed: true,
  offCanvas: false,
  toogled: false
};
// if toogled must be fixed
const reducer = (state, action) => {
  // const setState = (params) => ({ ...{ ...state, ...params } });
  switch (action.type) {
    // case "fixed":
    //   return {  fixed: true, toogled: false,   offCanvas: false };
    case "offCanvas":
      return { fixed: false, toogled: false, offCanvas: true };
    case "fixed_toogled_open":
      return { fixed: true, toogled: true, offCanvas: false };
    case "fixed_toogled_close":
      return { fixed: true, toogled: false, offCanvas: false };
    default:
      throw new Error();
  }
};

const NavProvider = ({ initState = true, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setState = (action) => dispatch(action);
  console.log({ state });
  const [show, setShow] = useState(state);
  const toogleShowNav = () => {
    console.log(`click      ${show}    clak`);
    console.log("click clak");
    setShow(!show);
  };
  return children({ ...{ show, setShow, toogleShowNav, state, setState } });
};
export default NavProvider;

// const NavProvider = ({state=true, children }) => {
//
//   const [show, setShow] = useState(state);
//   const toogleShowNav = () => {
//     console.log('click' + `      ${show}    ` + 'clak')
//     console.log('click clak')
//     setShow(!show);
//   };
//   return children({ ...{ show, setShow, toogleShowNav } });
// };
// export default NavProvider;
