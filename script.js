const unidades = {
    comprimento: ["Metros (m)", "Milímetros (mm)", "Pés (ft)", "Centímetros (cm)", "Polegadas (in)"],
    temperatura: ["Celsius (ºC)", "Fahrenheit (ºF)", "Kelvins (K)"],
    energia: ["Joules (J)", "Calorias (cal)", "Quilojoules (kJ)", "Quilocalorias (kcal)", "Quilowatts hora (kWh)"],
    volume: ["Litros (l)", "Metros Cúbicos (m³)", "Milímetros Cúbicos (mm³)", "Galões (g)"],
    velocidade: ["Metros por Segundo (m/s)", "Quilômetros por Hora (km/h)", "Milímetros por Segundo (mm/s)"],
    aceleracao: ["Metros por Segundo ao Quadrado (m/s²)", "Pés por Segundo ao Quadrado (ft/s²)"],
    densidade: ["Quilogramas por Metro Cúbico (kg/m³)", "Gramas por Centímetro Cúbico (g/cm³)", "Libras por Polegada Cúbica (lb/in³)"],
    tempo: ["Segundos (s)", "Minutos (min)", "Horas (h)", "Dias (dias)"],
    massa: ["Gramas (g)", "Quilogramas (kg)", "Toneladas (t)", "Libras (lb)"],
    area: ["Metros Quadrados (m²)", "Pés Quadrados (ft²)", "Polegadas Quadradas (in²)"],
    forca: ["Newton (N)", "Quilograma Força (kgf)", "Libra Força (lbf)"],
    vazaoVolumetrica: ["Metros Cúbicos por Segundo (m³/s)", "Metros Cúbicos por Hora (m³/h)", "Litros por Minuto (l/min)", "Galões por Minuto (gpm)"],
    vazaoMassica: ["Quilogramas por Hora (kg/h)", "Quilogramas por Segundo (kg/s)", "Libras por Segundo (lb/s)"],
    viscosidade: ["Centipoise (cP)", "Pascal Segundo (PaS)"],
    pressao: ["Pascals (Pa)", "Bar (bar)", "Libras por Polegada Quadrada (psi)", "QuiloPascal (kPa)", "Metros de Coluna d'Água (mca)"],
    calorEspecifico: ["Joules por Quilograma e por Kelvin (J/kg.K)", "Calorias por Grama e Grau Celsius (Cal/g.ºC)"],
    potencia: ["Horse Power (hp)", "Cavalo Vapor (cv)", "Watt (W)", "Quilowatt (kW)"]
};

document.getElementById('grandeza').addEventListener('change', function () {
    const grandeza = this.value;
    const unidadeSelect = document.getElementById('unidade');
    const conversaoInputs = document.getElementById('conversaoInputs');

    unidadeSelect.innerHTML = '';

    document.getElementById('valor').value = '';
    document.getElementById('resultado').innerHTML = '';

    if (grandeza) {
        const unidadesOptions = unidades[grandeza];

        unidadesOptions.forEach(unit => {
            const option = document.createElement('option');
            option.value = unit;
            option.textContent = unit;
            unidadeSelect.appendChild(option);
        });

        conversaoInputs.style.display = 'block';
    } else {
        conversaoInputs.style.display = 'none';
    }
});

document.getElementById('unidade').addEventListener('change', function () {
    document.getElementById('valor').value = '';
    document.getElementById('resultado').innerHTML = '';
});

