import { apiInitializer } from "discourse/lib/api";

export default apiInitializer((api) => {
	const container = Discourse.__container__;    
	const { h } = require('virtual-dom');
	const { iconNode } = require("discourse-common/lib/icon-library");
	let lockIcon = iconNode('lock');

	api.onPageChange((url, title) => {
          const parsed = new URL(url, window.location.href);
          if (parsed.pathname == "/") {
            api.decorateCooked($elem => $elem.children('.discourse-root').addClass('rebus-front-page'));
	        document.documentElement.classList.remove("rebus-sub-page");
	      } else {
	        document.documentElement.classList.add("rebus-sub-page");
	          
	      }
      });
    
	// api.createWidget('category-header-widget', {
	// 	tagName: 'span', 
	// 	html(attrs, state) {
            
	// 		const path = window.location.pathname;
	// 		let category;
            
	// 		const controller = container.lookup('controller:navigation/category');
	// 		category = controller.get("category");
            
	// 		const isException = category && 
	// 			settings.exceptions.split("|").includes(category.name);
            
	// 		if (/^\/c\//.test(path)) {
	// 			const hideMobile = !settings.show_mobile && this.site.mobileView;
	// 			const subCat = !settings.show_subcategory && category.parentCategory;
	// 			const noDesc = settings.hide_if_no_description && !category.description_text;
                
	// 			if (!isException && !noDesc && !subCat && !hideMobile) {
	// 				$("body").addClass("category-header");  
                    
	// 				function catDesc() {
	// 					if (settings.show_description) {
	// 						//return h('p', category.description_text);
	// 						return h('div.cooked', { innerHTML: category.description });
	// 					}
	// 				}
                    
	// 				function ifProtected() {
	// 					if (category.read_restricted) {
	// 						return lockIcon;                    
	// 					}
	// 				}
                    
	// 				return h('div.category-title-header.wrap' + " ." + category.slug, 
	// 					h('div.category-title-contents', [
	// 						ifProtected(),
	// 						h('h1', category.name),   
	// 						h('div.category-title-description', catDesc())
	// 					]),
	// 				);
	// 			}
	// 		} else {
	// 			$("body").removeClass("category-header");
	// 		}   
	// 	}      
	// });
    
	// api.decorateWidget('category-header-widget:after', helper => {
	// 	helper.widget.appEvents.on('page:changed', () => {
	// 		helper.widget.scheduleRerender();
	// 	});
	// });
	api.replaceIcon('d-liked', 'far-heart');
	api.replaceIcon('notification.liked', 'far-heart');
	api.replaceIcon('notification.liked_2', 'far-heart');
	api.replaceIcon('notification.liked_many', 'far-heart');


	// api.decorateWidget("header-buttons:before", helper => {
	// 	const menu = [];
	// 	const menuItems = settings.header_menu_list.split(",");
	// 	menuItems.forEach((item) => {
	// 		const menuItem = item.split("|");
	// 		menu.push(helper.h("li.hidden-for-mobile",
	// 			helper.h("a.nav-link", {
	// 				href: menuItem[1],
	// 				text: menuItem[0]
	// 			})
	// 		));
	// 	});
	// 	return helper.h("div.header-links",
	// 		helper.h("ul#nav-link-container", menu));
	// });
  
	// api.createWidget('footer-menu', {
	// 	tagName: "ul",
	// 	html(attrs) {
	// 		const menu = [];
	// 		const menuItems = settings.footer_menu_list.split(",");
	// 		menuItems.forEach((item) => {
	// 			const menuItem = item.split("|");
	// 			menu.push(h("li",
	// 				h("a", {
	// 					href: menuItem[1],
	// 					text: menuItem[0]
	// 				})
	// 			));
	// 		});
        
	// 		return menu;
	// 	}
	// });

	api.registerConnectorClass('below-site-header', 'rebus-header', {
		shouldRender(args, component) {
			return true;
		},
		setupComponent(args, component) {
			const router = api.container.lookup('router:main');
			router.on('willTransition', () => {
				component.set('displayRebusHeader', false);
			});
			api.onPageChange((url, title) => {
				if (url == "/") {
					component.set("displayRebusHeader", true);
				}
			});
		}
	});
	api.registerConnectorClass('above-footer', 'rebus-footer', {
		shouldRender(args, component) {
			return true;
		},
		setupComponent(args, component) {
			const router = api.container.lookup('router:main');
			router.on('willTransition', () => {
				component.set('showRebusFooter', false);
			});
			api.onPageChange((url, title) => {
				if (url == "/") {
					component.set("showRebusFooter", true);
				}
			});
		}
	});
});