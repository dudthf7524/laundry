import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, Circle } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { COMPANYADDRESS_LIST_REQUEST } from "../reducers/companyAddress";

const containerStyle = {
    width: "100%",
    height: "400px", // 화면 크기에 따라 높이를 조정합니다.
};
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const MyLocation = ({ setIsWithinRadius, closeModal }) => {
    const [location, setLocation] = useState({ lat: 37.5665, lng: 126.9780 }); // 기본 위치
    const [radius, setRadius] = useState(500); // 기본 반경 (500m)
    const [address, setAddress] = useState(""); // 검색된 주소 저장

    console.log(location)
    const dispatch = useDispatch();

    // 데이터베이스에서 근무지 목록을 불러옴
    useEffect(() => {
        dispatch({
            type: COMPANYADDRESS_LIST_REQUEST,
        });
    }, [dispatch]);

    const { companyAddressLists } = useSelector((state) => state.companyAddress);
    const companyAddress = companyAddressLists? companyAddressLists : []; // 첫 번째 근무지 사용

    // Haversine 공식을 사용해 두 지점 간의 거리를 계산하는 함수
    const getDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371000; // 지구의 반지름 (미터 단위)
        const φ1 = (lat1 * Math.PI) / 180;
        const φ2 = (lat2 * Math.PI) / 180;
        const Δφ = ((lat2 - lat1) * Math.PI) / 180;
        const Δλ = ((lon2 - lon1) * Math.PI) / 180;

        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // 미터 단위
        return distance;
    };

    // 확인 버튼 클릭 시 근무지 반경 안에 포함되는지 확인하는 함수
    const checkRadius = () => {
        const companyLat = parseFloat(companyAddress?.location_latitude);
        const companyLng = parseFloat(companyAddress?.location_hardness);
        const companyRadius = parseInt(companyAddress?.radius);

        const distance = getDistance(location.lat, location.lng, companyLat, companyLng);
        if (distance <= companyRadius) {
            setIsWithinRadius(true);
            alert("근무지 GPS설정이 완료되었습니다.");
            closeModal()
        } else {
            setIsWithinRadius(false);
            alert("근무지 반경 외부입니다. 출근/퇴근을 할 수 없습니다.");
        }
    };

    // 현재 위치 가져오는 useEffect
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
                        <Marker position={location} />
                        {/* 근무지 위치와 반경을 표시 */}
                        <Marker position={{ lat: parseFloat(companyAddress.location_latitude), lng: parseFloat(companyAddress.location_hardness) }} />
                        <Circle
                            center={{ lat: parseFloat(companyAddress.location_latitude), lng: parseFloat(companyAddress.location_hardness) }}
                            radius={parseInt(companyAddress.radius)}
                            options={{
                                fillColor: "#6495ED55",
                                strokeColor: "#6495ED",
                                strokeWeight: 1,
                            }}
                        />
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
                        onClick={checkRadius} // 근무지 반경 확인
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
