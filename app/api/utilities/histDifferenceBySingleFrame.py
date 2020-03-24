import numpy as np
import app.api.utilities.transitionDetector as detector

# Read each frame column-by-bolumn to generate an STI
def readColumns(video):
    j = 0
    # Iterate through each frame to generate the STI
    while(video.isOpened()):
        ret, frame = video.read()
        if(ret is False): 
            break  # End of video

        if(j == 0):  
            STI = generateSTImgColumn(frame)
        else:
            col = generateSTImgColumn(frame)
            STI = np.c_[STI, col]
        j += 1
    return STI


# Process a frame and generate a column of the Spatio-Temporal Image
# STIcol is filled top to bottom
def generateSTImgColumn(frame):
    frame = cv2.resize(frame, (32, 32))  # Resize to 32 cols x 32 rows
    STIcol = np.zeros((31, 1))  # Col size is one less than frame's
    for j in range(32):
        if(j == 0):
            Hold = detector.makeLuminenceHistogram(frame[:, j])
        elif(j == 1):
            Hnew = detector.makeLuminenceHistogram(frame[:, j])
            STIcol[j-1, :] = detector.makeLuminenceHistogram(Hold, Hnew)
        else:
            Hold = Hnew
            Hnew = detector.makeLuminenceHistogram(frame[:, j])
            STIcol[j-1, :] = detector.makeLuminenceHistogram(Hold, Hnew)
    return STIcol