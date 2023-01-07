import { useEffect } from "react";
import HikeRecordsAPI from "../../api/HikeRecordsAPI";

export function CompletedHikesList(props) {
	//let [recordList, setRecordList] = useState([]);
	useEffect(() => {
		HikeRecordsAPI.getHikeRecordsForUser(props.user.userID).then((list) => {
			console.log(list);
		});
	}, []);

	// 

}
