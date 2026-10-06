import os
import torch

path1 = r"D:\Final_project\GreenGram_MobileNetV3_Large_best.pth\GreenGram_MobileNetV3_Large_best"
path2 = r"D:\Final_project\GreenGram_MobileNetV3_Large_best.pth\GreenGram_MobileNetV3_Large_best\data.pkl"

for p in [path1, path2]:
    print(f"Testing torch.load on: {p}")
    try:
        data = torch.load(p, map_location='cpu', weights_only=False)
        print(f"SUCCESS loading {p}! Data type: {type(data)}")
        if isinstance(data, dict):
            print("Dict keys:", list(data.keys())[:10])
    except Exception as e:
        print(f"Failed loading {p}: {e}")
