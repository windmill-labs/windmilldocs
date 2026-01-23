# MQTT integration

[MQTT](https://mqtt.org/) (Message Queuing Telemetry Transport) is a lightweight messaging protocol designed for small sensors and mobile devices optimized for low-bandwidth, high-latency, or unreliable networks.

Windmill allows you to create MQTT triggers, enabling subscriptions to a specific MQTT broker. When a message is received on the subscribed topic, the designated script or workflow set at trigger creation will be executed automatically.

<iframe
    style={{ aspectRatio: '16/9' }}
    src="https://www.youtube.com/embed/T_ava06lqlc"
    title="MQTT Triggers"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    className="border-2 rounded-lg object-cover w-full dark:border-gray-800"
></iframe>

<br/>
>This video shows how to set up an MQTT trigger in Windmill. Additionally, the video illustrates the execution of the script linked to the created trigger when a message is received.
<br/>

For more details, please refer to the [MQTT documentation](../core_concepts/mqtt_triggers).




