import os
import zipfile
import torch

folder_path = r"D:\Final_project\GreenGram_MobileNetV3_Large_best.pth\GreenGram_MobileNetV3_Large_best"
zip_path = r"D:\Final_project\GreenGram_MobileNetV3_model.pth"

print(f"Creating PyTorch zip archive with 'archive/' prefix from {folder_path} -> {zip_path}...")

with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_STORED) as zipf:
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, folder_path)
            # PyTorch expects all archive items under a subdirectory e.g. archive/filename
            archive_path = os.path.join("archive", rel_path).replace("\\", "/")
            zipf.write(full_path, archive_path)

print(f"Zip created! Size: {os.path.getsize(zip_path)} bytes")

print("Testing torch.load on newly created zip model file...")
try:
    checkpoint = torch.load(zip_path, map_location='cpu', weights_only=False)
    print("SUCCESS! PyTorch model loaded cleanly from zipped .pth file!")
    print("Checkpoint type:", type(checkpoint))
    if isinstance(checkpoint, dict):
        print("Keys:", list(checkpoint.keys()))
        if 'state_dict' in checkpoint:
            print("State dict keys:", len(checkpoint['state_dict']))
        else:
            print("Dict sample keys:", list(checkpoint.keys())[:5])
    else:
        print("Loaded model class name:", type(checkpoint).__name__)
except Exception as e:
    print(f"Zip load error: {e}")
