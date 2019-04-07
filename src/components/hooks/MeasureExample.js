import React, { useState, useCallback } from 'react'

export default function MeasureExample() {

    const [height, setHeight] = useState(0);

    const measuredRef = useCallback(
        (node) => {
            console.log(node);
            if (node != null) {
                setHeight(node.getBoundingClientRect().height);
            }
        },
        [],
    );

    return (
        <div className="row">
            <div className="col-12 border-bottom">
                <h1 ref={measuredRef}>Hello, world</h1>
                <p>The above header is <strong>{Math.round(height)}px</strong> tall</p>
            </div>
        </div>
    )
}
