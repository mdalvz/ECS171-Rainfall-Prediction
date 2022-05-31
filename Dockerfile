FROM nikolaik/python-nodejs

WORKDIR /app

COPY requirements.txt /app/requirements.txt

RUN pip install -r requirements.txt

COPY . /app

WORKDIR /app/client

RUN npm install

RUN npm run build

WORKDIR /app/server

RUN npm install

CMD [ "node", "index.js" ]