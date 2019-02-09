/**
 * Script para ajuste da calibração da ferramenta de controle do mouse através
 * de gestos com a cabeça 
 */

(function() {
    let pointsInStore = 0;
    const calibrationOptions = {
        pointSize: 25,
        pointsToStorage: 10
    };
    
    // Configurando a barra de progresso
    const progressBar = document.getElementById("progress-bar");
    progressBar.max = ((calibrationOptions.pointsToStorage + 1) * 9) / 2;
    progressBar.value = 0;
    
    const finishFunction = (model) => {
        // Salvando o modelo treinado na memória
        sessionStorage.setItem("regressionModelICJS", JSON.stringify(model));

    };
    
    const updateFunction = (update) => {
        pointsInStore += 1;
 
        progressBar.value = (calibrationOptions.pointsToStorage) * (pointsInStore / 20);
    };
    
    const regressionModel = new icjs.core.LinearRegression();
    icjs.common.calibrate(regressionModel, finishFunction, updateFunction, calibrationOptions);
})();
