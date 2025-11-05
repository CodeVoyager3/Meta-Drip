import cv2
import mediapipe as mp
import os
from flask import Flask, Response
from flask_cors import CORS # Import CORS to allow connection from the React frontend

# --- Flask & CORS Setup ---
app = Flask(__name__)
CORS(app) # Enable CORS for frontend communication

# --- MediaPipe & OpenCV Initialization (User's code adapted) ---
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh()
# Load the glasses image with transparency (IMREAD_UNCHANGED)
try:
    eyeglass = cv2.imread(os.path.join('.', 'glass.png'), cv2.IMREAD_UNCHANGED)
    if eyeglass is None:
        raise FileNotFoundError("glass.png not found.")
except FileNotFoundError as e:
    print(f"Error: {e}")
    # Create a dummy image if the real one isn't found
    eyeglass = cv2.putText(
        img=cv2.imread(os.path.join('.', 'placeholder.jpg')) or cv2.inread(os.path.join('.', 'glasses-1.png')), 
        text="GLASS.PNG NOT FOUND",
        org=(50, 50),
        fontFace=cv2.FONT_HERSHEY_SIMPLEX,
        fontScale=1,
        color=(0, 0, 255),
        thickness=2
    )

def overlay_filter(frame, filter_img, left_eye, right_eye):
    # Your core logic, adapted for continuous streaming
    mid_eye = ((left_eye[0] + right_eye[0]) // 2, (left_eye[1] + right_eye[1]) // 2)
    
    # Scale calculation for glasses (2.0x eye distance)
    eye_distance = abs(right_eye[0] - left_eye[0])
    filter_width = int(2.0 * eye_distance)
    filter_height = int(filter_width * filter_img.shape[0] / filter_img.shape[1])

    # Ensure min size to avoid errors
    if filter_width <= 0 or filter_height <= 0:
        return frame
        
    filter_resized = cv2.resize(filter_img, (filter_width, filter_height), interpolation=cv2.INTER_LINEAR)

    # Calculate overlay coordinates (offset for glasses placement)
    x1 = mid_eye[0] - filter_width // 2
    y1 = mid_eye[1] - filter_height // 2 # Positioned at eye level
    
    # Handle bounds to prevent drawing outside the frame
    x2 = x1 + filter_width
    y2 = y1 + filter_height

    # Crop filter image if out of bounds (simplified check for overlay)
    
    if x1 >= 0 and y1 >= 0 and x2 <= frame.shape[1] and y2 <= frame.shape[0]:
        alpha_filter = filter_resized[:, :, 3] / 255.0
        alpha_frame = 1.0 - alpha_filter

        for c in range(0, 3):
            # Blend the filter and frame using the alpha channel
            frame[y1:y2, x1:x2, c] = (alpha_filter * filter_resized[:, :, c] + alpha_frame * frame[y1:y2, x1:x2, c])
    
    return frame

# --- MJPEG Frame Generator ---
def gen_frames():
    # Use 0 for default webcam, or 1/2/... if 0 is occupied.
    camera = cv2.VideoCapture(0) 

    while True:
        success, frame = camera.read()
        if not success:
            print("Cannot access camera.")
            break
        
        # Mirror the video (standard for selfie mode)
        frame = cv2.flip(frame, 1)

        # Process frame with MediaPipe
        img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        result = face_mesh.process(img_rgb)

        if result.multi_face_landmarks:
            for face_landmarks in result.multi_face_landmarks:
                h, w, c = frame.shape
                
                # Get the eye landmarks (33 and 263 are inner eye corners)
                left_eye = (int(face_landmarks.landmark[33].x * w), int(face_landmarks.landmark[33].y * h))
                right_eye = (int(face_landmarks.landmark[263].x * w), int(face_landmarks.landmark[263].y * h))
                
                # Apply the filter overlay
                frame = overlay_filter(frame, eyeglass, left_eye, right_eye)

        # Encode the frame as JPEG
        ret, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()

        # Yield the frame in multipart format for streaming
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

# --- Flask Routes ---

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), 
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/')
def index():
    return "Python Virtual Try-On Server is running. Access /video_feed from your React app."

if __name__ == '__main__':
    # Run the server on port 5000 (accessible from the React app)
    app.run(host='0.0.0.0', port=5000, debug=True, threaded=True)