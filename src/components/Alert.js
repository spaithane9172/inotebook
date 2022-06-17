import React from 'react'

const Alert = (props) => {
    let {message}=props;
    return (
        <div className="alert alert-primary" role="alert">
            {message}
        </div>
    )
}
export default Alert;