function realizarConversao() {
    const valor = parseFloat(document.getElementById('valor').value);
    const grandeza = document.getElementById('grandeza').value;
    const unidade = document.getElementById('unidade').value;

    if (isNaN(valor)) {
        alert('Por favor, insira um valor válido');
        return;
    }

    const resultadoDiv = document.getElementById('resultado');
    let resultadoHTML = `<h2>Resultados para ${grandeza}:</h2>`;

    const unidadesOptions = unidades[grandeza];

    unidadesOptions.forEach(unit => {
        if (unit !== unidade) {
            let resultado;
            switch (grandeza) {
                case 'comprimento':
                    resultado = converterComprimento(valor, unidade, unit);
                    break;
                case 'temperatura':
                    resultado = converterTemperatura(valor, unidade, unit);
                    break;
                case 'energia':
                    resultado = converterEnergia(valor, unidade, unit);
                    break;
                case 'volume':
                    resultado = converterVolume(valor, unidade, unit);
                    break;
                case 'velocidade':
                    resultado = converterVelocidade(valor, unidade, unit);
                    break;
                case 'aceleracao':
                    resultado = converterAceleracao(valor, unidade, unit);
                    break;
                case 'densidade':
                    resultado = converterDensidade(valor, unidade, unit);
                    break;
                case 'tempo':
                    resultado = converterTempo(valor, unidade, unit);
                    break;
                case 'massa':
                    resultado = converterMassa(valor, unidade, unit);
                    break;
                case 'area':
                    resultado = converterArea(valor, unidade, unit);
                    break;
                case 'forca':
                    resultado = converterForca(valor, unidade, unit);
                    break;
                case 'vazaoVolumetrica':
                    resultado = converterVazaoVolumetrica(valor, unidade, unit);
                    break;
                case 'vazaoMassica':
                    resultado = converterVazaoMassica(valor, unidade, unit);
                    break;
                case 'viscosidade':
                    resultado = converterViscosidade(valor, unidade, unit);
                    break;
                case 'pressao':
                    resultado = converterPressao(valor, unidade, unit);
                    break;
                case 'calorEspecifico':
                    resultado = converterCalorEspecifico(valor, unidade, unit);
                    break;
                case 'potencia':
                    resultado = converterPotencia(valor, unidade, unit);
                    break;
                default:
                    resultado = 'Conversão não disponível';
            }
            resultadoHTML += `<p>${valor} ${unidade} = ${resultado} ${unit}</p>`;
        }
    });

    resultadoDiv.innerHTML = resultadoHTML;
}

// Funções de conversão para todas as grandezas

function converterComprimento(valor, unidadeOrigem, unidadeDestino) {
    const conversoes = {
        "Metros (m)": { "Milímetros (mm)": valor * 1000, "Pés (ft)": valor * 3.28084, "Centímetros (cm)": valor * 100, "Polegadas (in)": valor * 39.3701 },
        "Milímetros (mm)": { "Metros (m)": valor / 1000, "Pés (ft)": valor / 304.8, "Centímetros (cm)": valor / 10, "Polegadas (in)": valor / 25.4 },
        "Pés (ft)": { "Metros (m)": valor / 3.28084, "Milímetros (mm)": valor * 304.8, "Centímetros (cm)": valor * 30.48, "Polegadas (in)": valor * 12 },
        "Centímetros (cm)": { "Metros (m)": valor / 100, "Milímetros (mm)": valor * 10, "Pés (ft)": valor / 30.48, "Polegadas (in)": valor / 2.54 },
        "Polegadas (in)": { "Metros (m)": valor / 39.3701, "Milímetros (mm)": valor * 25.4, "Pés (ft)": valor / 12, "Centímetros (cm)": valor * 2.54 }
    };
    return conversoes[unidadeOrigem][unidadeDestino] || valor;
}

function converterTemperatura(valor, unidadeOrigem, unidadeDestino) {
    if (unidadeOrigem === "Celsius (ºC)") {
        if (unidadeDestino === "Fahrenheit (ºF)") {
            return (valor * 9/5) + 32;
        } else if (unidadeDestino === "Kelvins (K)") {
            return valor + 273.15;
        }
    } else if (unidadeOrigem === "Fahrenheit (ºF)") {
        if (unidadeDestino === "Celsius (ºC)") {
            return (valor - 32) * 5/9;
        } else if (unidadeDestino === "Kelvins (K)") {
            return ((valor - 32) * 5/9) + 273.15;
        }
    } else if (unidadeOrigem === "Kelvins (K)") {
        if (unidadeDestino === "Celsius (ºC)") {
            return valor - 273.15;
        } else if (unidadeDestino === "Fahrenheit (ºF)") {
            return ((valor - 273.15) * 9/5) + 32;
        }
    }
    return valor;
}

