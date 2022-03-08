import React from 'react';
import rt from './resource_types.json'
export default function ResourceTypes()
{
    let values = Object.values(rt)
    return (
        <div>
            <ul>
            {values.map((x) => 
                <li><a href={`https://github.com/windmill-labs/windmill/blob/main/starter/resource_types/${x.name}.json`}>{x.name}</a> - {x.description}</li>
            )}
            </ul>
        </div>   
    )
}         
