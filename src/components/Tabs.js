import React from 'react';
import Tabs, { Tab } from 'react-best-tabs';
import 'react-best-tabs/dist/index.css';


export default function TabsW()
{
    return (
        <Tabs
            activeTab="1"
            className="max-w-4xl mx-auto"
            ulClassName="max-w-4xl"
            activityClassName="bg-success"
            onClick={(event, tab) => console.log(event, tab)}
        >
            <Tab title="Notify on Slack on HN mention" className="mr-3">
                <div className="mt-3">
                    <div className='w-full mt-4 text-center'><div className="border shadow w-full  mx-auto max-w-3xl p-4 rounded"><iframe frameBorder="0" className='w-full' src='https://hub.windmill.dev/embed/flow/13/whenever-an-hn-message-contains-a-mention%2C-publish-it-to-slack' style={{ height: "800px" }}></iframe></div>
                        <div className="my-4 font-bold text-xl underline"><a href="https://app.windmill.dev/flows/add?hub=13">Edit/Run in Windmill</a></div>
                        <div>See more flows on <a href="https://hub.windmill.dev">WindmillHub</a></div>
                    </div >
                </div>
            </Tab>
            <Tab title="Send receipt OCR data to Slack" className="mr-3">
                <div className="mt-3">
                    <div className='w-full mt-4 text-center'><div className="border shadow w-full  mx-auto max-w-3xl p-4 rounded"><iframe frameBorder="0" className='w-full' src='https://hub.windmill.dev/embed/flow/21/expense_app' style={{ height: "800px" }}></iframe></div>
                        <div className="my-4 font-bold text-xl underline"><a href="https://app.windmill.dev/flows/add?hub=21">Edit/Run in Windmill</a></div>
                        <div>See more flows on <a href="https://hub.windmill.dev">WindmillHub</a></div>
                    </div >
                </div>
            </Tab>
            <Tab title="Trigger user ban flow with a webhook" className="mr-3">
                <div className="mt-3">
                    <div className='w-full mt-4 text-center'><div className="border shadow w-full  mx-auto max-w-3xl p-4 rounded"><iframe frameBorder="0" className='w-full' src='https://hub.windmill.dev/embed/flow/22/expense_app' style={{ height: "800px" }}></iframe></div>
                        <div className="my-4 font-bold text-xl  underline"><a href="https://app.windmill.dev/flows/add?hub=22">Edit/Run in Windmill</a></div>
                        <div>See more flows on <a href="https://hub.windmill.dev">WindmillHub</a></div>
                    </div >
                </div>
            </Tab>
            <Tab title="Generate a weekly report and share it to Slack channel" className="mr-3">
                <div className="mt-3">
                    <div className='w-full mt-4 text-center'><div className="border shadow w-full  mx-auto max-w-3xl p-4 rounded"><iframe frameBorder="0" className='w-full' src='https://hub.windmill.dev/embed/flow/24/compute_activity' style={{ height: "800px" }}></iframe></div>
                        <div className="my-4 font-bold  text-lg underline"><a href="https://app.windmill.dev/flows/add?hub=24">Edit/Run in Windmill</a></div>
                        <div>See more flows on <a href="https://hub.windmill.dev">WindmillHub</a></div>
                    </div >
                </div>
            </Tab>
            <Tab title="Sign up a user in the database as a backend endpoint" className="mr-3">
                <div className="mt-3">
                    <div className='w-full mt-4 text-center'><div className="border shadow w-full  mx-auto max-w-3xl p-4 rounded"><iframe frameBorder="0" className='w-full' src='https://hub.windmill.dev/embed/flow/23/signup' style={{ height: "800px" }}></iframe></div>
                        <div className="my-4 underline"><a href="https://app.windmill.dev/flows/add?hub=23">Edit/Run in Windmill</a></div>
                        <div>See more flows on <a href="https://hub.windmill.dev">WindmillHub</a></div>
                    </div >
                </div>
            </Tab>
        </Tabs>
    )
}
