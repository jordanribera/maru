FROM python:3
ENV PYTHONUNBUFFERED 1


RUN mkdir /app
COPY . /app/
RUN pip install -r /app/requirements.txt

RUN useradd -u 1000 maruuser
USER maruuser

WORKDIR /app/src
