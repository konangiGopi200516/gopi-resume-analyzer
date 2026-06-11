$url = "https://start.spring.io/starter.zip?dependencies=web,data-jpa,mysql,security,validation,lombok&name=backend&type=maven-project&language=java&baseDir=backend&groupId=com.resumeanalyzer&artifactId=backend"
$output = "backend.zip"
Invoke-WebRequest -Uri $url -OutFile $output
Expand-Archive -Path $output -DestinationPath .
Remove-Item $output
