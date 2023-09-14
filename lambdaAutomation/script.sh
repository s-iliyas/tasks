echo "Script started!!"

folder_check="tasks"

if [ ! -d "$folder_check" ]; then
    echo "<Folder does not exists>"
    git clone https://github.com/s-iliyas/tasks.git
fi

cd tasks/lambdaAutomation

zip -r code.zip code

rm -rf tasks/.git

aws s3 sync . s3://test-iliyas/automation

aws cloudformation create-stack \
 --stack-name test-iliyas-stack \
 --template-url https://test-iliyas.s3.us-west-2.amazonaws.com/automation/cloudformation.yml \
 --capabilities CAPABILITY_NAMED_IAM