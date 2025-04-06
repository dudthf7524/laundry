import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, Circle } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { COMPANYADDRESS_LIST_REQUEST } from "../reducers/companyAddress";

const containerStyle = {
    width: "100%",
    height: "400px",
};

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const MyLocation = ({ setIsWithinRadius, closeModal }) => {
    const [location, setLocation] = useState({ lat: 37.5665, lng: 126.9780 }); // 기본 위치
    const [radius, setRadius] = useState(500); // 반경 조절용 (슬라이더용)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: COMPANYADDRESS_LIST_REQUEST,
        });
    }, [dispatch]);

    const { companyAddressLists } = useSelector((state) => state.companyAddress);
    
    const companyAddress = companyAddressLists ? companyAddressLists : null;

   

    const getDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371000;
        const φ1 = (lat1 * Math.PI) / 180;
        const φ2 = (lat2 * Math.PI) / 180;
        const Δφ = ((lat2 - lat1) * Math.PI) / 180;
        const Δλ = ((lon2 - lon1) * Math.PI) / 180;

        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
    };

    const checkRadius = () => {
        if (!companyAddress) return;

        const companyLat = parseFloat(companyAddress.location_latitude);
        const companyLng = parseFloat(companyAddress.location_hardness);
        const companyRadius = parseInt(companyAddress.radius);

        const distance = getDistance(location.lat, location.lng, companyLat, companyLng);
        if (distance <= companyRadius) {
            setIsWithinRadius(true);
            alert("근무지 GPS설정이 완료되었습니다.");
            closeModal();
        } else {
            setIsWithinRadius(false);
            alert("근무지 반경 외부입니다. 출근/퇴근을 할 수 없습니다.");
        }
    };

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

    return (
        <div>
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
                <div className="w-full mb-4">
                    <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={15}>
                        {/* 내 위치 */}
                        <Marker position={location} icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png" />
                        <Circle
                            center={location}
                            radius={radius}
                            options={{
                                fillColor: "#6495ED55",       // 연파랑 (투명도 포함)
                                strokeColor: "#6495ED",       // 파랑 테두리
                                strokeWeight: 2
                            }}
                        />
                        {/* 근무지 위치와 반경 (데이터가 있을 때만 렌더링) */}
                        {companyAddress &&
                            (
                                <>
                                    <Marker
                                        position={{
                                            lat: parseFloat(companyAddress.location_latitude),
                                            lng: parseFloat(companyAddress.location_hardness),
                                        }}
                                    />
                                    <Circle
                                        center={{
                                            lat: parseFloat(companyAddress.location_latitude),
                                            lng: parseFloat(companyAddress.location_hardness),
                                        }}
                                        radius={parseInt(companyAddress.radius)}
                                        options={{
                                            fillColor: "#FF6347AA",      // 채우기 색 (예: Tomato 색)
                                            strokeColor: "#FF4500",      // 테두리 색 (예: OrangeRed)
                                            strokeWeight: 2              // 테두리 두께
                                        }}
                                    />
                                </>
                            )}
                    </GoogleMap>
                </div>

                <div className="text-center">
                    <div className="mb-4">
                        <input
                            type="range"
                            min="100"
                            max="500"
                            step="100"
                            value={radius}
                            onChange={(e) => setRadius(Number(e.target.value))}
                            className="w-full"
                        />
                        <p className="mt-2 text-sm text-gray-600">근무 반경: {radius}m</p>
                    </div>

                    <button
                        onClick={checkRadius}
                        className="w-full mt-4 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                    >
                        확인
                    </button>

                    <button
                        onClick={closeModal}
                        className="w-full mt-4 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                    >
                        닫기
                    </button>
                </div>
            </LoadScript>
        </div>
    );
};

export default MyLocation;
