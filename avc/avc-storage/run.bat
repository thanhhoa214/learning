#Unzip
tar -xf traindata.zip
cd labels && move *.txt ..\imgs && cd ..

D:
cd D:\Docker\AVC-EdgeTPU-Compiler\edgetpu-compiler\x64\data
rmdir /Q /S imgs

move %CI_BUILDS_DIR%/imgs imgs
cd ..
call conda activate yolo2keras_env

#Create_train_test_file
python create_train_test.py -tp 0.2
#get_applying_id
for /F %I in ('curl https://avc-api.azurewebsites.net/api/model/applyingid') do set APPLYING_ID=%I

#Train_model
copy D:\Docker\AVC-EdgeTPU-Compiler\edgetpu-compiler\models\%APPLYING_ID%.weights .
darknet detector train data/custom.data coco-tiny-v3-relu.cfg %APPLYING_ID%.weights -map -clear

cd ..
move x64\backup\coco-tiny-v3-relu_best.weights models\%CI_COMMIT_BRANCH%.weights
cd keras-yolo3
python convert.py coco-tiny-v3-relu.cfg ..\models\%CI_COMMIT_BRANCH%.weights avc.h5

call conda deactivate

call conda activate tflite_env
#Convert_tflite
python keras_to_tflite_quant.py avc.h5 ..\avc_model.tflite

call conda deactivate

cd ..
docker run -it --rm -v %cd%:/home/edgetpu edgetpu-compiler-avc edgetpu_compiler avc_model.tflite
move avc_model_edgetpu.tflite %CI_BUILDS_DIR%\%CI_COMMIT_BRANCH%.tflite

del avc_model.tflite








