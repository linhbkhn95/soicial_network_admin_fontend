1. Build Image: ```docker-compose buid```
2. Run Image: ```docker-compose up```
3. How to config the enviroment avariables those determine how the app react (which is the api base address should the app call the requests to, which is production stage that the webapp should run on ?)
   - With docker-compose: assign API_BASE, AUTH_BASE, APP_ENV_ARG to some values to specify the api endpoint that webapp will request to, the auth endpoint (it usually be indentical with the api endpoint value in the common case), and the production stage, respectively.
   - With docker build command: using --build-args option:

   ```docker build --build-arg API_BASE=fms_api.com --build-arg AUTH_BASE=fms_api_auth.com -t test```
   - Default values:
      + API_BASE: http://118.70.185.117:3009
      + AUTH_BASE: http://118.70.185.117:3009
      + APP_ENV_ARG: production
