
import React from 'react';


function classNames(...classes)
{
    return classes.filter(Boolean).join(' ')
}

export default function Tabs()
{
    const tabs = [
        { name: 'HN items @ name => slack', href: '#', current: true },
        { name: 'HN items with mention => slack', href: '#', current: false },
    ]

    return (
        <div className="w-full">
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-fullfocus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    defaultValue={tabs.find((tab) => tab.current).name}
                >
                    {tabs.map((tab) => (
                        <option key={tab.name}>{tab.name}</option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block max-w-lg mx-auto">
                <nav className="flex space-x-4" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <a
                            key={tab.name}
                            href={tab.href}
                            className={classNames(
                                tab.current ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700',
                                'px-3 py-2 font-medium text-sm rounded-md'
                            )}
                            aria-current={tab.current ? 'page' : undefined}
                        >
                            {tab.name}
                        </a>
                    ))}
                </nav>
            </div>
        </div>
    )
}
