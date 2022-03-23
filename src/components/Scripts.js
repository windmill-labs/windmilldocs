import React from 'react';
import s from './scripts.json'
import Link from '@docusaurus/Link';

export default function Scripts()
{
    return (
        <div>
            <ul>
                {Object.entries(s).map((x) =>
                    <li><Link to={`/docs/Blueprints/scripts/${x[0]}`}>{x[1].summary}</Link></li>
                )}
            </ul>
        </div>
    )
}         