function converterEnergia(valor, unidadeOrigem, unidadeDestino) {
    const conversoes = {
        "Joules (J)": { "Calorias (cal)": valor / 4.184, "Quilojoules (kJ)": valor / 1000, "Quilocalorias (kcal)": valor / 4184, "Quilowatts hora (kWh)": valor / 3600000 },
        "Calorias (cal)": { "Joules (J)": valor * 4.184, "Quilojoules (kJ)": valor / 4184, "Quilocalorias (kcal)": valor / 1000, "Quilowatts hora (kWh)": valor / 859845 },
        "Quilojoules (kJ)": { "Joules (J)": valor * 1000, "Calorias (cal)": valor * 4184, "Quilocalorias (kcal)": valor / 4.184, "Quilowatts hora (kWh)": valor / 3600 },
        "Quilocalorias (kcal)": { "Joules (J)": valor * 4184, "Calorias (cal)": valor * 1000, "Quilojoules (kJ)": valor * 4.184, "Quilowatts hora (kWh)": valor / 860 },
        "Quilowatts hora (kWh)": { "Joules (J)": valor * 3600000, "Calorias (cal)": valor * 859845, "Quilojoules (kJ)": valor * 3600, "Quilocalorias (kcal)": valor * 860 }
    };
    return conversoes[unidadeOrigem][unidadeDestino] || valor;
}

function converterVolume(valor, unidadeOrigem, unidadeDestino) {
    const conversoes = {
        "Litros (l)": { "Metros Cúbicos (m³)": valor / 1000, "Milímetros Cúbicos (mm³)": valor * 1000000, "Galões (g)": valor / 3.785 },
        "Metros Cúbicos (m³)": { "Litros (l)": valor * 1000, "Milímetros Cúbicos (mm³)": valor * 1000000000, "Galões (g)": valor * 264.172 },
        "Milímetros Cúbicos (mm³)": { "Litros (l)": valor / 1000000, "Metros Cúbicos (m³)": valor / 1000000000, "Galões (g)": valor / 3785.41 },
        "Galões (g)": { "Litros (l)": valor * 3.785, "Metros Cúbicos (m³)": valor / 264.172, "Milímetros Cúbicos (mm³)": valor * 3785410 }
    };
    return conversoes[unidadeOrigem][unidadeDestino] || valor;
}

function converterVelocidade(valor, unidadeOrigem, unidadeDestino) {
    const conversoes = {
        "Metros por Segundo (m/s)": { "Quilômetros por Hora (km/h)": valor * 3.6, "Milímetros por Segundo (mm/s)": valor * 1000 },
        "Quilômetros por Hora (km/h)": { "Metros por Segundo (m/s)": valor / 3.6, "Milímetros por Segundo (mm/s)": valor * 1000 / 3600 },
        "Milímetros por Segundo (mm/s)": { "Metros por Segundo (m/s)": valor / 1000, "Quilômetros por Hora (km/h)": valor * 3.6 / 1000 }
    };
    return conversoes[unidadeOrigem][unidadeDestino] || valor;
}

function converterComprimento(valor, unidadeOrigem, unidadeDestino) {
    const metros = {
        "Metros (m)": 1,
        "Milímetros (mm)": 1000,
        "Pés (ft)": 3.28084,
        "Centímetros (cm)": 100,
        "Polegadas (in)": 39.3701
    };
    const valorEmMetros = valor / metros[unidadeOrigem];
    return (valorEmMetros * metros[unidadeDestino]).toFixed(4);
}

