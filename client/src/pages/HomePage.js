import { Loading } from "../components/Loading";
import HikeListTable from "../components/HikeList/HikeListTable";

export function HomePage(props) {
	const [loading, setLoading] = useState(true);
	const [hikes, setHikes] = useState([]);

	const getSuggestedHikes = async () => {
		let stats //= await get
		let hikes
		await HikeAPI.getAllHikes()
			.then(h => {
				hikes = h//.filter(hike => )
				setHikes(hikes);
				setFilteredHikes(hikes);
				setLoading(false);
			})
			.catch((error) => { console.log(error); })
	};

	useEffect(() => {
		getSuggestedHikes();
	}, [hikes.length]);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<HikeListTable
					hikes={filteredHikes}
					setHikes={setHikes}
					filters={filters}
					setFilters={setFilters}
					selectedHike={selectedHike}
					setSelectedHike={setSelectedHike}
					insertButton={<InsertHikeButton />}
					showHikeForm={handleShowHikeForm}
					user={props.user}
				/>
			)}
		</>
	);
}
