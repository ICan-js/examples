/**
 * Script para ajuste da calibração da ferramenta de controle do mouse através
 * de gestos com a cabeça 
 */

Swal.fire({
    title: "Sobre a calibração",
    text: "Nesta parte você deverá apontar seu nariz para cada um dos pontos e ao mesmo tempo clicar com o mouse sobre o ponto ao qual você está mirando o nariz"
});

(function() {
    let pointsInStore = 0;
    const calibrationOptions = {
        pointSize: 25,
        pointsToStorage: 5
    };
    
    // Configurando a barra de progresso
    const progressBar = document.getElementById("progress-bar");
    progressBar.max = ((calibrationOptions.pointsToStorage + 1) * 9) / 2;
    progressBar.value = 0;
    
    const finishFunction = (model) => {
        // Salvando o modelo treinado na memória
        // Neste caso isto foi feito para que as outras páginas possam utilizar estes pesos
        // OBS: o método exportRegressionWeights foi utilizado para simplificar o modelo gravado na memória
        // já que este contém apenas os valores utilizados no modelo de regressão
        sessionStorage.setItem("regressionModelICJS", JSON.stringify(model.exportRegressionWeights()));

        Swal.fire({
            text: "A calibração foi finalizada com sucesso!",
            imageUrl: 'static/assets/mushroom_green.gif',
            imageHeight: 200,
            imageAlt: 'Imagem feliz =)',
            showCancelButton: true,
            confirmButtonColor: '#0089F1',
            cancelButtonColor: '#DF0128',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Recalibrar'
          }).then((result) => {
            if (result.value) {
                document.location.href = "./examples.html";
            } else {
                location.reload();
            }
          });
    };
    
    const updateFunction = (update) => {
        pointsInStore += 1;
        progressBar.value = (calibrationOptions.pointsToStorage) * (pointsInStore / 10);
    };
    
    // Cria o modelo de regressão e inicia o processo de calibração do mesmo
    const regressionModel = new icjs.core.LinearRegression();
    icjs.common.calibrate(regressionModel, finishFunction, updateFunction, calibrationOptions);
})();
