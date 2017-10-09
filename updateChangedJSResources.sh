RESOURCES=`git status |awk '/modified/ {print $2}' | awk '/jsc/ {print}'`
for RESOURCE in $RESOURCES
do
    updateJsResource.sh $RESOURCE
done
