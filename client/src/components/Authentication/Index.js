import React from "react";
import { withRouter } from "react-router-dom";
import jwt from "jsonwebtoken";

const withAuthorization = authCondition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      if (localStorage.getItem("token") != null) {
        // jwt.decode(localStorage.getItem("token"))
        jwt.verify(
          localStorage.getItem("token"),
          "ijk3dp4n",
          (err, decodedToken) => {
            if (err || !decodedToken) {
              localStorage.removeItem("token");
              //console.log(this.props.location);
              this.props.history.push(
                `/auth?from=${btoa(this.props.location.pathname)}`
              );
            } else {
              if (!authCondition(decodedToken)) {
                //console.log(this.props.location);

                this.props.history.push(
                  `/auth?from=${btoa(this.props.location.pathname)}`
                );
              }
            }
          }
        );
      } else {
        //console.log(this.props.location);

        this.props.history.push(
          `/auth?from=${btoa(this.props.location.pathname)}`
        );
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  return withRouter(WithAuthorization);
};

export default withAuthorization;
