# CampusWayFinder

A web-based application that helps users navigate through different floors of a campus building using an interactive map interface.

## Features

- Interactive floor maps for multiple levels (Ground to 5th floor)
- Real-time navigation assistance
- Responsive design for various screen sizes
- Easy-to-use interface for finding locations
- Visual representation of campus layout

## Tech Stack

- **Backend**: Python with Flask
- **Frontend**: HTML, CSS, JavaScript
- **Dependencies**:
  - Flask 2.0.1
  - Flask-CORS 3.0.10
  - Werkzeug 2.0.3

## Project Structure

```
CampusWayFinder/
├── app.py              # Main Flask application
├── script.js           # Frontend JavaScript logic
├── style.css           # Styling and layout
├── requirements.txt    # Python dependencies
├── map.png            # Campus map image
├── floor0.html        # Ground floor interface
├── floor1.html        # First floor interface
├── floor2.html        # Second floor interface
├── floor3.html        # Third floor interface
├── floor4.html        # Fourth floor interface
└── floor5.html        # Fifth floor interface
```

## Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd CampusWayFinder
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   # On Windows
   .venv\Scripts\activate
   # On Unix or MacOS
   source .venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application

1. Start the Flask server:
   ```bash
   python app.py
   ```

2. Open your web browser and navigate to:
   ```
   http://localhost:5000
   ```

## Usage

1. Select the desired floor from the navigation menu
2. Use the interactive map to locate specific areas
3. Follow the visual cues for navigation assistance

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any queries or support, please open an issue in the repository. 