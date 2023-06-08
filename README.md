# Fedex Delivery System
Full-stack Fedex application using Angular and Spring Boot.

# Stacks
- Angular, Ngrx
- Spring Boot
- Spring Restful
- Spring Security with JWT
- JPA, Hibernate
- MySQL

# Run
### Server
Run Spring Boot application server from root directory (default port 8080), but my configuration is port 8085.
```
$ ./gradlew bootRun --stacktrace
```
To build the Spring application, run:
```
$ ./gradlew build
```
Note: To create a production environment (for deployment to AWS Elastic Beanstalk), create a separate `application-prod.properties` file and put all production configurations in there, then add bootRun task in `build.gradle` file.
```
// build.gradle
bootRun {
  if (project.hasProperty('args')) {
    args project.args.split(',')
  }
}
```
Then run the server with provided args, each argument can be separated by `,`:
```
$ ./gradlew bootRun -Pargs=--spring.profiles.active=prod
```

### Client
To run Angular client, from root directory, go to client folder:
```
$ cd front-end/shop-app
$ ng serve -o
```
Default port for Angular is 4200.

### Database
To start MySQL server (default port 3306), run:
```
$ mysql -u root -p
```
