import React from 'react';

export function withLogger(WrappedComp) {
    
    class Logger extends React.Component {

        componentDidUpdate(prevProps) {
            console.log('old props', prevProps);
            console.log('cur props', this.props);
        }

        render() {
            return (
                <WrappedComp {...this.props} />
            );
        }

    }

    return Logger;
    
}