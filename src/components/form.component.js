import React from "react";
import "./form.style.css";

const Form = props => {
  return (
    <div className="container">
      <form onSubmit={props.loadweather}>
        <div>{props.error ? error() : null}</div>
        <div className="row">
          <div className="col-md-3 offset-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="City"
              name="city"
              autoComplete="off"
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Country"
              name="country"
              autoComplete="off"
            />
          </div>
          <div className="col-md-3 mt-md-0 mt-2 text-md-left ">
            <button className="btn btn-secondary">Get Weather</button>
          </div>
        </div>
      </form>
    </div>
  );
};

function error(){
  return (
    <div className="alert alert-danger mx-5" role="alert">
      Please Enter City and Country...!
    </div>
  );
};

export default Form;