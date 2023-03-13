import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ currentUser, children }) {
	return (
		<Route 
      render={() => (currentUser ? 
        children : 
        <Redirect to=
        "/login" />)} />
    );
}

// const PrivateRoute = ({ component: Component, currentUser, ...rest }) => {
//   return(
//     <Route
//       {...rest}
//       render={(props) =>
//         currentUser ? (
//           <Component {...props} 
//           /> 
//           ) : (
//           <Redirect
//             to=
//             '/login'
//           />
//         )
//       }
//     />
//   );
// };

export default PrivateRoute;