import { apiInitializer } from "discourse/lib/api";
import Topic from "discourse/models/topic";
import ConditionalLoadingSpinner from "discourse/components/conditional-loading-spinner";
import TopicList from "discourse/components/topic-list/list";
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default apiInitializer((api) => {
	api.onPageChange((url, title) => {
		const parsed = new URL(url, window.location.href);
		if (parsed.pathname === "/") {
			// api.decorateCooked(($elem) =>
			// 	$elem.children(".discourse-root").addClass("rebus-front-page"),
			// );
			document.documentElement.classList.remove("rebus-sub-page");
		} else {
			document.documentElement.classList.add("rebus-sub-page");
		}
	});

	api.replaceIcon("d-liked", "far-heart");
	api.replaceIcon("notification.liked", "far-heart");
	api.replaceIcon("notification.liked_2", "far-heart");
	api.replaceIcon("notification.liked_many", "far-heart");
	api.renderInOutlet("below-discovery-categories", class FilteredList extends Component{
        @tracked filteredTopics = [];

        constructor() {
          super(...arguments);
          this.findFilteredTopics();
        }

        @action
        async findFilteredTopics() {
          const topicList = await setupTopics(api);
          if (topicList) {
            (this.filteredTopics = topicList.slice(
              0,
              20
						));
            return this.filteredTopics
          }
        }

        <template>
            <div class="filtered-topics-list">
              <div class="filtered-topics-list__wrapper">
		            <div class="filtered-topics-list__header">
		              <h2>Updates From the Community</h2>
		            </div>
                <ConditionalLoadingSpinner @condition={{this.isLoading}}>
                  <TopicList
                    @topics={{this.filteredTopics}}
                    class="filtered-topics-list__content"
                  />
                </ConditionalLoadingSpinner>
              </div>
            </div>
        </template>
      })
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
