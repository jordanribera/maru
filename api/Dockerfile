FROM python:3
ENV PYTHONUNBUFFERED 1

RUN mkdir /app
COPY . /app/
RUN pip install -r /app/requirements.txt
WORKDIR /app/src
