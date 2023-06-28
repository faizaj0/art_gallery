import React from "react";
import { Link } from 'react-router-dom';

const Artwork_Card = ({ id, imageUrl, title, artist, year }) => {
    return (
        <div className="card" style={{ width: "18rem", height: "18rem", position: "relative" }}>
            <div className="card-cover" style={{ backgroundImage: `url(${imageUrl})` }}></div>
            <div className="card-content">
                <div className="card-body align-items-center">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{artist}</p>
                    <p className="card-text">{year}</p>
                    <Link to={`/artwork/${id}`} className="btn btn-primary">Learn more</Link>
                </div>
            </div>
        </div>


    );
};

export default Artwork_Card;