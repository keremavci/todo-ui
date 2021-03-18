# ToDo APP UI

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run For Production Environment
```
docker build --build-arg API_URL=http://172.17.0.1:9080/api/todo -t todo-ui .
docker run -d -p 80:80 todo-ui
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

https://vuematerial.io/getting-started
https://vuejs.org/v2/guide/
https://cli.vuejs.org/guide/creating-a-project.html#vue-create
