import zipfile
import json

keras_path = 'backend/plant_disease_model_package/final_plant_disease_model.keras'
with zipfile.ZipFile(keras_path, 'r') as z:
    cfg = json.loads(z.read('config.json').decode('utf-8'))

layers = cfg['config']['layers']

# Check data_augmentation layers
for l in layers:
    if l['name'] == 'data_augmentation':
        print("data_augmentation config:")
        sub_layers = l.get('config', {}).get('layers', [])
        for sl in sub_layers:
            print("  sub-layer:", sl.get('class_name'), sl.get('name'), sl.get('config'))
    if 'mobilenet' in l['name']:
        print("mobilenet layers count:", len(l.get('config', {}).get('layers', [])))
        # Check first 5 layers of mobilenet
        for ml in l.get('config', {}).get('layers', [])[:5]:
            print("  mobilenet sub-layer:", ml.get('class_name'), ml.get('name'), ml.get('config'))

if 'compile_config' in cfg:
    print("Compile config:", cfg['compile_config'])
