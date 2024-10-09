# multiservice
Step 1 
* Install Docker and Docker Compose in your system 

Step 2 
* Pull the code from the repo.
* Start your dockerdeamon.

#information- * Here I have created 3 services in application directory cache,database and web.
              * one compose file for all of these three services.
              * Through this compose file We can build our image and create our container.

Step 3
* Go inside the application directory using below command.
    cd application
* Using below command we can build all docker images together by a single operation.
    docker-compose build
* Use below command to run the conatiner
    docker-compose up

* information- *Your service is up-end running
              *You can check while using localhost:3000 on your system browser.
              
Step 4
* To push your images in dockerhub firstly do docker login
* Tag your image with your repository and then push you can do using the below commands.
    docker tag <local-image-name>:<tag> <dockerhub-username>/<repo-name>:<tag>
    docker push your-username/multiservice:latest
* I can also pull my images through the command below.
    docker pull arpitarya2112/multiservice:v1
 
