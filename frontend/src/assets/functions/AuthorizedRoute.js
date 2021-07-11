import {Redirect, Route} from "react-router-dom";

export default function AuthorizedRoute({component: Component, isAuth, ...rest}) {
  return (
    <Route {...rest} render={(props) =>
      isAuth ? <Component {...props} {...rest} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>}
    />
  )
}

