FROM jfloff/alpine-python:3.6-slim
#FROM python:3.4-alpine

WORKDIR /progress
ADD . /progress/

EXPOSE 80

# Change time zone

RUN apk add --update tzdata
ENV TZ=America/New_York

# Clean APK cache

RUN rm -rf /var/cache/apk/*

# Install needed packages

RUN pip install -r requirements.txt
RUN rm requirements.txt

# Fix outputs and caching

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

CMD ["python3", "progress.py"]
