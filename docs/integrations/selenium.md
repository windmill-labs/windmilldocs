# Windmill X Selenium / Selenoid

> **⚠ Disclaimer: you will have to self-host Windmill and Selenoid for this method to work**  

## Introduction
We will look at how to use Windmill and Selenoid, and Selenium Wire for the ultimate web scraping setup. We will go over on how to install and configure Selenoid and Windmill using docker compose.
Seleniumwire is not necessarily needed for webscraping but it allows for more advanced usecases. If you do not need Selenium-wire you also do not need to open additional ports in the docker compose file.

## Prerequisite
- Docker installed

## Step 1: Windmill configuration
Download the [docker-compose.yml](https://github.com/windmill-labs/windmill/blob/main/docker-compose.yml) file from the official Windmill repository and make the following changes.
- Increase the number of workers. This is basically the number of scripts you can run at the same time. we will increase it to 10.
- Increase the default timeout of the workers. 
- Open a range of ports on the `windmill_server` containers so Windmill and Selenoid can communicate.<br/>
- Remove the `caddy` service
- Remove the `windmill_worker` service (we will be running the worker's inside the `windmill_server`) 

It should look something like this

```yml
version: '3.7'

services:

  db:
    image: postgres:14
    restart: unless-stopped
    volumes:
      - db_data:/var/lib/postgresql/data
    ports:
      - 5432:5432
      - 5433:5432
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: windmill
    healthcheck:
      test: [ "CMD-SHELL", "pg_isready -U postgres" ]
      interval: 10s
      timeout: 5s
      retries: 5

  windmill_server:
    image: ghcr.io/windmill-labs/windmill:main
    deploy:
      replicas: 1
    restart: unless-stopped
    ports:
      - "8000:8000"
      - "9920-9930:9920-9930" # <- added this; only 10 ports are opened; if you want to open more ports increase the 2nd number respectively
    environment:
      - DATABASE_URL=postgres://postgres:${DB_PASSWORD}@db/windmill?sslmode=disable
      - BASE_URL=http://${WM_BASE_URL}
      - RUST_LOG=info
      - NUM_WORKERS=10 # <- an increased number of workers is helpful when running a lot of scraping scripts in parallel
      - TIMEOUT=99999999 # <- add this; This is important: Scraping websites usually outlasts normal scripts. To prevent a timeout we should increase this value.
      - DISABLE_SERVER=false
      - METRICS_ADDR=false
    depends_on:
      db:
        condition: service_healthy

  lsp:
    image: ghcr.io/windmill-labs/windmill-lsp:latest
    restart: unless-stopped
    ports:
      - 3001:3001

  caddy:
    image: caddy:2.5.2-alpine
    restart: unless-stopped
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
    ports:
      - 80:80
      - 443:443
    environment:
      - BASE_URL=${WM_BASE_URL}

volumes:
  db_data: null
```
create an `.env` file in the same directory as the `docker-compose.yml` file and add the following.
````
DB_PASSWORD=changeme
````
This is the PostgreSQL database password used by Windmill. 

## Step 2: Selenoid configuration
We will also use docker to configue Selenoid.
- Create a new folder in the same directory and name it `config`
- In the `config` directory create two new empty folder's and name them `video` and `logs`
- In the `config` directory create a new file and name it `browsers.json`
- `browsers.json` contains the configurations for the browser you will later run your scripts on it should look something like this
```json
{
    "firefox": {
        "default": "104.0",
        "versions": {
            "104.0": {
                "image": "selenoid/firefox:104.0",
                "port": "4444",
                "path": "/wd/hub",
                "env" : ["TZ=Europe/Berlin"]
            }
        }
    },
    "chrome": {
        "default": "104.0",
        "versions": {
            "104.0": {
                "image": "selenoid/chrome:104.0",
                "port": "4444",
                "path": "/",
                "env" : ["TZ=Europe/Berlin"]
            }
        }
    }
}
```
> **ⓘ Info: you will have to pull the browser images you specified in the `browsers.json` file yourself.**
> If you want to run Selenium with Docker on an Apple Silicon chip you need to pull custom images. Please follow this tutorial:
> https://medium.com/@SergeyChechaev/build-selenoid-image-for-apple-silicon-m1-6dc6fc1a50c1
> Example image for Mac M1/M2 chips: dumbdumbych/selenium_vnc_chrome_arm64:91.0.b
```bash
docker pull selenoid/chrome:104.0
docker pull selenoid/vnc_chrome:104.0
docker pull selenoid/firefox:104.0
docker pull selenoid/vnc_firefox:104.0
```
- now go back to the `docker-compose.yml` file we created in the first setup and add these two containers (`selenoid` and `selenoid-ui`). Don't forget to change the path to your `config` directory path.
```yml
  selenoid:
    network_mode: bridge
    image: aerokube/selenoid:latest-release
    volumes:
      - "/path/to/config:/etc/selenoid" # <- change this
      - "/path/to/config/video:/opt/selenoid/video" # <- change this
      - "/path/to/config/logs:/opt/selenoid/logs" # <- change this
      - "/var/run/docker.sock:/var/run/docker.sock"
    environment:
      - OVERRIDE_VIDEO_OUTPUT_DIR=./config/video
    command: ["-conf", "/etc/selenoid/browsers.json", "-video-output-dir", "/opt/selenoid/video", "-log-output-dir", "/opt/selenoid/logs"]
    ports:
      - "4444:4444"

  selenoid-ui:
    image: "aerokube/selenoid-ui"
    network_mode: bridge
    restart: always
    links:
      - selenoid
    ports:
      - "8080:8080"
    command: ["--selenoid-uri", "http://selenoid:4444"]
```

your `docker-compose.yml` should look like something like this
```yml 
version: '3.7'

services:

  db:
    image: postgres:14
    restart: unless-stopped
    volumes:
      - db_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
      - "5433:5432"
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: windmill
    healthcheck:
      test: [ "CMD-SHELL", "pg_isready -U postgres" ]
      interval: 10s
      timeout: 5s
      retries: 5

  windmill_server:
    image: ghcr.io/windmill-labs/windmill:main
    deploy:
      replicas: 1
    restart: unless-stopped
    ports:
      - "8000:8000"
      - "9920-9930:9920-9930"
    environment:
      - DATABASE_URL=postgres://postgres:${DB_PASSWORD}@db/windmill?sslmode=disable
      - BASE_URL=http://${WM_BASE_URL}
      - RUST_LOG=info
      - NUM_WORKERS=10
      - TIMEOUT=99999999
      - DISABLE_SERVER=false
      - METRICS_ADDR=false
    depends_on:
      db:
        condition: service_healthy

  lsp:
    image: ghcr.io/windmill-labs/windmill-lsp:latest
    restart: unless-stopped
    ports:
      - 3001:3001

  selenoid:
    image: aerokube/selenoid:latest-release
    network_mode: bridge
    volumes:
      - "/path/to/config:/etc/selenoid" # <- change this
      - "/path/to/config/video:/opt/selenoid/video" # <- change this
      - "/path/to/config/logs:/opt/selenoid/logs" # <- change this
      - "/var/run/docker.sock:/var/run/docker.sock"
    environment:
      - OVERRIDE_VIDEO_OUTPUT_DIR=./config/video
    command: ["-conf", "/etc/selenoid/browsers.json", "-video-output-dir", "/opt/selenoid/video", "-log-output-dir", "/opt/selenoid/logs"]
    ports:
      - "4444:4444"

  selenoid-ui:
    image: "aerokube/selenoid-ui"
    network_mode: bridge
    restart: always
    links:
      - selenoid
    ports:
      - "8080:8080"
    command: ["--selenoid-uri", "http://selenoid:4444"]

volumes:
  db_data: null
```

## Usage
now that the setup is done. you can start everything with `docker compose up -d`. <br/>
Navigate to Windmill `localhost:8000` and sign in `admin@windmill.dev` `changeme` <br/>
Create a new python script and paste the following code and run it.
```python
#requirements:
#selenium
#selenium-wire
#webdriver_manager


import selenium
from seleniumwire import webdriver
from webdriver_manager.chrome import ChromeDriverManager

def initiateDriver(macM1=False):
    print("initiating driver")
    from seleniumwire import webdriver  # Import from seleniumwire
    if macM1: #if we are on mac m1 -> custom image by selecting the browser version 91.0
        i = 9921
        while True:
            try:
                i += 1
                HOST = 'host.docker.internal'
                options = {
                    'auto_config': False,
                    # the addr and the port where the proxy should start: -> starts it in the windmill container
                    'addr': '0.0.0.0',
                    'port': i,
                }

                chrome_capabilities = {
                    "browserName": "chrome",
                    "browserVersion": "91.0",
                    "selenoid:options": {
                        "enableVNC": True
                    },
                    'goog:chromeOptions': {'extensions': [],
                                        'args': [f'--proxy-server=host.docker.internal:{i}',
                                                    '--ignore-certificate-errors']
                                        }
                }

                driver = webdriver.Remote(command_executor='http://{}:4444/wd/hub'.format(HOST),
                                            desired_capabilities=chrome_capabilities,seleniumwire_options=options) 

                print(f"initiated successfully with port:{i}")
                break
            except:
                print(f"initiating driver with port:{i}")
                if i > 9960:
                    print("port limit exceeded")
                    break

    else: #windows image
        i = 9921
        while True:
            try:
                i += 1
                HOST = 'host.docker.internal'
                options = {
                    'auto_config': False,
                    # the addr and the port where the proxy should start: -> starts it in the windmill container
                    'addr': '0.0.0.0',
                    'port': i,
                }

                chrome_capabilities = {
                    "browserName": "chrome",
                    #"browserVersion": "91.0", #on Windows we can use the latest version by not specifying the version number
                    "selenoid:options": {
                        "enableVNC": True
                    },
                    'goog:chromeOptions': {'extensions': [],
                                        'args': [f'--proxy-server=host.docker.internal:{i}',
                                                    '--ignore-certificate-errors']
                                        }
                }

                driver = webdriver.Remote(command_executor='http://{}:4444/wd/hub'.format(HOST),
                                            desired_capabilities=chrome_capabilities,seleniumwire_options=options) 

                print(f"initiated successfully with port:{i}")
                break
            except:
                print(f"initiating driver with port:{i}")   
                if i > 9960:
                    print("port limit exceeded")
                    break

    return driver

def main():
  driver = initiateDriver(macM1=False))
  driver.get('https://www.github.com')

  # Test whether Seleniumwire is working
  for request in driver.requests:
      if request.response:
          print(
              request.url,
              request.response.status_code,
              request.response.headers['Content-Type']
          )
```
it should reutrn this
````commandline
job 0186366f-1f2b-9013-1dc9-fc67392d7fc1 on worker dt-worker-YhrsY-pnsPS

resolving dependencies...
content of requirements:
selenium
selenium-wire
webdriver_manager

--- PYTHON CODE EXECUTION ---

https://accounts.google.com/ListAccounts?gpsia=1&source=ChromiumBrowser&json=standard 200 application/json; charset=utf-8
https://www.github.com/ 301 None
https://github.com/ 200 text/html; charset=utf-8
https://github.com/webgl-globe/data/data.json 200 application/json; charset=utf-8
https://github.githubassets.com/assets/light-719f1193e0c0.css 200 text/css
https://github.githubassets.com/assets/site-a015b1c08678.css 200 text/css
https://github.githubassets.com/assets/dashboard-721c31c54b4a.css 200 text/css
https://github.githubassets.com/assets/dark-0c343b529849.css 200 text/css
https://github.githubassets.com/assets/primer-3e0c23f0f191.css 200 text/css
https://github.githubassets.com/assets/global-3cf05c0b86b4.css 200 text/css
https://github.githubassets.com/assets/github-2645938a5e10.css 200 text/css
https://github.githubassets.com/assets/home-campaign-43696372e176.css 200 text/css
https://github.githubassets.com/assets/home-3bba68f788b5.css 200 text/css
https://github.githubassets.com/static/fonts/github/mona-sans.woff2 200 binary/octet-stream
https://github.githubassets.com/assets/wp-runtime-ac273d933deb.js 200 application/javascript
https://github.githubassets.com/assets/environment-056aee03b442.js 200 application/javascript
https://github.githubassets.com/assets/vendors-node_modules_smoothscroll-polyfill_dist_smoothscroll_js-node_modules_stacktrace-parse-297da6-e9c57502fa51.js 200 application/javascript
https://github.githubassets.com/assets/vendors-node_modules_github_selector-observer_dist_index_esm_js-2646a2c533e3.js 200 application/javascript
https://github.githubassets.com/assets/vendors-node_modules_delegated-events_dist_index_js-node_modules_github_details-dialog-elemen-63debe-c04540d458d4.js 200 application/javascript
https://github.githubassets.com/assets/vendors-node_modules_github_auto-complete-element_dist_index_js-node_modules_github_catalyst_-6afc16-e779583c369f.js 200 application/javascript
https://github.githubassets.com/assets/vendors-node_modules_github_clipboard-copy-element_dist_index_esm_js-node_modules_github_mark-f079ea-28d13f5dc945.js 200 application/javascript
https://github.githubassets.com/assets/vendors-node_modules_github_file-attachment-element_dist_index_js-node_modules_github_text-ex-3415a8-7ecc10fb88d0.js 200 application/javascript
https://github.githubassets.com/assets/vendors-node_modules_github_filter-input-element_dist_index_js-node_modules_github_remote-inp-b4f804-a484ac7b8d06.js 200 application/javascript
https://github.githubassets.com/assets/vendors-node_modules_github_relative-time-element_dist_index_js-52e1ce026ad1.js 200 application/javascript
https://github.githubassets.com/assets/vendors-node_modules_primer_view-components_app_components_primer_primer_js-node_modules_gith-6a1af4-5aa2b7194bed.js 200 application/javascript
https://github.githubassets.com/assets/github-elements-cd740e3641d5.js 200 application/javascript
https://github.githubassets.com/images/modules/site/home-campaign/hero-bg.webp 200 image/webp
https://github.githubassets.com/assets/element-registry-cd542bce9398.js 200 application/javascript
https://github.githubassets.com/assets/vendors-node_modules_lit-html_lit-html_js-9d9fe1859ce5.js 200 application/javascript
https://github.githubassets.com/assets/vendors-node_modules_manuelpuyol_turbo_dist_turbo_es2017-esm_js-4140d67f0cc2.js 200 application/javascript
https://github.githubassets.com/assets/vendors-node_modules_github_mini-throttle_dist_index_js-node_modules_github_alive-client_dist-bf5aa2-424aa982deef.js 200 application/javascript
https://github.githubassets.com/assets/vendors-node_modules_github_hotkey_dist_index_js-node_modules_github_hydro-analytics-client_d-047034-e1f405a05c74.js 200 application/javascript
https://github.githubassets.com/assets/vendors-node_modules_github_remote-form_dist_index_js-node_modules_github_template-parts_lib_-273494-1221cc21243c.js 200 application/javascript
https://github.githubassets.com/assets/app_assets_modules_github_updatable-content_ts-cfb228eb374b.js 200 application/javascript
https://github.githubassets.com/images/modules/site/home-campaign/lines-hero.svg 200 image/svg+xml
https://github.githubassets.com/assets/vendors-node_modules_github_paste-markdown_dist_index_esm_js-node_modules_github_quote-select-c15b39-ba2ec46e1360.js 200 application/javascript
https://github.githubassets.com/assets/app_assets_modules_github_sticky-scroll-into-view_ts-8c72dbb06086.js 200 application/javascript
https://github.githubassets.com/assets/app_assets_modules_github_behaviors_keyboard-shortcuts-helper_ts-app_assets_modules_github_be-d820ce-ac734f7d527c.js 200 application/javascript
https://github.githubassets.com/assets/app_assets_modules_github_behaviors_user-content_ts-app_assets_modules_github_blob-anchor_ts--b39cba-ebacc0658b7e.js 200 application/javascript
https://github.githubassets.com/images/modules/site/home-campaign/hero-drone.webp 200 image/webp
https://github.githubassets.com/assets/app_assets_modules_github_behaviors_commenting_edit_ts-app_assets_modules_github_behaviors_ht-83c235-79b9893b9598.js 200 application/javascript
https://github.githubassets.com/images/modules/site/home-campaign/logos/mercedes.svg 200 image/svg+xml
https://github.githubassets.com/assets/behaviors-804d56bc4347.js 200 application/javascript
https://github.githubassets.com/images/modules/site/home-campaign/logos/kpmg.svg 200 image/svg+xml
https://github.githubassets.com/images/modules/site/home-campaign/logos/pinterest.svg 200 image/svg+xml
https://github.githubassets.com/assets/notifications-global-83502d97888b.js 200 application/javascript
https://github.githubassets.com/assets/vendors-node_modules_delegated-events_dist_index_js-node_modules_github_catalyst_lib_index_js-06ff531-32d7d1e94817.js 200 application/javascript
https://github.githubassets.com/images/modules/site/home-campaign/logos/stripe.svg 200 image/svg+xml
https://github.githubassets.com/assets/vendors-node_modules_delegated-events_dist_index_js-node_modules_stacktrace-parser_dist_stack-8189f0-7e70a0a9f758.js 200 application/javascript
https://github.githubassets.com/assets/marketing-c98588ee9c2b.js 200 application/javascript
https://github.githubassets.com/assets/vendors-node_modules_github_webgl-globe_dist_js_main_js-c61608acc916.js 200 application/javascript
https://github.githubassets.com/images/modules/site/home-campaign/logos/telus.svg 200 image/svg+xml
https://github.githubassets.com/images/modules/site/home-campaign/logos/pg.svg 200 image/svg+xml
https://github.githubassets.com/images/modules/site/home-campaign/astrocat.png 200 image/png
https://github.githubassets.com/assets/home-0369a2a6b0c5.js 200 application/javascript
https://github.githubassets.com/assets/webgl-globe-0fd6a24e0678.js 200 application/javascript
https://github.githubassets.com/assets/home-campaign-e84e2074962a.js 200 application/javascript
https://github.githubassets.com/assets/sessions-f05f1914a3a6.js 200 application/javascript
https://github.githubassets.com/images/modules/site/home/globe.jpg?width=619 200 image/webp
https://github.githubassets.com/images/modules/site/codespaces/illo-ports.png 200 image/png
https://github.githubassets.com/assets/chunk-app_components_primer_experimental_toggle-switch-element_ts-c749d10d53a7.js 200 application/javascript
````

to run multiple scripts at once you will have to give a unique port to each script if you want to run all of them at once. In the first step we opened the ports between `9920 - 9930` you can increase them or decrease the range as you want but remember to increase / decrease the workers number to