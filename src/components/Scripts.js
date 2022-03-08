import React from 'react';
import s from './scripts.json'

export default function Scripts()
{
    return (
        <div>
            <ul>
            {Object.entries(s).map((x) => 
                <li><a href={`https://github.com/windmill-labs/windmill/blob/main/starter/scripts/u/bot/${x[0]}.py`}>{x[1].summary}</a> - {x[1].description}</li>
            )}
            </ul>
        </div>   
    )
}         
