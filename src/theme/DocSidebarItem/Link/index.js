import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { isActiveSidebarItem } from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import styles from './styles.module.css';
export default function DocSidebarItemLink({
	item,
	onItemClick,
	activePath,
	level,
	index,
	...props
}) {
	const activeItemRef = useRef(null);
	const { href, label, className, autoAddBaseUrl } = item;
	const isActive = isActiveSidebarItem(item, activePath);
	const isInternalLink = isInternalUrl(href);

	useEffect(() => {
		if (isActive && activeItemRef.current) {
			activeItemRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest'
			});
		}
	}, [isActive]);

	return (
		<li
			className={clsx(
				ThemeClassNames.docs.docSidebarItemLink,
				ThemeClassNames.docs.docSidebarItemLinkLevel(level),
				'menu__list-item',
				className
			)}
			key={label}
		>
			<Link
				ref={isActive ? activeItemRef : null}
				className={clsx(
					'menu__link',
					!isInternalLink && styles.menuExternalLink,
					{
						'menu__link--active': isActive
					},
					'!text-sm !font-normal h-8'
				)}
				autoAddBaseUrl={autoAddBaseUrl}
				aria-current={isActive ? 'page' : undefined}
				to={href}
				{...(isInternalLink && {
					onClick: onItemClick ? () => onItemClick(item) : undefined
				})}
				{...props}
			>
				{label}
				{!isInternalLink && <IconExternalLink />}
			</Link>
		</li>
	);
}