function converterTemperatura(valor, unidadeOrigem, unidadeDestino) {
    if (unidadeOrigem === unidadeDestino) return valor.toFixed(4);

    let valorEmCelsius;
    if (unidadeOrigem === "Celsius (ºC)") {
        valorEmCelsius = valor;
    } else if (unidadeOrigem === "Fahrenheit (ºF)") {
        valorEmCelsius = (valor - 32) * 5 / 9;
    } else { // Kelvin (K)
        valorEmCelsius = valor - 273.15;
    }

    if (unidadeDestino === "Celsius (ºC)") {
        return valorEmCelsius.toFixed(4);
    } else if (unidadeDestino === "Fahrenheit (ºF)") {
        return (valorEmCelsius * 9 / 5 + 32).toFixed(4);
    } else { // Kelvin (K)
        return (valorEmCelsius + 273.15).toFixed(4);
    }
}

function converterEnergia(valor, unidadeOrigem, unidadeDestino) {
    const joules = {
        "Joules (J)": 1,
        "Calorias (cal)": 0.239006,
        "Quilojoules (kJ)": 0.001,
        "Quilocalorias (kcal)": 0.000239006,
        "Quilowatts hora (kWh)": 2.7778e-7
    };
    const valorEmJoules = valor / joules[unidadeOrigem];
    return (valorEmJoules * joules[unidadeDestino]).toFixed(4);
}

function converterVolume(valor, unidadeOrigem, unidadeDestino) {
    const litros = {
        "Litros (l)": 1,
        "Metros Cúbicos (m³)": 0.001,
        "Milímetros Cúbicos (mm³)": 1000000,
        "Galões (g)": 0.264172
    };
    const valorEmLitros = valor / litros[unidadeOrigem];
    return (valorEmLitros * litros[unidadeDestino]).toFixed(4);
}

function converterVelocidade(valor, unidadeOrigem, unidadeDestino) {
    const metrosPorSegundo = {
        "Metros por Segundo (m/s)": 1,
        "Quilômetros por Hora (km/h)": 3.6,
        "Milímetros por Segundo (mm/s)": 1000
    };
    const valorEmMps = valor / metrosPorSegundo[unidadeOrigem];
    return (valorEmMps * metrosPorSegundo[unidadeDestino]).toFixed(4);
}

function converterAceleracao(valor, unidadeOrigem, unidadeDestino) {
    const metrosPorSegundo2 = {
        "Metros por Segundo ao Quadrado (m/s²)": 1,
        "Pés por Segundo ao Quadrado (ft/s²)": 3.28084
    };
    const valorEmMps2 = valor / metrosPorSegundo2[unidadeOrigem];
    return (valorEmMps2 * metrosPorSegundo2[unidadeDestino]).toFixed(4);
}

function converterDensidade(valor, unidadeOrigem, unidadeDestino) {
    const densidade = {
        "Quilogramas por Metro Cúbico (kg/m³)": 1,
        "Gramas por Centímetro Cúbico (g/cm³)": 1000,
        "Libras por Polegada Cúbica (lb/in³)": 0.036127
    };
    const valorEmKgM3 = valor / densidade[unidadeOrigem];
    return (valorEmKgM3 * densidade[unidadeDestino]).toFixed(4);
}

function converterTempo(valor, unidadeOrigem, unidadeDestino) {
    const tempo = {
        "Segundos (s)": 1,
        "Minutos (min)": 1 / 60,
        "Horas (h)": 1 / 3600,
        "Dias (dias)": 1 / 86400
    };
    const valorEmSegundos = valor / tempo[unidadeOrigem];
    return (valorEmSegundos * tempo[unidadeDestino]).toFixed(4);
}

