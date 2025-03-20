import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, Circle, Autocomplete } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px", // 화면 크기에 따라 높이를 조정합니다.
};

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const WorkAddress = () => {
  const [location, setLocation] = useState({ lat: 35.9733646723136, lng: 128.939298096262 }); // 기본 위치
  const [radius, setRadius] = useState(500); // 기본 반경 (500m)
  const [autocomplete, setAutocomplete] = useState(null);
  const [address, setAddress] = useState(""); // 검색된 주소 저장

//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//         },
//         (error) => {
//           console.error("위치 정보를 가져오지 못했습니다:", error);
//         }
//       );
//     }
//   }, []);

  const handlePlaceSelect = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
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
    <div>근무지 설정 </div>
    // <div className="work_address p-4 md:p-8">
    //   <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
    //     <h2 className="text-2xl font-bold text-gray-900 mb-4">근무지 설정</h2>

    //     <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
    //       {/* 검색 입력창 */}
    //       <div className="relative mb-4">
    //         <Autocomplete onLoad={setAutocomplete} onPlaceChanged={handlePlaceSelect}>
    //           <input
    //             type="text"
    //             placeholder="근무지 검색"
    //             className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
    //           />
    //         </Autocomplete>
    //       </div>

    //       {/* 구글 지도 */}
    //       <div className="w-full mb-4">
    //         <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={15}>
    //           <Marker position={location} />
    //           <Circle
    //             center={location}
    //             radius={radius}
    //             options={{
    //               fillColor: "#6495ED55",
    //               strokeColor: "#6495ED",
    //               strokeWeight: 1,
    //             }}
    //           />
    //         </GoogleMap>
    //       </div>

    //       {/* 근무지 주소 및 반경 */}
    //       <div className="text-center">
    //         <p className="text-lg font-medium text-gray-700 mb-2">📍 현재 주소: {address || "주소 없음"}</p>
    //         <div className="mb-4">
    //           <input
    //             type="range"
    //             min="100"
    //             max="500"
    //             step="100"
    //             value={radius}
    //             onChange={(e) => setRadius(Number(e.target.value))}
    //             className="w-full"
    //           />
    //           <p className="mt-2 text-sm text-gray-600">근무 반경: {radius}m</p>
    //         </div>
    //         <button
    //           onClick={handleSave}
    //           className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    //         >
    //           설정
    //         </button>
    //       </div>
    //     </LoadScript>
    //   </div>
    // </div>
  );
};

export default WorkAddress;
