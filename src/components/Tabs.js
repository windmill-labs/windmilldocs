import React from 'react'
import Tabs, { Tab } from 'react-best-tabs';
import 'react-best-tabs/dist/index.css';


export default function TabsW()
{
    return (
        <Tabs
            activeTab="1"
            className="max-w-4lg mx-auto"
            ulClassName="max-w-md"
            activityClassName="bg-success"
            onClick={(event, tab) => console.log(event, tab)}
        >
            <Tab title="HN mention => slack" className="mr-3">
                <div className="mt-3">
                    <div className='w-full mt-4 text-center'><div className="border shadow w-full  mx-auto max-w-3xl p-4 rounded"><iframe frameBorder="0" className='w-full' src='https://hub.windmill.dev/embed/flow/13/whenever-an-hn-message-contains-a-mention%2C-publish-it-to-slack' style={{ height: "800px" }}></iframe></div>
                        <div className="my-4 underline"><a href="https://app.windmill.dev/flows/add?hub=13">Edit/Run in Windmill</a></div>
                        <div>See more flows on <a href="https://hub.windmill.dev">WindmillHub</a></div>
                    </div >
                </div>
            </Tab>
            <Tab title="Expense OCR => GSheets" className="mr-3">
                <div className="mt-3">
                    <div className='w-full mt-4 text-center'><div className="border shadow w-full  mx-auto max-w-3xl p-4 rounded"><iframe frameBorder="0" className='w-full' src='https://hub.windmill.dev/embed/flow/21/expense_app' style={{ height: "800px" }}></iframe></div>
                        <div className="my-4 underline"><a href="https://app.windmill.dev/flows/add?hub=21">Edit/Run in Windmill</a></div>
                        <div>See more flows on <a href="https://hub.windmill.dev">WindmillHub</a></div>
                    </div >
                </div>
            </Tab>
        </Tabs>
    )
}

