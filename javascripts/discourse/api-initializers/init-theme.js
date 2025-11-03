import { apiInitializer } from "discourse/lib/api";
import { iconNode } from "discourse-common/lib/icon-library";

export default apiInitializer((api) => {
	let lockIcon = iconNode("lock");
	api.onPageChange((url, title) => {
		const parsed = new URL(url, window.location.href);
		if (parsed.pathname === "/") {
			api.decorateCooked(($elem) =>
				$elem.children(".discourse-root").addClass("rebus-front-page"),
			);
			document.documentElement.classList.remove("rebus-sub-page");
		} else {
			document.documentElement.classList.add("rebus-sub-page");
		}
	});

	api.replaceIcon("d-liked", "far-heart");
	api.replaceIcon("notification.liked", "far-heart");
	api.replaceIcon("notification.liked_2", "far-heart");
	api.replaceIcon("notification.liked_many", "far-heart");

	// api.registerConnectorClass('below-site-header', 'rebus-header', {
	// 	shouldRender(args, component) {
	// 		return true;
	// 	},
	// 	setupComponent(args, component) {
	// 		const router = api.container.lookup('router:main');
	// 		router.on('willTransition', () => {
	// 			component.set('displayRebusHeader', false);
	// 		});
	// 		api.onPageChange((url, title) => {
	// 			if (url == "/") {
	// 				component.set("displayRebusHeader", true);
	// 			}
	// 		});
	// 	}
	// });
	// api.registerConnectorClass('above-footer', 'rebus-footer', {
	// 	shouldRender(args, component) {
	// 		return true;
	// 	},
	// 	setupComponent(args, component) {
	// 		const router = api.container.lookup('router:main');
	// 		router.on('willTransition', () => {
	// 			component.set('showRebusFooter', false);
	// 		});
	// 		api.onPageChange((url, title) => {
	// 			if (url == "/") {
	// 				component.set("showRebusFooter", true);
	// 			}
	// 		});
	// 	}
	// });
});
