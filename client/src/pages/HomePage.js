import { HikeForm } from "../components/HikeList/HikeEditForm";

export function HomePage() {
	return <HikeForm hike={{ title: "Test", length: 2935, ascent: 300, expectedTime: 90, difficulty: "Hiker", description: "Lorem ipsum" }} />;
}
