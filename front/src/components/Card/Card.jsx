import React from 'react';
import './Card.css';

export default function Card({ pretitle, title, description, action, position }) {
    return (
        <div className="col-12 col-md-4 mb-4">
            <div className="carte h-100">
                <a className="text-decoration-none">
                    <div className="carte-body">
                        <p className="carte-text text-muted small">
                            {pretitle}
                        </p>
                        <h5 className="carte-title font-weight-bold">
                            {title}
                        </h5>
                        <p className="carte-text">
                            {description}
                        </p>
                    </div>
                </a>
                <div className="carte-footer text-center">
                    <button className={`btn btn-primary ${position === 'center' ? 'mx-auto' : ''}`}>
                        {action}
                    </button>
                </div>
            </div>
        </div>
    );
}
