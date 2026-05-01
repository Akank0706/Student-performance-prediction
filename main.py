import subprocess
import sys

import os

def run_script(script_path):
    print(f"\n--- Running {script_path} ---")
    # Set PYTHONPATH to include the root directory
    env = os.environ.copy()
    env["PYTHONPATH"] = "."
    result = subprocess.run([sys.executable, script_path], capture_output=False, env=env)
    if result.returncode != 0:
        print(f"Error: {script_path} failed.")
        sys.exit(1)

def main():
    # 1. Generate synthetic data
    run_script("src/generate_data.py")
    
    # 2. Train the model
    # Note: src/train.py requires PYTHONPATH="." or src/__init__.py
    # We already have src/__init__.py and we are running from root
    run_script("src/train.py")
    
    # 3. Perform EDA and evaluations
    run_script("notebooks/02_eda.py")
    run_script("src/evaluate.py")
    
    print("\nProject pipeline completed successfully.")
    print("Run 'npm run dev' to start the dashboard.")

if __name__ == "__main__":
    main()
