import React, { useReducer } from "react";


function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, success: false, error: false, loading: true };
    case "ERROR":
      return { ...state, success: false, error: true, loading: false };
    case "SUCCESS":
      return { ...state, success: true, error: false, loading: false };
    default:
      throw new Error();
  }
}

const Button = ({ initialState = { success: false, error: false, loading: false }, onClick}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [state, setState] = useState({ success: false, error: false });
  // const [loading, setLoading] = useState(false);

  const handleClick = async (onClick) => {
    await dispatch('LOADING')
    const response = await onClick()
    await dispatch('LOADING')
    const actions = {
      // setSuccess: () => setState({ success: true, error: false }),
      // setError: () => setState({ success: false, error: true }),
      // setLoading: () => setState({ success: false, error: true })
    };
  }
    return (
      <div>
        <button onClick={handleClick} type="button" className="form__button">
          {loading ? "Carregando..." : "Cadastrar contrato T.C."}
        </button>
      </div>
    );
  };
};

export default Button;
