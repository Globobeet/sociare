# Sociare [![Build Status](https://travis-ci.org/Globobeet/sociare.svg?branch=master)](https://travis-ci.org/Globobeet/sociare) [![Coverage Status](https://coveralls.io/repos/Globobeet/sociare/badge.svg)](https://coveralls.io/r/Globobeet/sociare)
Super simple customizable share buttons with counts.


## Installation

Sociare can be installed with [npm](https://npmjs.org/package/sociare)

```
$ npm install --save sociare
```

or with Bower

```
$ bower install -S sociare
```

or you can [download it directly.](https://raw.githubusercontent.com/Globobeet/sociare/master/dist/sociare.min.js)


## Prerequisites
Sociare comes bundled with only 1 dependency, Babel runtime, which enables key ES6 features that Sociare uses. Once browser support reaches a point where this runtime is no longer needed, it will be removed from the package.


### Browser support

* Google Chrome (at least latest 2)
* Safari (at least latest 2)
* Firefox (at least latest 2)
* Edge 12+
* Internet Explorer 9+


## Usage Example

```javascript
var sociare = new Sociare(document.getElementById('share-container'), {
	countUrl: 'http://mysite.com/share-counts',
	buttonClass="btn btn-{network}",
	buttonTemplate: "Share on {network} <span class="count">{count}</span>",
	buttons: [
		'twitter',
		'facebook',
		{
			type: 'pinterest',
			template: 'Pin it! <span class="count">{count}</span>'
		}
	]
});

sociare.render();
```


## API Reference

New instances of Sociare require a DOM element, within which the buttons will be rendered.

```javascript
var sociare = new Sociare(elem, [config]);
```

Configuration can be passed in the constructor (like shown above), but also be defined globally, at `window.SociareConfig`. Configuration inheritance is Global Config > Default Config > Button-Specific Config (See config.options below).

Once an instance has been configured, simply call `.render()` on it to have it fetch counts (if specified) and render the buttons.

```javascript
sociare.render();
```


### String Tokens

In any of the button configuration options (both default and button-specific), there are special tokens you can include that will get interpolated when the buttons are rendered. These tokens are:

| Name | Description |
| ---- | ----------- |
| `{network}` | Name of the network (facebook, twitter, pinterest, etc) |
| `{count}` | # of times URL has been shared on that network |


### Configuration Parameters

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `url` | String | `window.location.href` | The URL to share |
| `getCounts` | Boolean | `true` | Indicates whether Sociare should request counts for `config.url` |
| `countUrl` | String | | URL to request counts from. Required if `config.getCounts` is `true`. See [Handling Count Requests](#handling-count-requests) for information on what Sociare will expect to be returned |
| `noQueryCount` | Boolean | `false` | If true, adds query string to `config.countUrl` to indicate that query strings on `config.url` should be ignored when retrieving counts |
| `buttonTag` | String | `"a"` | Default button tagName |
| `buttonId` | String | `""` | Default button id. If specified here, should use `{network}` to keep ids unique |
| `buttonClass` | String | `"sociare sociare-{network}"` | Default button classes |
| `buttonAttrs` | Object | `{}` | Additional attributes on button elements. Keys map to attribute names, values to attribute values |
| `buttonTemplate` | String | `"Share on {network} - {count}"` | Default button template |
| `buttonPreHook` | Function | `undefined` | Function to call immediately before opening popup. Is passed a callback, which will prevent popup from opening if called with an error, and the name of the network selected. Async functions run the risk of resulting in a blocked popup.  |
| `buttonPostHook` | Function | `undefined` | Function to call immediately after opening popup. Is passed the name of the network selected. |
| `buttons` | Array[String/Object] | `[]` | Buttons to be rendered. Can be a string of the network name to use default configuration, or a [button-specific configuration](#button-specific-configuration) object. Available networks are `"facebook"`, `"twitter"`, `"pinterest"`, `"linkedin"`, and `"googleplus"` |
| `twitterExtras` | Object | `{}` | Default extra options for Twitter buttons. See [Twitter Extras](#twitter-extras) for full list of options.
| `pinterestExtras` | Object | `{}` | Default extra options for Pinterest buttons. See [Pinterest Extras](#pinterest-extras) for full list of options.
| `linkedinExtras` | Object | `{}` | Default extra options for Twitter buttons. See [LinkedIn Extras](#linkedin-extras) for full list of options.

### Button-Specific Configuration

Instead of just passing the network name as a string, you can fine-tune any button made with Sociare by instead passing a configuration object for it in the `buttons` array. Option names listed below:

| Name | Type | Description |
| ---- | ---- | ----------- |
| `url` | String | URL to share |
| `type` | String | Network type. Available networks are `"facebook"`, `"twitter"`, `"pinterest"`, `"linkedin"`, and `"googleplus"` |
| `tag` | String | Button element tagName |
| `id` | String | Button element ID |
| `class` | String | Button element classes |
| `attrs` | Object | Additional attributes on button element. Keys map to attribute names, values to attribute values |
| `template` | String | String template for innerHTML of button element |
| `preHook` | Function | Function to call immediately before opening popup. Is passed a callback, which will prevent popup from opening if called with an error. Async functions run the risk of resulting in a blocked popup. |
| `postHook` | Function | Function to call immediately after opening popup. |
| `extras` | Object | Additional network options (only available in twitter, pinterest, and linkedin types). See [Extras](#extras)


### Extras

Some button types (twitter, pinterest, and linkedin) have additional optional configuration that will alter how the URL is shared. See sections below for each networks available extra configuration. All extra values

#### Twitter Extras

| Name | Description |
| ---- | ----------- |
| `text` | Pre-filled tweet text. Users will still have the option to change this before sharing |
| `via` | A Twitter username to associate tweet. Will append "via @{username}" to end of tweet. |
| `hashtags` | Comma delimited list of hashtags to append to the tweet. Do not include the "#" character |


#### Pinterest Extras

| Name | Description |
| ---- | ----------- |
| `media` | URL of image to use when pinned to users boards |
| `description` | Caption to be used on pin |


#### LinkedIn Extras

| Name | Description |
| ---- | ----------- |
| `title` | Title that will appear on share card |
| `description` | Description to appear on share card |
| `source` | Source of the content (such as your websites name) |


### Handling Count Requests

Sociare requires a url to be provided if you would like to use share counts on the buttons it generates. The data returned from this URL should be JSON formatted as `network_name: count`, for example:

```json
{
	"facebook": 250,
	"twitter": 125
}
```

When Sociare makes this request, it applies the following query parameters to the URL to assist in determining exactly what data is needed:

* `url` - URL for which counts should be collected
* `networks` - Which networks Sociare requires counts from
* `omitQuery` - Whether query strings on the `url` should be included when fetching counts

Getting these counts is a real pain, so to make this easier, we've set up a [simple NodeJS utility](https://npmjs.org/package/sociare-counter) you can use to fetch these counts and output this data.


## Contributing

Pull requests for bug-fixes and additions of other services are always welcome! Please be sure to include any tests for new code & follow the current coding style as best you can.

You can run the test suite with the following command:

```
$ npm test
```


## License

Sociare is distributed under the [MIT license](https://github.com/Globobeet/sociare/blob/master/license.txt).
