import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, Circle, Autocomplete } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { COMPANYADDRESS_DELETE_REQUEST, COMPANYADDRESS_LIST_REQUEST, COMPANYADDRESS_REGISTER_REQUEST } from "../reducers/companyAddress";

const containerStyle = {
  width: "100%",
  height: "400px", // 화면 크기에 따라 높이를 조정합니다.
};

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;



const CompanyAddress = () => {
  const [location, setLocation] = useState({ lat: 35.9733646723136, lng: 128.939298096262 }); // 기본 위치
  const [radius, setRadius] = useState(500); // 기본 반경 (500m)
  const [autocomplete, setAutocomplete] = useState(null);
  const [address, setAddress] = useState(""); // 검색된 주소 저장

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
  const dispatch = useDispatch();
  const handleSave = () => {
    if (!address) {
      alert('근무지를 검색해주세요')
      return;
    }
    const data = {
      address: address,
      location_latitude: location.lat,
      location_hardness: location.lng,
      radius: radius,
    }
    dispatch({
      type: COMPANYADDRESS_REGISTER_REQUEST,
      data: data
    });

  };
  useEffect(() => {
    dispatch({
      type: COMPANYADDRESS_LIST_REQUEST,
    });
  }, [dispatch]);

  const { companyAddressLists } = useSelector((state) => state.companyAddress);

  console.log(companyAddressLists)

  const handleDelete = (company_address_id) => {
    if (window.confirm(`설정된 근무지를 삭제하시겠습니까?`)) {

      const data = {
        company_address_id: company_address_id
      };
      dispatch({
        type: COMPANYADDRESS_DELETE_REQUEST,
        data: data,
      });
    }
  };


  return (
    <div className="work_address">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
          {/* 검색 입력창 */}
          <div className="relative mb-4">
            <Autocomplete onLoad={setAutocomplete} onPlaceChanged={handlePlaceSelect}>
              <input
                type="text"
                placeholder="근무지 검색"
                className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </Autocomplete>
          </div>

          {/* 구글 지도 */}
          {
            companyAddressLists ? (
              <div className="w-full mb-4">
                <GoogleMap mapContainerStyle={containerStyle} center={{
                  lat: companyAddressLists?.location_latitude,
                  lng: companyAddressLists?.location_hardness,
                }} zoom={15}>
                  <Marker position={{
                    lat: companyAddressLists?.location_latitude,
                    lng: companyAddressLists?.location_hardness,
                  }} />
                  <Circle
                    center={{
                      lat: companyAddressLists?.location_latitude,
                      lng: companyAddressLists?.location_hardness,
                    }}
                    radius={companyAddressLists?.radius}
                    options={{
                      fillColor: "#6495ED55",
                      strokeColor: "#6495ED",
                      strokeWeight: 1,
                    }}
                  />
                </GoogleMap>
              </div>
            ) : (
              <div className="w-full mb-4">
                <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={15}>
                  <Marker position={location} />
                  <Circle
                    center={location}
                    radius={radius}
                    options={{
                      fillColor: "#6495ED55",
                      strokeColor: "#6495ED",
                      strokeWeight: 1,
                    }}
                  />
                </GoogleMap>
              </div>
            )
          }

          {/* 근무지 주소 및 반경 */}
          <div className="text-center">
            <p className="text-lg font-medium text-gray-700 mb-2">📍 현재 주소: {address || "주소 없음"}</p>
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
              onClick={handleSave}
              className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              설정
            </button>
          </div>
        </LoadScript>
      </div >
      <div className="grid grid-cols-3 gap-4 p-3 font-semibold bg-gray-200 rounded-md text-gray-900">
        <p>주소</p>
        <p>반경</p>
        <p className="text-center">삭제</p>
      </div>
      <div className="grid grid-cols-3 gap-4 p-4 border rounded-lg shadow-sm bg-gray-50 items-center">
        <p className="text-gray-900">{companyAddressLists?.address || '미등록'}</p>
        <p className="text-gray-700">{companyAddressLists?.radius || 0}m</p>
        <button
          className="text-red-500 font-bold text-xl hover:text-red-700 transition duration-200 text-center"
          onClick={() => handleDelete(companyAddressLists?.company_address_id)}
        >
          {companyAddressLists ? '✖' : ''}
        </button>
      </div>


    </div >
  );
};

export default CompanyAddress;
