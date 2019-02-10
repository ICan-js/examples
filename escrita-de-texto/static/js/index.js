/**
 * Script para configuração da tradução de gestos de Libras em texto
 */

(function() {
    let selectConcat = "Exclusiva";
    const videoCapture = icjs.utils.setupVideo(224, 224, false);
    const textArea = document.getElementById("textarea");
    textArea.value = "";
    
    // Configurando a forma de concatenação
    const select = document.getElementById("select-opt");
    select.onchange = () => {
        selectConcat = select.value;

        // Reinicia as predições
        textArea.value = "";
    };
    
    icjs.common.librasWriter(videoCapture, 1, 2, (gesture) => {
        // verifica qual formato de concatenação e insere a predição
        if (selectConcat === "Exclusiva") {
            textArea.value = gesture;
        } else if (selectConcat === "Continua") {
            textArea.value += `${gesture} `;
        }        
    });
})();
