from flask import Flask, request, jsonify
from flask_cors import CORS
import math

app = Flask(__name__)
CORS(app)

# Graph representation
class Graph:
    def __init__(self):
        self.graph = {}
        self.distances = {}
        self.previous = {}

    def add_edge(self, from_node, to_node, distance):
        if from_node not in self.graph:
            self.graph[from_node] = {}
        if to_node not in self.graph:
            self.graph[to_node] = {}
        
        self.graph[from_node][to_node] = distance
        self.graph[to_node][from_node] = distance

    def dijkstra(self, start, end):
        # Initialize distances
        self.distances = {node: float('infinity') for node in self.graph}
        self.previous = {node: None for node in self.graph}
        self.distances[start] = 0

        unvisited = set(self.graph.keys())
        
        while unvisited:
            # Find node with smallest distance
            current = min(unvisited, key=lambda node: self.distances[node])
            
            if current == end or self.distances[current] == float('infinity'):
                break
                
            unvisited.remove(current)
            
            # Update distances to neighbors
            for neighbor, distance in self.graph[current].items():
                if neighbor in unvisited:
                    new_distance = self.distances[current] + distance
                    if new_distance < self.distances[neighbor]:
                        self.distances[neighbor] = new_distance
                        self.previous[neighbor] = current
        
        # Reconstruct path
        path = []
        current = end
        while current is not None:
            path.insert(0, current)
            current = self.previous[current]
            
        return path, self.distances[end]

# Initialize graph with connections
def initialize_graph():
    graph = Graph()
    
    # Add connections from the original JavaScript file
    connections = [
        ['p1', 'p2'],
        ['p2', 'p3'],
        ['p3', 'p4'],
        ["UbuntuLab", "p1"],
        ['p4', 'p5'],
        ['p5', 'p6'],
        ['p6', 'p7'],
        ['p7', 'p8'],
        ['p8', 'p9'],
        ['p9', 'p10'],
        ['p10', 'p11'],
        ['p11', 'p12'],
        ['p12', 'p13'],
        ['p13', 'p14'],
        ['p14', 'p15'],
        ['p15', 'p16'],
        ['p16', 'p17'],
        ['p17', 'p18'],
        ['p18', 'p19'],
        ['p19', 'p20'],
        ['p21', 'p22'],
        ['p21', 'p1'],
        ['p22', 'p23'],
        ['p23', 'p24'],
        ['p24', 'p25'],
        ['p25', 'p26'],
        ['p26', 'p27'],
        ['p27', 'p28'],
        ['p28', 'p29'],
        ['p29', 'p20'],
        ['p36', 'p37'],
        ['p37', 'p38'],
        ['p10', 'p38'],
        ['p11', 'p38'],
        ['p39', 'p36'],
        ['p39', 'p40'],
        ['p40', 'p41'],
        ['p41', 'p42'],
        ['p42', 'p43'],
        ['p43', 'p44'],
        ['p44', 'p45'],
        ['p45', 'p46'],
        ['p46', 'p47'],
        ['p47', 'p48'],
        ['p48', 'p49'],
        ['p49', 'p50'],
        ['p50', 'p51'],
        ['p51', 'p52'],
        ['p52', 'p53'],
        ['p53', 'p54'],
        ['p54', 'p55'],
        ['p55', 'p56'],
        ['p56', 'p57'],
        ['p36', 'p57'],
        ['SeminarHall', 'p8'],
        ['Library', 'p20'],
        ['ConferenceRoom', 'p13'],
        ['Lift', 'p36'],
        ['Lift', 'p39'],
        ['Lift', 'p57'],
        ['CR103', 'p47'],
        ['CR102', 'p44'],
        ['CR104', 'p51'],
        ['Lab8', 'p54'],
        ['Lab1', 'p41']
    ]

    # Add edges with calculated distances
    for from_node, to_node in connections:
        # For simplicity, using a default distance of 1
        # In a real implementation, you would calculate actual distances
        graph.add_edge(from_node, to_node, 1)

    return graph

graph = initialize_graph()

@app.route('/find_path', methods=['POST'])
def find_path():
    data = request.get_json()
    start = data.get('start')
    end = data.get('end')
    
    if not start or not end:
        return jsonify({'error': 'Start and end points are required'}), 400
    
    try:
        path, distance = graph.dijkstra(start, end)
        return jsonify({
            'path': path,
            'distance': distance,
            'estimated_time': math.ceil(distance / 50)  # Assuming 50 units = 1 minute
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 