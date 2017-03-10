# Fett

Fett is a small JS library to track how many versions of your web app are running.

Named after the greatest clone of all time, Boba Fett, Fett updates `window.localStorage` each time a new instance of your web app is opened in a new tab. It provides utilities to add and remove listeners, so you can react to the creation and removal of instances.

## Why Fett?

Lots of apps are built as SPAs - designed to be navigated like a native app - but used more like a static page. If you've ever opened a resource-hungry SPA across ten or fifteen browser tabs, you have felt this pain as well. Integrating Fett into your app will allow users who do this kind of thing to have a smoother experience.

You can turn off features of your app as more instances of your app load, or even send the number of instances as a param to the server and have that return a static page instead of a SPA. At the very least, you can display a message to warn the user that they're not using your whiz-bang Babel-transpiled Webpack-bundled Redux app properly.

## API

### `startCounting`

Before you can do anything, you have to call `fett.startCounting('myCoolKey')`, which takes an optional string parameter so you can set the key you'd like to use in `localStorage`. If you call `startCounting` with no parameters, it will choose a key for you. Feel free to call `startCounting` multiple times - it doesn't overwrite the data in `localStorage`.

### `numInstances`

Once your app is counting its instances, call `fett.numInstances()` to get the number of current instances.

### `createListener` and `removeListener`

To react to instances of your app being created or destroyed, you can create and remove listeners with `fett.createListener(function)` and `fett.removeListener(function)`. The function you pass to `createListener` will be called every time `localStorage` changes.
