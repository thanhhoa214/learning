import requests
import argparse

parser = argparse.ArgumentParser(description='Send file to server.')
parser.add_argument('id', type=int, default=0, help='CI_COMMIT_BRANCH will be used here.')
args = parser.parse_args()

print("CI_COMMIT_BRANCH = " + str(args.id))

url = "https://avc-api.azurewebsites.net/api/model/"+str(args.id)+"/succession"
files = {'modelFile': open(str(args.id) + '.tflite', 'rb'), 'statisticFile': open('chart.png', 'rb')}

requests.post(url, files=files)
