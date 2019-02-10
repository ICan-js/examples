/**
 * Script para utilizar os elementos CORE do ICan.js para criar uma página que permite desenhar na página
 * através de gestos com a cabeça
 */

let mousePositionA = null; // Atual
let mousePositionB = null; // Anterior

function setup() {
    // Removendo canvas extra
    let canvasZero = document.getElementById("defaultCanvas0");
    canvasZero.parentNode.removeChild(canvasZero);

    createCanvas(windowWidth, windowHeight);

    const regressionWeights = sessionStorage.getItem("regressionModelICJS");

    if (regressionWeights !== null) {
        const parse = JSON.parse(regressionWeights);
        const regressionModel = new icjs.core.LinearRegression(parse);
    
        // Cria elementos de vídeo
        const videoCapture = icjs.utils.setupVideo();
    
        // Cria instância da rede neural
        const posenet = new icjs.core.PoseNet(videoCapture);
        posenet.on("poses", (poses) => {
            // Inferência da posição atual do mouse
            mousePositionA = regressionModel.inferMousePosition(poses.keypoints[0]);
        });
        posenet.trackSingleUser();
    } else {
        verifyRegressionWeights();
    }
}

function draw() {
    if (mousePositionA !== null && mousePositionB !== null) {
        line(mousePositionA.x, mousePositionA.y, mousePositionB.x, mousePositionB.y);
    }
    mousePositionB = mousePositionA;
}
