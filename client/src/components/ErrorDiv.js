import React from 'react';

const ErrorDiv = ({ errors, rest }) => {

    if (!errors) return null;

    return (
        <div className="ui red inverted segment">
            {errors.map((error, i) => (
                <li key={i}>{error}</li>
            ))}
        </div>
    )

}

export default ErrorDiv;
