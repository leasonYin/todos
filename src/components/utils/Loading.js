import React from 'react'

export default function Loading(props) {
    if (props.waiting) {
        return (
            <div className="col-12">
                <span className="fa fa-spinner fa-pulse fa-1x fa-fw text-primary" />
            </div>
        )
    } else {
        return null;
    }
}

