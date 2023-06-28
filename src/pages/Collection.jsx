import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { supabase } from "../superbase/Client";
import ArtworkGrid from "../components/ArtworkGrid";

import imagePlaceholder from '../images/images.jpeg'

const Collections = () => {
    const { user } = useAuth();
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        const fetchCollection = async () => {
            try {
                const { data, error } = await supabase
                    .from("collection")
                    .select("artworkIDs")
                    .eq("userid", `${user.id}`)
                    .single();

                if (error) {
                    console.error("Error fetching collection data:", error.message);
                    return;
                }

                const artworkIDs = data ? data.artworkIDs : [];

                // Fetch each artwork detail by id
                const fetchedArtworks = await Promise.all(
                    artworkIDs.map(async (artworkId) => {
                        const apiKey = "5be33a36-0fe6-4f0e-b311-800cc1d47e34";
                        const url = `https://api.harvardartmuseums.org/object/${artworkId}?apikey=${apiKey}&fields=primaryimageurl,title,people,dated,id`;
                        const response = await fetch(url);
                        const artworkData = await response.json();
                        const imageUrl = artworkData.images && artworkData.images.length > 0 ? artworkData.images[0].baseimageurl : imagePlaceholder;

                        return {
                            id: artworkData.id,
                            title: artworkData.title,
                            people: artworkData.people,
                            dated: artworkData.dated,
                            imageUrl: imageUrl,  // adjust based on actual data structure if necessary
                        };
                    })
                );

                console.log(fetchedArtworks)

                setArtworks(fetchedArtworks);
            } catch (error) {
                console.error("Error fetching artworks:", error);
            }
        };

        if (user) {
            fetchCollection();
        }
    }, [user]);

    return (
        <div>
            <h1 className="page-title card-title m-3 text-center">Your Collection</h1>
            <ArtworkGrid artworks={artworks} />
        </div>
    );
};

export default Collections;
