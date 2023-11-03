# Builder image
FROM python:3.11-slim-bullseye as builder-django

WORKDIR /app

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

RUN python -m venv /venv
ENV PATH="/venv/bin:$PATH"

COPY ./requirements.txt .
RUN pip install -r requirements.txt

# Final image
FROM python:3.11-slim-bullseye

WORKDIR /run/src/app

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV PIP_DISABLE_PIP_VERSION_CHECK=1

RUN apt-get update && apt-get install -y --no-install-recommends \
    gosu \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy Python environment from builder phase and prepend it to system PATH
COPY --from=builder-django /venv /venv
ENV PATH="/venv/bin:$PATH"

# Copy Django app
COPY . .

# Setup user for Gunicorn
RUN useradd --no-create-home --uid 1020 gunicorn \
    && chown -R gunicorn:gunicorn .

# Allow Gunicorn to find app modules
ENV PYTHONPATH /run/src/app

EXPOSE 3000/tcp

ENTRYPOINT [ "bash", "entrypoint.sh" ]
