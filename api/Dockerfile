FROM python:3
ENV PYTHONUNBUFFERED 1

RUN mkdir /app
COPY . /app/
RUN pip install -r /app/requirements.txt

RUN useradd -u 1000 maruuser
USER maruuser
WORKDIR /app/src

EXPOSE 8000
CMD ["gunicorn", "core.wsgi:application", "--bind", "0.0.0.0:8000"]
