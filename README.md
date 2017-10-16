# Edger

  A collection of rudimentary tools to help development on ApiGee Edge

# Install

```
  npm install
```

# Usage

```
  Usage: watch [options]


  Options:

    -d, --dir <directory>  Directory to Watch     (required)
    -e, --event <event>    Type of Event to Watch (required)
    -h, --help             output usage information
```
  
  Create a folder with the name of your proxy
  
  Copy the files of this project to this folder
  
  Download and decompress the bundle of your api proxy
  
  Configure your options in apigee_base_config.sh
  
  Use updateJsResource.sh to update a single js file 
  
 and then 
 
 ```
 $ node watch.js <commands>
 ```
 
 to automagically upload files when they are changed in the file system.
 
 # TODO

- Watch type of events based on chokidar
- Watch event treatment
- Invalid Apigee credentials treatment
- Error treatments from Request (authentication errors, invalid file type) and from response (statusCode, cb error, etc)
- More descriptive logs event
- Consistency in filenames
 
 Tested with NodeJs 8.6.0 and 7.10.0
