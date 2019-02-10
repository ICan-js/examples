/**
 * Script para demonstrar o uso das funções de scroller de página do ICan.js
 */

// Recupera os pesos já treinados
const regressionWeights = sessionStorage.getItem("regressionModelICJS");

if (regressionWeights !== null) {
    // Caso exista cria um modelo de regressão linear 
    const parse = JSON.parse(regressionWeights);
    const regressionModel = new icjs.core.LinearRegression(parse);

    // Inicia o screenScroller
    icjs.common.screenScroller(regressionModel);
} else {
    verifyRegressionWeights();
}
