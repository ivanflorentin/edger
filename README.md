# Edger

  A collection of rudimentary tools to help development on ApiGee Edge

# For developers
Clone this repository an then link it.

```

$npm link
```


# Install

```
  npm install -g
```

# Usage

Edger now implemnts a commad available globally, so it can manage different projects each with its own configuration
  
Create a folder with the name of your proxy, download and decompress the bundle of your api proxy inside that folder.
Edger will try detect you api proxy configuration and merge with variables set in your environment.

This variables are:

APIGEE_USERNAME

APIGEE_PASSWORD

API_NAME

API_ORGANIZATION

API_REVISION

API_ENVIRONMENT

If present, they will replace the defaults in your api proxy configuration. 

to start watching for changes and automatically update jour api proxy, just:

```
$ edger
```
 
# TODO
- Create a local configuration for the project
- Create project by downloading a bundle 
- Watch type of events based on chokidar
- Watch event treatment
- Invalid Apigee credentials treatment
- Error treatments from Request (authentication errors, invalid file type) and from response (statusCode, cb error, etc)
- More descriptive logs event
- Consistency in filenames
 
 Tested with NodeJs 8.6.0, 8.7.0 and 7.10.0
