

# Step 1: Create a virtual environment
python3 -m venv myenv

# Step 2: Activate the virtual environment
# On Windows
myenv\Scripts\activate

# On macOS and Linux
source myenv/bin/activate

# Step 3: Install required packages using requirements.txt
pip install -r requirements.txt

# Step 4: Save the Python script and run it
# Create a file named extract_certificates.py and paste the provided script
python extract_certificates.py
