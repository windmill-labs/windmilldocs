import React from 'react';
import DocSidebarItemCategory from './Category';
import DocSidebarItemLink from './Link';
import DocSidebarItemHtml from './Html';

export default function DocSidebarItem({ item, ...props }) {
	switch (item.type) {
		case 'category':
			return <DocSidebarItemCategory item={item} {...props} />;
		case 'html':
			return <DocSidebarItemHtml item={item} {...props} />;
		case 'section':
			return <div className="uppercase">{item.title}</div>;
		case 'link':
		default:
			return <DocSidebarItemLink item={item} {...props} />;
	}
}
