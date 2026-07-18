import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const query = new URLSearchParams(useLocation().search).get("query");
  const [results, setResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // For modal

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        try {
          const response = await axios.get("https://api.unsplash.com/search/photos", {
            params: {
              query: query,
              client_id: "G9AefR9AXrxMlg4jdQEPVZa_T0b6Kgx9BpFwzi_U3Mk",
              per_page: 10,
            },
          });
          setResults(response.data.results);
        } catch (error) {
          console.error("Error fetching results:", error);
        }
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2 style={{ marginBottom: "20px" }}>
        Search Results: <b></b>
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "flex-start",
        }}
      >
        {results.map((item) => (
          <div
            key={item.id}
            style={{
              width: "220px",
              backgroundColor: "#fff",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              cursor: "pointer",
              textAlign: "center",
            }}
            onClick={() => setSelectedImage(item.urls.regular)}
          >
            <img
              src={item.urls.small}
              alt={item.alt_description}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                display: "block",
              }}
            />
            <p
              style={{
                margin: "10px",
                fontWeight: "bold",
                fontSize: "14px",
                color: "#333",
              }}
            >
              {item.alt_description || "Untitled"}
            </p>
          </div>
        ))}
      </div>

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setSelectedImage(null)} // close on click
        >
          <img
            src={selectedImage}
            alt="enlarged"
            style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "10px" }}
          />
        </div>
      )}
    </div>
  );
};

export default SearchResults;
