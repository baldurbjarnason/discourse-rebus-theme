import { apiInitializer } from "discourse/lib/api";
import Topic from "discourse/models/topic";

export default apiInitializer((api) => {
	api.onPageChange((url, title) => {
		const parsed = new URL(url, window.location.href);
		if (parsed.pathname === "/") {
			// api.decorateCooked(($elem) =>
			// 	$elem.children(".discourse-root").addClass("rebus-front-page"),
			// );
			document.documentElement.classList.remove("rebus-sub-page");
			setupTopics(api);
		} else {
			document.documentElement.classList.add("rebus-sub-page");
		}
	});

	api.replaceIcon("d-liked", "far-heart");
	api.replaceIcon("notification.liked", "far-heart");
	api.replaceIcon("notification.liked_2", "far-heart");
	api.replaceIcon("notification.liked_many", "far-heart");
});

async function setupTopics(api) {
	const result = await fetch("/latest.json");
	const topics = await result.json();
	const featuredTopics = topics.topic_list.topics.map((topic) => {
		return Topic.create(topic);
	});
	console.log(featuredTopics);
	return featuredTopics;
}
