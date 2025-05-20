import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function LocationSelector() {
    const [regions, setRegions] = useState(["Region1", "Region2", "Region3"]);
    const [districts, setDistricts] = useState([]);
    const [states, setStates] = useState([]);

    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedState, setSelectedState] = useState('');

    const [detectedLocation, setDetectedLocation] = useState({
        country: '',
        state: '',
        state_district: '',
        district: '',
        subdistrict: '',
        taluka: '',
        road: '',
        houseNumber: ''
    });

    // Mock demo data
    const districtData = {
        Region1: ["District1-1", "District1-2"],
        Region2: ["District2-1", "District2-2"],
        Region3: ["District3-1", "District3-2"]
    };

    const stateData = {
        "District1-1": ["State1-1a", "State1-1b"],
        "District1-2": ["State1-2a", "State1-2b"],
        "District2-1": ["State2-1a", "State2-1b"],
        "District2-2": ["State2-2a", "State2-2b"],
        "District3-1": ["State3-1a", "State3-1b"],
        "District3-2": ["State3-2a", "State3-2b"]
    };

    // Auto detect location and pre-fill
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
                        .then(res => res.json())
                        .then(data => {
                            const address = data.address;
                            const detected = {
                                country: address.country || '',
                                state: address.state || '',
                                state_district: address.state_district || '',
                                district: address.county || '',
                                subdistrict: address.city || address.town || address.village || '',
                                taluka: address.suburb || address.hamlet || '', // Closest match for Taluka
                                road: address.road || '', // Road information
                                houseNumber: address.house_number || '' // House number information
                            };
                            setDetectedLocation(detected);

                            // Demo logic: auto-select based on detected state
                            if (detected.state.includes('Tamil')) {
                                setSelectedRegion('Region1');
                                setDistricts(districtData['Region1']);
                                setSelectedDistrict('District1-1');
                                setStates(stateData['District1-1']);
                                setSelectedState('State1-1a');
                            }
                        })
                        .catch(err => console.error('Reverse geocode error:', err));
                },
                (error) => {
                    console.error('Geolocation error:', error);
                }
            );
        }
    }, []);

    // Handlers
    const handleRegionChange = (e) => {
        const region = e.target.value;
        setSelectedRegion(region);
        setDistricts(districtData[region] || []);
        setSelectedDistrict('');
        setStates([]);
        setSelectedState('');
    };

    const handleDistrictChange = (e) => {
        const district = e.target.value;
        setSelectedDistrict(district);
        setStates(stateData[district] || []);
        setSelectedState('');
    };

    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Selected: ${selectedRegion} / ${selectedDistrict} / ${selectedState}`);
    };

    return (
        <div className="container mt-4">
            <h3>Location Selector Form (Auto Location Select)</h3>

            <div className="alert alert-info">
                <strong>Detected Location:</strong><br />
                Country: {detectedLocation.country} <br />
                State: {detectedLocation.state} <br />
                State District: {detectedLocation.state_district} <br />
                District: {detectedLocation.district} <br />
                Subdistrict (City/Town/Village): {detectedLocation.subdistrict} <br />
                Taluka (Suburb/Hamlet): {detectedLocation.taluka} <br />
                Road: {detectedLocation.road} <br />
                House Number: {detectedLocation.houseNumber}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Region</label>
                    <select className="form-select" value={selectedRegion} onChange={handleRegionChange}>
                        <option value="">Select Region</option>
                        {regions.map(region => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">District</label>
                    <select className="form-select" value={selectedDistrict} onChange={handleDistrictChange} disabled={!districts.length}>
                        <option value="">Select District</option>
                        {districts.map(dist => (
                            <option key={dist} value={dist}>{dist}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">State</label>
                    <select className="form-select" value={selectedState} onChange={handleStateChange} disabled={!states.length}>
                        <option value="">Select State</option>
                        {states.map(state => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </div>

                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default LocationSelector;
