# Retail Web

### Online Demo
http://retail.victz.com

## Development

### Debug and Run both backend and frontend

Run the following commands in terminals or execute the Main RetailCliApplication.java from IDE directly.

```
./mvnw
```

### Debug and Run frontend and view result at realtime

Run the following commands in terminal

```
cd src/main/webapp
./yarn start
```

## Building for production

### Packaging as jar

To build the final jar and optimize for production, run:

```
./mvnw clean install
```

This will generate retail-0.0.1-SNAPSHOT.jar in target directory. To ensure everything worked, run:

```
java -jar target/retail-0.0.1-SNAPSHOT.jar
```

## Testing

To launch your application's tests, run:

```
./mvnw verify
```