import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBookmark, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthProvider";
import { supabase } from "../superbase/Client";



const ArtworkDetail = () => {
    const { user } = useAuth();
    const { artworkId } = useParams();
    const [artwork, setArtwork] = useState(null);
    const [isAddedToCollection, setIsAddedToCollection] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArtwork = async () => {
            try {
                const apiKey = "5be33a36-0fe6-4f0e-b311-800cc1d47e34";
                const url = `https://api.harvardartmuseums.org/object/${artworkId}?apikey=${apiKey}&fields=primaryimageurl,title,people,dated,description,medium,dimensions,culture,exhibitionhistory`;
                const response = await fetch(url);
                const data = await response.json();
                setArtwork(data);
            } catch (error) {
                console.error("Error fetching artwork details:", error);
            }
        };

        const checkCollection = async () => {
            if (user) {
                try {
                    const { data, error } = await supabase
                        .from("collection")
                        .select("artworkIDs")
                        .eq("userid", user.id);

                    if (error) throw error;

                    const existingArtworkIDs = data?.[0]?.artworkIDs || [];
                    setIsAddedToCollection(existingArtworkIDs.includes(artworkId));
                } catch (error) {
                    console.error("Error checking if artwork is in collection:", error.message);
                }
            }
        };

        fetchArtwork();
        checkCollection();
    }, [artworkId, user]);

    if (!artwork) {
        return <div>Loading artwork details...</div>;
    }

    const { primaryimageurl, title, people, dated, description, medium, dimensions, culture, exhibitionhistory } = artwork;

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleAddToCollection = async () => {
        console.log(isAddedToCollection)
        if (!user) {
            console.log("User is not authenticated.");
            return;
        }

        try {
            let { data, error } = await supabase
                .from("collection")
                .select("artworkIDs")
                .eq("userid", `${user.id}`);

            if (error) {
                console.error("Error fetching collection data:", error.message);
                return;
            }

            if (data && data.length > 1) {
                console.error("Multiple collections found for user:", user.id);
                return;
            }

            const existingArtworkIDs = data && data.length ? data[0].artworkIDs : [];

            if (existingArtworkIDs && existingArtworkIDs.includes(artworkId)) {
                console.log("Artwork already added to collection.");
                return;
            }

            const updatedArtworkIDs = [...existingArtworkIDs, artworkId];

            if (data && data.length) {
                const { error: updateError } = await supabase
                    .from("collection")
                    .update({ artworkIDs: updatedArtworkIDs })
                    .eq("userid", `${user.id}`);

                if (updateError) {
                    console.error("Error updating collection:", updateError.message);
                    return;
                }
            } else {
                const { error: insertError } = await supabase
                    .from("collection")
                    .insert([{ userid: `${user.id}`, artworkIDs: [artworkId] }]);

                if (insertError) {
                    console.error("Error adding artwork to collection:", insertError.message);
                    return;
                }
            }

            // Verify the change
            ({ data, error } = await supabase
                .from("collection")
                .select("artworkIDs")
                .eq("userid", `${user.id}`));

            if (error) {
                console.error("Error fetching updated collection data:", error.message);
                return;
            }

            const verifiedArtworkIDs = data && data.length ? data[0].artworkIDs : [];

            if (verifiedArtworkIDs && verifiedArtworkIDs.includes(artworkId)) {
                setIsAddedToCollection(true);
                setAlertMessage("Artwork added to collection successfully!");
                console.log("Artwork added to collection successfully!");
            } else {
                console.error("Verification failed: artwork not found in collection.");
            }
        } catch (error) {
            console.error("Error adding artwork to collection:", error.message);
        }
    };

    const handleRemoveFromCollection = async () => {
        if (!user) {
            console.log("User is not authenticated.");
            return;
        }

        try {
            let { data, error } = await supabase
                .from("collection")
                .select("artworkIDs")
                .eq("userid", `${user.id}`);

            if (error) {
                console.error("Error fetching collection data:", error.message);
                return;
            }

            const existingArtworkIDs = data && data.length ? data[0].artworkIDs : [];

            if (!existingArtworkIDs || !existingArtworkIDs.includes(artworkId)) {
                console.log("Artwork is not in the collection.");
                return;
            }

            const updatedArtworkIDs = existingArtworkIDs.filter(id => id !== artworkId);

            const { error: updateError } = await supabase
                .from("collection")
                .update({ artworkIDs: updatedArtworkIDs })
                .eq("userid", `${user.id}`);

            if (updateError) {
                console.error("Error removing artwork from collection:", updateError.message);
                return;
            }

            setIsAddedToCollection(false);
            console.log("Artwork removed from collection successfully!");
            setAlertMessage("Artwork removed from collection successfully!");
        } catch (error) {
            console.error("Error removing artwork from collection:", error.message);
        }
    };







    return (
        <div>
            <div className="row p-4">
                <h2 className="page-title card-title mb-3 text-center">{title}</h2>
                <div className="col-sm-6">
                    <div className="card">
                        <img src={primaryimageurl} className="card-img-top" alt="Artwork" />
                    </div>
                </div>
                <div className="col-sm-6">
                    {description && (
                        <div className="card m-2">
                            <div className="card-body">
                                <h5 className="card-title">Description</h5>
                                <p className="card-text">{description}</p>
                            </div>
                        </div>
                    )}
                    {dated && (
                        <div className="card m-2">
                            <div className="card-body">
                                <h5 className="card-title">Year</h5>
                                <p className="card-text">{dated}</p>
                            </div>
                        </div>
                    )}
                    {medium && (
                        <div className="card m-2">
                            <div className="card-body">
                                <h5 className="card-title">Medium</h5>
                                <p className="card-text">{medium}</p>
                            </div>
                        </div>
                    )}
                    {dimensions && (
                        <div className="card m-2">
                            <div className="card-body">
                                <h5 className="card-title">Dimensions</h5>
                                <p className="card-text">{dimensions}</p>
                            </div>
                        </div>
                    )}
                    {culture && (
                        <div className="card m-2">
                            <div className="card-body">
                                <h5 className="card-title">Culture</h5>
                                <p className="card-text">{culture}</p>
                            </div>
                        </div>
                    )}
                    {exhibitionhistory && (
                        <div className="card m-2">
                            <div className="card-body">
                                <h5 className="card-title">Exhibition History</h5>
                                <p className="card-text">{exhibitionhistory}</p>
                            </div>
                        </div>
                    )}
                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <div className="d-flex align-items-center justify-content-center mb-2">
                                <button className="btn btn-primary w-100" onClick={handleGoBack}>
                                    <FontAwesomeIcon icon={faHome} className="me-2" />
                                    Back to Home
                                </button>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6">
                            <div className="d-flex align-items-center justify-content-center mb-2">
                                {isAddedToCollection ? (
                                    <button className="btn btn-outline-danger btn-sm w-100" onClick={handleRemoveFromCollection}>
                                        <FontAwesomeIcon icon={faTimes} className="me-2" />
                                        Remove from Collection
                                    </button>
                                ) : (
                                    <button className="btn btn-primary w-100" onClick={handleAddToCollection}>
                                        <FontAwesomeIcon icon={faBookmark} className="me-2" />
                                        Collect
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Alert message */}
                    {alertMessage && (
                        <div className="alert alert-success mb-3" role="alert">
                            {alertMessage}
                        </div>
                    )}


                </div>
            </div>
        </div>
    );
};

export default ArtworkDetail;
