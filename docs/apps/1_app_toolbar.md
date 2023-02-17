# Toolbar

The app toolbar is present on the top of the app editor. It allows you to configure app settings, toggle preview (desktop/mobile) and debug runs.

### App summary

The app summary can be edited in left side of the toolbar. The app summary is used to describe the app and is visible in the app list.
The default summary is the app name.

### Preview mode

The app editor mode can be toggled between `Editor` and `Preview` mode. The preview mode allows you to see the app in action.

### Desktop/mobile mode

Switch the canvas mode in `Mobile` or `Desktop` layout from the toolbar.

### Menu `⋮`

The `⋮` menu allows you to access the following options:

- JSON: view the JSON representation of the app.
- Publish to Hub: publish the app to the Windmill Hub.
- Hub compatible JSON: view the JSON representation of the app in a format compatible with the Windmill Hub.

![App Menu](../assets/apps/1_app_toolbar/app-menu.png)

### App inputs configuration

The app inputs menu displays the list of all inputs of each component.
A toggle allows you to only display resources inputs, so you can easily configure your third-party resources of an app imported from the Hub, for example:

![App inputs configuration](../assets/apps/1_app_toolbar/app-inputs-configuration.png)

### Debug runs

The app builder allows you to have a look at latests runs to spot potential bugs.

![App debug runs](../assets/apps/1_app_toolbar/app-debug-runs.png)

### Publish

Publish the app as a standalone app, via an URL.
An app can be published in two ways:

- Read-access required: the app can be accessed by anyone who has read access to the app.
- Publish publicly: the app can be accessed by anyone knowing the secret URL. If set to `Publish publicly`, the secret url will be displayed here.

![App Publish](../assets/apps/1_app_toolbar/app-publish.png)

### Save

Save the app.
