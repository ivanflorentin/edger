source ./apigee_base_config.sh 
JS_RESOURCE_FILE=$1

if [ -z "{$JS_RESOURCE_FILE}" ]; then
    echo "select a JS resource file to update"
else
    echo "Updating $JS_RESOURCE_FILE"
    CONTENT_TYPE="Content-type: multipart/form-data"
    HEADER="Authorization: Basic `echo -n \"$APIGEE_USERNAME:$APIGEE_PASSWORD\" | base64`"
    SERVER_RESOURCE_FILE=`echo $JS_RESOURCE_FILE | awk -F/ '{print $NF}'`
    URL="https://api.enterprise.apigee.com/v1/o/$API_ORG/apis/$API_NAME/revisions/$API_REV/resourcefiles/jsc/$SERVER_RESOURCE_FILE"
    curl -X PUT -H "$CONTENT_TYPE"  -F file=@$JS_RESOURCE_FILE  --header "$HEADER" "$URL"
fi
