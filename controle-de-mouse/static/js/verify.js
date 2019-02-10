/**
 * Script para verificar se o modelo de regressão já foi calibrado, caso não tenha sido
 * direciona o usuário para a página de calibração
 */

function verifyRegressionWeights() {
    const regressionWeights = sessionStorage.getItem("regressionModelICJS");

    if (regressionWeights === null) {
        Swal.fire({
            text: "Você não está calibrado ainda! Ir para a página de calibração ?",
            imageUrl: 'static/assets/boo.gif',
            imageHeight: 200,
            imageAlt: 'Imagem triste =(',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: "Vou depois"
        }).then((result) => {
            if (result.value) {
                window.location = "calibration.html"
            } else {
                Swal.fire({
                    title: "Beleza",
                    text: "Mas lembre-se que, para utilizar os exemplos será necessário calibrar"
                });
            }
        });
    }
}
