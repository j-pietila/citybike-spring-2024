"""
Config file for Gunicorn
https://docs.gunicorn.org/en/stable/settings.html#config-file
"""

bind = "0.0.0.0:3000"

workers = 6
worker_class = "gevent"
worker_connections = 1000
timeout = 180

loglevel = "info"
