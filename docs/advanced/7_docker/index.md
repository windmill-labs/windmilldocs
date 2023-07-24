# Run Docker Containers

Windmill support running any docker container through its bash support. As a pre-requisite, the host docker daemon need to be mounted into the worker container. This is done through a simple volume mount: `/var/run/docker.sock:/var/run/docker.sock`

## Setup

### Docker compose

On the docker-compose, it is enough to uncomment the volume mount of the windmill worker

```dockerfile
      # mount the docker socket to allow to run docker containers from within the workers
      # - /var/run/docker.sock:/var/run/docker.sock
```

### Helm charts

In the charts values of our [helm charts](https://github.com/windmill-labs/windmill-helm-charts), set `windmill.exposeHostDocker` to `true`

## Use

The default code is as follows:

```
msg="${1:-world}"

docker run --rm alpine /bin/echo "Hello $msg"
```

`msg` is just a normal bash variable. It can be used to pass arguments to the script. This syntax is the standard bash one to assign default values to parameters.

```
docker run --rm <image> <command>
```

--rm is so that the container dispose itself after being executed. It helps unpollute the host.

The image is the docker image to run. It can be any image available on docker hub or any private registry. It can also be a local image.

The command is the command to run inside the container. It can be any command available in the image.

It is just a bash script so it will behave exactly the same as a local command or if running this as an ssh command on the host. As a consequence, you can use any strategy to cache docker images or handle authentification.

Do not use the deamon mode `-d` otherwise the script will immediately return while the container continue to run in the background. However, in some cases, that might be what you want.

Like any bash script, it will return the last line of the stdout. So be sure to print the the return value from your command if you'd like to use it as a result.

As a script:

![script 1](./as_script.png.webp)

![script 2](./as_script2.png.webp)

As a flow step:

![flow step 1](./as_flow.png.webp)

![flow step 2](./as_flow2.png.webp)
