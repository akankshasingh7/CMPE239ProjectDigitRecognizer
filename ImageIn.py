import json
import pandas as pd
import math
import PIL
from PIL import Image
with open('linearsvc_model.json') as data_file:    
    data = json.load(data_file)

def predict_prob(x):
    prob = [0.]*10
    for digit in ["0","1","2","3","4","5","6","7","8","9"]:
        params = data["coeff"][digit]
        k = int(digit) 
        dp=0
        for i in params:
            ii = int(i)
            dp = dp +  params[i]*(2*x[ii]/255.0-1.0)
        dp = dp + data["intercept"][k]    
        prob[k] = 1.0/(1.0+math.exp(-1.*dp))
    
    return prob
def ImageConv(filepath):
    
    basewidth = 28
    hsize = 28
    image_file = Image.open(filepath)
    image_file= image_file.convert('L') # convert image to monochrome - this works
    image_file = image_file.resize((basewidth,hsize), PIL.Image.ANTIALIAS)
    pix_val = list(image_file.getdata())
    #pix_val = image_file.getdata()
    #pix_val_flat = [x for sets in pix_val for x in sets]
    #print (pix_val)
    return pix_val
	
x = ImageConv()
print len(x)
print predict_prob(x)  
