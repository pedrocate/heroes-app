import React from 'react';
import PropTypes  from 'prop-types';

import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {

    return (
        <Route { ...rest }
            component= { (props) => ( //es un callback al igual que en el setState tenemos acceso al state
                ( !isAuthenticated )
                    ? ( <Component {...props} /> ) //Si está autenticado se manda el componente tal cual con todo
                    : ( <Redirect to="/" /> )
            )}
        />
    )
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
