import React from 'react';
import { useState } from 'react';
import ArtworkCard from './ArtworkCard';
import ReactPaginate from "react-paginate";

const ArtworkGrid = ({ artworks }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 6;

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    const offset = currentPage * pageSize;
    const currentPageData = artworks
        .slice(offset, offset + pageSize)
        .map((artwork, index) => (
            <div className="col-sm-4 mb-1 art-card" key={index}>
                <ArtworkCard
                    id={artwork.id}
                    imageUrl={artwork.imageUrl}
                    title={artwork.title}
                    artist={artwork.artist}
                    year={artwork.year}
                    buttonUrl={artwork.buttonUrl}
                />
            </div>
        ));

    const pageCount = Math.ceil(artworks.length / pageSize);

    return (
        <div className="container">
            {artworks.length > 0 ? (
                <>
                    <div className="row">{currentPageData}</div>
                    <div className="pagination-container">
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            previousLinkClassName={"pagination__link"}
                            nextLinkClassName={"pagination__link"}
                            disabledClassName={"pagination__link--disabled"}
                            activeClassName={"pagination__link--active"}
                        />
                    </div>
                </>
            ) : (
                <p className="no-results-message">Sorry, no results found.</p>
            )}
        </div>
    );
};

export default ArtworkGrid;




