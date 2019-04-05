import React from 'react'

export default function Loading(props) {
    if (props.loading) {
        return (
                <span className="fa fa-spinner fa-pulse fa-1x fa-fw text-primary" />
        )
    } else {
        return null;
    }
}

