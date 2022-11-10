import { Marker, Popup } from "react-leaflet";
import AntPath from "./AntPath";

export function HikeMarker(props) {
   // props.point
   // let position = props.point.getLatLon();
   let position = props.position; // TEMP
   let type = "Point"; // props.point.pointType

   let popup;
   switch (type) {
      case "Point":
         popup = <PointPopup />;
         break;
      case "Hut":
         popup = <PointPopup />;
         break;
      case "ParkingLot":
         popup = <PointPopup />;
         break;
      default:
         // TODO: error handling
         break;
   }

   return <Marker position={position}>{popup}</Marker>;
}
export function HikePath(props) {
   // props.expectedtime, length, ascent
   // props.pointPositions
   return (
      <AntPath positions={props.pointPositions} options={{ color: "red" }}>
         <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
         </Popup>
      </AntPath>
   );
}
function PointPopup(props) {
   return (
      <Popup>
         A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
   );
}
function HutPopup(props) {
   return (
      <Popup>
         A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
   );
}
function ParkingLotPopup(props) {
   return (
      <Popup>
         A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
   );
}
function HikePopup(props) { }