function converterMassa(valor, unidadeOrigem, unidadeDestino) {
    const massa = {
        "Gramas (g)": 1,
        "Quilogramas (kg)": 0.001,
        "Toneladas (t)": 1e-6,
        "Libras (lb)": 0.00220462
    };
    const valorEmGramas = valor / massa[unidadeOrigem];
    return (valorEmGramas * massa[unidadeDestino]).toFixed(4);
}

function converterArea(valor, unidadeOrigem, unidadeDestino) {
    const area = {
        "Metros Quadrados (m²)": 1,
        "Pés Quadrados (ft²)": 10.7639,
        "Polegadas Quadradas (in²)": 1550.0031
    };
    const valorEmMetros2 = valor / area[unidadeOrigem];
    return (valorEmMetros2 * area[unidadeDestino]).toFixed(4);
}

function converterForca(valor, unidadeOrigem, unidadeDestino) {
    const forca = {
        "Newton (N)": 1,
        "Quilograma Força (kgf)": 0.1019716,
        "Libra Força (lbf)": 0.224809
    };
    const valorEmNewton = valor / forca[unidadeOrigem];
    return (valorEmNewton * forca[unidadeDestino]).toFixed(4);
}

function converterVazaoVolumetrica(valor, unidadeOrigem, unidadeDestino) {
    const vazaoVolumetrica = {
        "Metros Cúbicos por Segundo (m³/s)": 1,
        "Metros Cúbicos por Hora (m³/h)": 3600,
        "Litros por Minuto (l/min)": 60000,
        "Galões por Minuto (gpm)": 15850.3
    };
    const valorEmM3S = valor / vazaoVolumetrica[unidadeOrigem];
    return (valorEmM3S * vazaoVolumetrica[unidadeDestino]).toFixed(4);
}

function converterVazaoMassica(valor, unidadeOrigem, unidadeDestino) {
    const vazaoMassica = {
        "Quilogramas por Hora (kg/h)": 1,
        "Quilogramas por Segundo (kg/s)": 1 / 3600,
        "Libras por Segundo (lb/s)": 0.00220462 / 3600
    };
    const valorEmKgH = valor / vazaoMassica[unidadeOrigem];
    return (valorEmKgH * vazaoMassica[unidadeDestino]).toFixed(4);
}

function converterViscosidade(valor, unidadeOrigem, unidadeDestino) {
    const viscosidade = {
        "Centipoise (cP)": 1,
        "Pascal Segundo (PaS)": 0.001
    };
    const valorEmCP = valor / viscosidade[unidadeOrigem];
    return (valorEmCP * viscosidade[unidadeDestino]).toFixed(4);
}

function converterPressao(valor, unidadeOrigem, unidadeDestino) {
    const pressao = {
        "Pascals (Pa)": 1,
        "Bar (bar)": 1e-5,
        "Libras por Polegada Quadrada (psi)": 0.000145038,
        "QuiloPascal (kPa)": 0.001,
        "Metros de Coluna d'Água (mca)": 1.019716212977928e-4
    };
    const valorEmPascals = valor / pressao[unidadeOrigem];
    return (valorEmPascals * pressao[unidadeDestino]).toFixed(4);
}

function converterCalorEspecifico(valor, unidadeOrigem, unidadeDestino) {
    const calorEspecifico = {
        "Joules por Quilograma e por Kelvin (J/kg.K)": 1,
        "Calorias por Grama e Grau Celsius (Cal/g.ºC)": 0.239006
    };
    const valorEmJoules = valor / calorEspecifico[unidadeOrigem];
    return (valorEmJoules * calorEspecifico[unidadeDestino]).toFixed(4);
}

function converterPotencia(valor, unidadeOrigem, unidadeDestino) {
    const potencia = {
        "Horse Power (hp)": 1,
        "Cavalo Vapor (cv)": 0.98632,
        "Watt (W)": 735.49875,
        "Quilowatt (kW)": 0.73549875
    };
    const valorEmHp = valor / potencia[unidadeOrigem];
    return (valorEmHp * potencia[unidadeDestino]).toFixed(4);
}
