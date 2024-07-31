#!/bin/sh

# NginxとPHP-FPMをSupervisor経由で起動
exec /usr/bin/supervisord -c /etc/supervisord.conf
