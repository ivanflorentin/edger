
if [ -z "${API_ORGANIZATION}" ] || [ -z "${API_ENVIRONMENT}" ] || [ -z "${API_REVISION}" ]; then

 echo 'Parameters: organization environment revision [old-revision]';

else

 if [ ! -z "${OLD_REV}" ]; then
     if [ $OLD_REV == "update" ]; then
	 echo "update or not $UPDATE"
	 UPDATE=$OLD_REV
	 OLD_REV=$API_REVISION
	 fi
 else
     OLD_REV=$API_REVISION
 fi

 AUTH_HEADER="Authorization: Basic `echo -n \"$APIGEE_USERNAME:$APIGEE_PASSWORD\" | base64`"
  
 echo "Undeploy $API_NAME:$OLD_REV from $API_ORGANIZATION:$API_ENVISION"
 
 curl -i -X DELETE --header "$AUTH_HEADER" "https://api.enterprise.apigee.com/v1/organizations/$API_ORGANIZATION/environments/$API_ENVIRONMENT/apis/$API_NAME/revisions/$OLD_REV/deployments"

 echo "Deploy $API_NAME:$API_REVISION in $API_ORGANIZATION:$API_ENVIRONMENT"
 curl -i -X POST --header "$AUTH_HEADER" "https://api.enterprise.apigee.com/v1/organizations/$API_ORGANIZATION/environments/$API_ENVIRONMENT/apis/$API_NAME/revisions/$API_REVISION/deployments"

 echo -n $'\a\a\a'

fi
