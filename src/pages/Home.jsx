import React from "react";
import { useEffect, useState } from "react";
import "../App.css";
import { useAuth } from "../context/AuthProvider";

import SearchBar from '../components/Searchbar';
import ArtworkGrid from "../components/ArtworkGrid";
// Sample data

import imagePlaceholder from '../images/images.jpeg'


const Home = () => {
    const { user } = useAuth();
    const [artworkData, setArtworkData] = useState([]);
    console.log(user)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiKey = "5be33a36-0fe6-4f0e-b311-800cc1d47e34";
                const url = `https://api.harvardartmuseums.org/object?apikey=${apiKey}&size=24&sort=random&classification=Paintings&fields=primaryimageurl,title,people,dated,id`;
                const response = await fetch(url);
                const data = await response.json();

                console.log(data);
                // Extract the necessary fields and create artwork objects
                const artworks = data.records.map((record) => {
                    const artist = record.people && record.people.length > 0 ? record.people[0].name : 'Unknown Artist';
                    const imageUrl = record.primaryimageurl ? record.primaryimageurl : imagePlaceholder;
                    return {
                        id: record.id,
                        imageUrl: imageUrl,
                        title: record.title,
                        year: record.dated,
                        artist: artist,

                    };
                });
                setArtworkData(artworks)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = async (searchQuery) => {
        console.log(searchQuery);
        try {
            const apiKey = "5be33a36-0fe6-4f0e-b311-800cc1d47e34";
            let url = `https://api.harvardartmuseums.org/object?apikey=${apiKey}&size=24&sort=random&classification=Paintings&fields=primaryimageurl,title,people,dated,id`;

            if (searchQuery) {
                url += `&q=${encodeURIComponent(searchQuery)}`;
            }

            const response = await fetch(url);
            const data = await response.json();

            console.log(data);
            // Extract the necessary fields and create artwork objects
            const artworks = data.records.map((record) => {
                const artist = record.people && record.people.length > 0 ? record.people[0].name : 'Unknown Artist';
                const imageUrl = record.primaryimageurl ? record.primaryimageurl : imagePlaceholder;
                return {
                    id: record.id,
                    imageUrl: imageUrl,
                    title: record.title,
                    year: record.dated,
                    artist: artist,
                };
            });
            setArtworkData(artworks);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div>
            <div className="searchbar-container">
                <div className="searchbar">
                    <SearchBar handleSearch={handleSearch} />
                </div>
            </div>
            <div className="artworkGrid">
                <ArtworkGrid artworks={artworkData} />
            </div>
        </div>
    );
};

export default Home;
