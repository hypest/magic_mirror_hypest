# What is it

A custom MagicMirror² setup delivered as a Docker image, based off https://github.com/bastilimbach/docker-MagicMirror.

# How to use

```bash
docker run  -d \
    --publish 80:8080 \
    --restart always \
    --volume /etc/localtime:/etc/localtime:ro \
    --name magic_mirror_hypest \
    hypest/docker-magicmirror-hypest
```
