# ECS 171 Group 21 - Rainfall Prediction

# Running

1. You need to have docker installed on your system. [Docker Website](https://www.docker.com/)

2. Clone the repository

```
git clone https://github.com/Mac-A-4/ECS171-Rainfall-Prediction.git
```

3. Go into the repo folder

```
cd ECS171-Rainfall-Prediction
```

4. Build the docker image (this may take a long time)

```
sudo docker build -t rainfall-app .
```

5. Run the docker image

```
sudo docker run -p 3000:80 rainfall-app
```

6. Go to [http://localhost:3000](http://localhost:3000) in your web browser

# Building The Model

Rebuilding the model is not required to run the app because the repo already contains prebuilt model files.

If you want to rebuild the models, run create.py in the model directory. Make sure that the required libraries from requirements.txt are installed on your system.
