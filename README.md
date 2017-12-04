# Edger

A file watcher/sync to work locally on the Apigee Edge platform

## Description

Edger is a simple file watcher that automatically syncs local changes to the Apigee Edge platform when you're working with API Proxies.

## For developers
Clone this repository an then link it

usually you need `sudo` on Ubuntu/Linux environments
``` bash
npm link
```

## Install

``` bash
npm install -g
```

## Usage

**Edger** has two differents approachs:
- Download an **existing API Proxy** and start watching it locally for changes.
- Start watching immediately in an **API Proxy local folder**, has to be in the root folder of the extracted bundle `/apiproxy`

**Edger** will try to detect your _API Proxy base configuration_ (Proxy Properties) and merge then with variables settled in your environment.

In that case `API_NAME` and `API_REVISION` can be ommited but is **mandatory** when `--download-bundle` option is configured.

The variables are:

```
API_ENVIRONMENT
API_NAME
API_ORGANIZATION
API_REVISION
APIGEE_USERNAME
APIGEE_PASSWORD
```

To use it then you do (remember to export environment vars):
```
source .env
```

### Parameters with others behaviors are listed below:

`-D, --download-bundle` (optional) download the bundle and then start to watch it, if you don't specify it, it would attempt to watch the current directory and if a local **API Proxy local folder** is not present it will do nothing.

`-A, --auto-update` (optional) updates automatically when the Proxy Endpoint File changes, if not Edger will prompt to you.

`--dir, -d` (optional) specify a directory to watch (not yet supported)

`--event, -e` (optional) specify a event to watch (not yet supported)

`-h, --help` (optional) output usage information

```
  Usage: edger [options]

  Options:

    -V, --version          output the version number
    -D, --download-bundle  (optional) download the bundle and then start to watch it
    -A, --auto-update      (optional) updates automatically when the Proxy Endpoint File changes, if not Edger will prompt to you
    -d, --dir [directory]  (optional) directory to Watch
    -e, --event [event]    (optional) type of Event to Watch (default event is Change)
    -h, --help             output usage information
```
## Examples

To start watching immediately for changes and sync, just:

```
edger
```

Download an API Proxy revision and start watching it :

```
edger --download-bundle
```

## Apigee API Edge Managment scopes
When you make changes to the Endpoint Main Proxy file/files _for example regularly call_ `default.xml` on the `/proxies` folder _Apigee Edge Management API_ does not support a granular update for this file, it have to update the complete package, this operation requires some time and task, mainly related to the Apigee Edge Management API. These tasks are compress the folder, prepare, perform the verification against Apigee API and then update the Proxy remotely, it takes some time according to the size of the Project, the same behavior is applied to the file/files of Target Endpoint.
 
## ToDo:
- Support for automatic updates on Target Endpoint files
- Support for a `json` configuration file
- Support for basic configuration variables on the Edger commander
- Support for CI with Gitlab and Github
- Emits a exception when the API Proxy folder is not present
- Watch type of events based on chokidar
- Watch event treatment
- Invalid Apigee credentials treatment
- Error treatments from Request (authentication errors, invalid file type) and from response (statusCode, cb error, etc)
 
 Tested with Nodejs 8.6.0, 8.7.0
