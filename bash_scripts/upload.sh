
BUNDLE=`./mkbundle.sh`

if [ -z "${API_ORGANIZATION}" ]; then
    
 echo "Parameters: organization"

elif ! [[ -z $API_REVISION ]] ; then
    
    echo "Update $BUNDLE to $API_NAME @ $API_ORGANIZATION Revision: $API_REVISION"
    curl -i -X POST --header "Authorization: Basic `echo -n \"$APIGEE_USERNAME:$APIGEE_PASSWORD\" | base64`" -F "file=@$BUNDLE" "https://api.enterprise.apigee.com/v1/organizations/$API_ORGANIZATION/apis/$API_NAME/revisions/$API_REVISION"
    echo -n $'\a\a'
    
else
    
    echo "Upload $BUNDLE to $API_NAME @ $API_ORGANIZATION  Revision: $API_REVISION"
    curl -i -X POST --header "Authorization: Basic `echo -n \"$APIGEE_USERNAME:$APIGEE_PASSWORD\" | base64`" -F "file=@$BUNDLE" "https://api.enterprise.apigee.com/v1/organizations/$API_ORGANIZATION/apis?action=import&name=$API_NAME&validate=true"
    echo -n $'\a\a'
    
 fi
