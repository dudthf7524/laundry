import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, Circle, Autocomplete } from "@react-google-maps/api";

const containerStyle = {
    width: "50vw",
    height: "50vh",

};

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


const WorkAddress = () => {
    const [location, setLocation] = useState({ lat: 35.9733646723136, lng: 128.939298096262 });
    const [radius, setRadius] = useState(500); // 기본 반경 (500m)
    const [autocomplete, setAutocomplete] = useState(null);
    const [address, setAddress] = useState(""); // 검색된 주소 저장
    console.log(autocomplete)
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("위치 정보를 가져오지 못했습니다:", error);
                }
            );
        }
    }, []);

    const handlePlaceSelect = () => {
        if (autocomplete) {

            console.log(autocomplete)
            const place = autocomplete.getPlace();
            console.log(place)
            if (place.geometry) {

                setLocation({
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                });
                setAddress(place.formatted_address || "주소 정보를 가져올 수 없습니다.");
            }
        }
    };

    const handleSave = () => {
        console.log("📍 근무지 설정 완료!");
        console.log("주소:", address);
        console.log("위도:", location.lat);
        console.log("경도:", location.lng);
        console.log("근무 반경:", radius, "m");
    };

    return (
        <div className="work_address">
            <div>

            
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
             
                <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", zIndex: 1000 }}>
                    <Autocomplete onLoad={setAutocomplete} onPlaceChanged={handlePlaceSelect}>
                        <input
                            type="text"
                            placeholder="근무지 검색"
                            style={{ width: "300px", height: "40px", fontSize: "16px", padding: "5px" }}
                        />
                    </Autocomplete>
                </div>

                <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={15}>
                    <Marker position={location} />
                    <Circle center={location} radius={radius} options={{ fillColor: "#6495ED55", strokeColor: "#6495ED", strokeWeight: 1 }} />
                </GoogleMap>

             
            <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", zIndex: 1000, textAlign: "center" }}>
                    <p>📍 현재 주소: {address || "주소 없음"}</p>
                    <input type="range" min="100" max="500" step="100" value={radius} onChange={(e) => setRadius(Number(e.target.value))} />
                    <p>근무 반경: {radius}m</p>
                    <button onClick={handleSave} style={{ padding: "10px 20px", fontSize: "16px", marginTop: "10px", cursor: "pointer" }}>설정</button>
                </div>
            </LoadScript>
            
            </div>
            <div>
                <p>📍 현재 주소: {address || "주소 없음"}</p>
                <input type="range" min="100" max="500" step="100" value={radius} onChange={(e) => setRadius(Number(e.target.value))} />
                <p>근무 반경: {radius}m</p>
                <button onClick={handleSave}>설정</button>
            </div>
        </div>
    );
};

export default WorkAddress;
