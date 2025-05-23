const connections = [
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
];

const svg = document.querySelector('.connection-lines');

function getCenterPosition(el) {
    const rect = el.getBoundingClientRect();
    const parentRect = el.offsetParent.getBoundingClientRect();
    return {
        x: rect.left - parentRect.left + rect.width / 2,
        y: rect.top - parentRect.top + rect.height / 2
    };
}

connections.forEach(([fromId, toId]) => {
    const fromEl = document.getElementById(fromId);
    const toEl = document.getElementById(toId);
    if (fromEl && toEl) {
        const fromPos = getCenterPosition(fromEl);
        const toPos = getCenterPosition(toEl);

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", fromPos.x);
        line.setAttribute("y1", fromPos.y);
        line.setAttribute("x2", toPos.x);
        line.setAttribute("y2", toPos.y);
        line.setAttribute("stroke", "#333");
        line.setAttribute("stroke-width", "2");

        svg.appendChild(line);
    }
});

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function loadFloor(floorFile) {
    window.location.href = floorFile;
    document.getElementById("myDropdown").classList.remove("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function highlightPath(path) {
    document.querySelectorAll('.node').forEach(node => {
        node.classList.remove('highlight', 'start', 'end');
    });
    document.querySelectorAll('.connection-lines line').forEach(line => {
        line.classList.remove('highlight');
    });
    
    path.forEach((nodeId, index) => {
        const node = document.getElementById(nodeId);
        if (node) {
            node.classList.add('highlight');
            if (index === 0) {
                node.classList.add('start');
            } else if (index === path.length - 1) {
                node.classList.add('end');
            }
        }
    });
    
    for (let i = 0; i < path.length - 1; i++) {
        const fromId = path[i];
        const toId = path[i + 1];
        
        document.querySelectorAll('.connection-lines line').forEach(line => {
            const fromEl = document.getElementById(fromId);
            const toEl = document.getElementById(toId);
            if (fromEl && toEl) {
                const fromPos = getCenterPosition(fromEl);
                const toPos = getCenterPosition(toEl);
                
                if (
                    (Math.abs(line.getAttribute('x1') - fromPos.x) < 1 && 
                     Math.abs(line.getAttribute('y1') - fromPos.y) < 1 &&
                     Math.abs(line.getAttribute('x2') - toPos.x) < 1 && 
                     Math.abs(line.getAttribute('y2') - toPos.y) < 1) ||
                    (Math.abs(line.getAttribute('x1') - toPos.x) < 1 && 
                     Math.abs(line.getAttribute('y1') - toPos.y) < 1 &&
                     Math.abs(line.getAttribute('x2') - fromPos.x) < 1 && 
                     Math.abs(line.getAttribute('y2') - fromPos.y) < 1)
                ) {
                    line.classList.add('highlight');
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const findPathBtn = document.getElementById('findPathBtn');
    if (findPathBtn) {
        findPathBtn.addEventListener('click', async () => {
            const start = document.getElementById('startLocation').value;
            const end = document.getElementById('endLocation').value;
            
            if (start && end) {
                try {
                    const response = await fetch('http://localhost:5000/find_path', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ start, end })
                    });
                    
                    const data = await response.json();
                    
                    if (response.ok) {
                        highlightPath(data.path);
                        
                        document.getElementById('distance').textContent = Math.round(data.distance);
                        document.getElementById('time').textContent = data.estimated_time;
                        
                        const startNode = document.getElementById(data.path[0]);
                        const endNode = document.getElementById(data.path[data.path.length - 1]);
                        const startName = startNode ? startNode.getAttribute('title') : data.path[0];
                        const endName = endNode ? endNode.getAttribute('title') : data.path[data.path.length - 1];
                        
                        const instructions = document.getElementById('pathInstructions');
                        instructions.innerHTML = `
                            <h3><i class="fas fa-directions"></i> Path Instructions</h3>
                            <p>Starting from ${startName}, follow the highlighted path.</p>
                            <p>Total Steps: ${data.path.length - 1}</p>
                            <p>You have reached your destination: ${endName}</p>
                        `;
                    } else {
                        alert('Error: ' + data.error);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Failed to find path. Please try again.');
                }
            } else {
                alert('Please select both start and destination locations');
            }
        });
    }
});