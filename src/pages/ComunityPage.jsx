import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FilterDropdown from "../utils/FilterDropDown";
import CommunityCard from "../components/CommunityCard";
import { filterOptions } from "../data/dummyData";
import { getAllCommunities } from "../services/communityService";
import "../styles/comunity.css";

const CommunityPage = () => {
  const [selectedAgama, setSelectedAgama] = useState("All");
  const [selectedJenis, setSelectedJenis] = useState("All");
  const [selectedLokasi, setSelectedLokasi] = useState("All");
  const [isAgamaOpen, setIsAgamaOpen] = useState(false);
  const [isJenisOpen, setIsJenisOpen] = useState(false);
  const [isLokasiOpen, setIsLokasiOpen] = useState(false);

  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch communities from API
  useEffect(() => {
    setLoading(true);
    setError(null);

    // Build filters for API
    const filters = {};
    if (selectedAgama !== "All") filters.agama = selectedAgama;
    if (selectedJenis !== "All") filters.jenis_kegiatan = selectedJenis;
    if (selectedLokasi !== "All") filters.lokasi_kegiatan = selectedLokasi;

    getAllCommunities(filters)
      .then(setCommunities)
      .catch((err) => setError("Failed to load communities"))
      .finally(() => setLoading(false));
  }, [selectedAgama, selectedJenis, selectedLokasi]);

  const handleAgamaSelect = (option) => {
    setSelectedAgama(option);
    setIsAgamaOpen(false);
  };

  const handleJenisSelect = (option) => {
    setSelectedJenis(option);
    setIsJenisOpen(false);
  };

  const handleLokasiSelect = (option) => {
    setSelectedLokasi(option);
    setIsLokasiOpen(false);
  };

  const resetAllFilters = () => {
    setSelectedAgama("All");
    setSelectedJenis("All");
    setSelectedLokasi("All");
  };

  return (
    <div className="community-page">
      <Navbar />

      <main className="community-main">
        <div className="community-container">
          <h1 className="community-title">Direktori Komunitas</h1>

          <div className="filter-section">
            <button className="filter-btn all-categories" onClick={resetAllFilters}>All Categories</button>

            <FilterDropdown
              selectedValue={selectedAgama === "All" ? "Agama" : selectedAgama}
              options={filterOptions.agama}
              isOpen={isAgamaOpen}
              onToggle={() => setIsAgamaOpen(!isAgamaOpen)}
              onSelect={handleAgamaSelect}
              defaultLabel="Agama"
              showArrow={true}
            />

            <FilterDropdown
              selectedValue={selectedJenis === "All" ? "Jenis Kegiatan" : selectedJenis}
              options={filterOptions.jenisKegiatan}
              isOpen={isJenisOpen}
              onToggle={() => setIsJenisOpen(!isJenisOpen)}
              onSelect={handleJenisSelect}
              defaultLabel="Jenis Kegiatan"
              showArrow={true}
            />

            <FilterDropdown
              selectedValue={selectedLokasi === "All" ? "Lokasi Kegiatan" : selectedLokasi}
              options={filterOptions.lokasiKegiatan}
              isOpen={isLokasiOpen}
              onToggle={() => setIsLokasiOpen(!isLokasiOpen)}
              onSelect={handleLokasiSelect}
              defaultLabel="Lokasi Kegiatan"
              showArrow={true}
            />
          </div>

          <div className="community-grid">
            {loading ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: '#666', fontSize: '1.1rem' }}>
                Loading communities...
              </div>
            ) : error ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: 'red', fontSize: '1.1rem' }}>
                {error}
              </div>
            ) : communities.length > 0 ? (
              communities.map((community) => (
                <CommunityCard key={community.id} community={community} />
              ))
            ) : (
              <div style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '2rem',
                color: '#666',
                fontSize: '1.1rem'
              }}>
                Tidak ada komunitas yang sesuai dengan filter yang dipilih.
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CommunityPage;