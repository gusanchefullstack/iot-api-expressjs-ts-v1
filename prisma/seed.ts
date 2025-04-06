import { PrismaClient, BoardStatus, SensorType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Limpiar la base de datos para evitar duplicados
  try {
    console.log('Limpiando base de datos...');
    await prisma.sensor.deleteMany({});
    await prisma.board.deleteMany({});
    await prisma.measuringPoint.deleteMany({});
    await prisma.site.deleteMany({});
    await prisma.organization.deleteMany({});
    console.log('Base de datos limpiada. Iniciando población de datos...');
  } catch (error) {
    console.log('Error al limpiar la base de datos, continuando con la población de datos...');
  }

  // Datos para organizaciones
  const organizations = [
    {
      name: "Industrias Tecnológicas Avanzadas",
      country: "España",
      state: "Cataluña",
      city: "Barcelona",
      address: "Calle Diagonal 211",
      zipcode: "08018"
    },
    {
      name: "Sistemas Ambientales del Sur",
      country: "España",
      state: "Andalucía",
      city: "Sevilla",
      address: "Avenida de la Constitución 15",
      zipcode: "41004"
    },
    {
      name: "Monitoreo Hídrico Madrileño",
      country: "España",
      state: "Madrid",
      city: "Madrid",
      address: "Paseo de la Castellana 120",
      zipcode: "28046"
    }
  ];

  // Datos para sitios (2 por organización)
  const sitesData = [
    [
      {
        name: "Planta Barcelona Norte",
        address: "Polígono Industrial Zona Franca, Calle F 45",
        city: "Barcelona",
        zipcode: "08040"
      },
      {
        name: "Centro Logístico Montcada",
        address: "Carrer de la Font 22",
        city: "Montcada i Reixac",
        zipcode: "08110"
      }
    ],
    [
      {
        name: "Centro Operativo Triana",
        address: "Calle Betis 8",
        city: "Sevilla",
        zipcode: "41010"
      },
      {
        name: "Planta de Tratamiento Alcalá",
        address: "Carretera A-392 km 3.2",
        city: "Alcalá de Guadaíra",
        zipcode: "41500"
      }
    ],
    [
      {
        name: "Centro de Monitoreo Leganés",
        address: "Avenida de la Universidad 30",
        city: "Leganés",
        zipcode: "28911"
      },
      {
        name: "Estación de Control Alcobendas",
        address: "Calle Marqués de la Valdavia 108",
        city: "Alcobendas",
        zipcode: "28100"
      }
    ]
  ];

  // Coordenadas reales para puntos de medición
  const measuringPointsData = [
    // Barcelona
    [
      { name: "Estación Norte Río Besós", latitude: 41.4362, longitude: 2.2340 },
      { name: "Punto de Control Llobregat", latitude: 41.3565, longitude: 2.1101 }
    ],
    [
      { name: "Central Montcada", latitude: 41.4827, longitude: 2.1888 },
      { name: "Punto de Monitoreo Sant Adrià", latitude: 41.4229, longitude: 2.2238 }
    ],
    // Sevilla
    [
      { name: "Estación Río Guadalquivir", latitude: 37.3826, longitude: -5.9944 },
      { name: "Control Parque de María Luisa", latitude: 37.3740, longitude: -5.9876 }
    ],
    [
      { name: "Planta Depuradora Sur", latitude: 37.3300, longitude: -5.9761 },
      { name: "Estación Control Alcalá", latitude: 37.3434, longitude: -5.8445 }
    ],
    // Madrid
    [
      { name: "Punto de Medición Río Manzanares", latitude: 40.3949, longitude: -3.7142 },
      { name: "Estación Parque Tecnológico", latitude: 40.3352, longitude: -3.7558 }
    ],
    [
      { name: "Control Norte Madrid", latitude: 40.5283, longitude: -3.6149 },
      { name: "Estación Medición Este", latitude: 40.4700, longitude: -3.5722 }
    ]
  ];

  // Crear organizaciones
  for (let i = 0; i < organizations.length; i++) {
    const org = organizations[i];
    const organization = await prisma.organization.create({
      data: org
    });

    console.log(`Creada organización: ${organization.name}`);

    // Crear sitios para cada organización
    for (let j = 0; j < sitesData[i].length; j++) {
      const siteInfo = sitesData[i][j];
      const site = await prisma.site.create({
        data: {
          name: siteInfo.name,
          country: org.country,
          state: org.state,
          city: siteInfo.city,
          address: siteInfo.address,
          zipcode: siteInfo.zipcode,
          organizationId: organization.id
        }
      });

      console.log(`Creado sitio: ${site.name}`);

      // Crear puntos de medición para cada sitio
      const mpIndex = i * 2 + j;
      for (let k = 0; k < measuringPointsData[mpIndex].length; k++) {
        const mpData = measuringPointsData[mpIndex][k];
        const measuringPoint = await prisma.measuringPoint.create({
          data: {
            name: mpData.name,
            latitude: mpData.latitude,
            longitude: mpData.longitude,
            siteId: site.id
          }
        });

        console.log(`Creado punto de medición: ${measuringPoint.name}`);

        // Crear boards para cada punto de medición
        const boardNames = ["Controlador Maestro", "Sistema de Adquisición de Datos"];
        const boardModels = ["RaspberryPI 4 8GB", "Arduino Mega 2560", "BeagleBone Black", "ESP32-WROOM-32"];
        
        for (let l = 0; l < 2; l++) {
          const boardStatus = Object.values(BoardStatus)[Math.floor(Math.random() * Object.values(BoardStatus).length)];
          const boardModel = boardModels[Math.floor(Math.random() * boardModels.length)];
          
          const board = await prisma.board.create({
            data: {
              name: `${boardNames[l]} - ${measuringPoint.name}`,
              serialNumber: `SN-${Date.now().toString().slice(-6)}-${l}${k}${j}${i}`,
              model: boardModel,
              description: `Sistema de monitoreo para ${measuringPoint.name}`,
              boardStatus: boardStatus,
              measuringPointId: measuringPoint.id
            }
          });

          console.log(`Creada tarjeta: ${board.name} (${boardStatus})`);

          // Crear sensores para cada board
          // Definición de modelos y unidades por tipo de sensor
          const sensorModels = {
            TEMPERATURE: ["DS18B20", "DHT22", "LM35", "TMP36"],
            HUMIDITY: ["DHT11", "DHT22", "BME280", "SHT31"],
            FLOW: ["YF-S201", "FS300A", "FS400A", "YF-B1"],
            PH: ["PH-4502C", "PH-SEN0161", "PH-BNC", "PH-E201"],
            ORP: ["ORP-SEN0165", "ORP-4502C", "ORP-E201", "ORP-PRO"]
          };

          const sensorUnits = {
            TEMPERATURE: "°C",
            HUMIDITY: "%",
            FLOW: "L/min",
            PH: "pH",
            ORP: "mV"
          };

          // Nombres realistas por tipo
          const sensorNamesBySType = {
            TEMPERATURE: ["Sensor de Temperatura", "Termómetro Digital", "Medidor Térmico"],
            HUMIDITY: ["Sensor de Humedad", "Higrómetro", "Detector de Humedad"],
            FLOW: ["Caudalímetro", "Medidor de Flujo", "Sensor de Caudal"],
            PH: ["Medidor de pH", "Sensor Potencial Hidrógeno", "Analizador pH"],
            ORP: ["Sensor Redox", "ORP Monitor", "Analizador ORP"]
          };

          // Crear 3 sensores por board con distribución de tipos realista
          // basado en el ambiente (agua, aire, etc.)
          const sensorTypesByEnvironment = [
            [SensorType.TEMPERATURE, SensorType.HUMIDITY, SensorType.FLOW],
            [SensorType.TEMPERATURE, SensorType.PH, SensorType.ORP]
          ];

          // Elegir un ambiente basado en el nombre del punto de medición
          const isWaterEnvironment = measuringPoint.name.toLowerCase().includes("río") ||
                                  measuringPoint.name.toLowerCase().includes("agua") ||
                                  measuringPoint.name.toLowerCase().includes("depuradora");
          
          const sensorTypesForBoard = isWaterEnvironment ? 
                                    sensorTypesByEnvironment[1] : 
                                    sensorTypesByEnvironment[0];

          for (let m = 0; m < 3; m++) {
            const sensorType = sensorTypesForBoard[m] || 
                               Object.values(SensorType)[Math.floor(Math.random() * Object.values(SensorType).length)];
            
            const sensorModel = sensorModels[sensorType][Math.floor(Math.random() * sensorModels[sensorType].length)];
            const sensorName = sensorNamesBySType[sensorType][Math.floor(Math.random() * sensorNamesBySType[sensorType].length)];
            
            const sensor = await prisma.sensor.create({
              data: {
                name: `${sensorName} ${m+1}`,
                type: sensorType.toString(),
                sensorType: sensorType,
                unit: sensorUnits[sensorType],
                model: sensorModel,
                serialNumber: `SS-${Date.now().toString().slice(-4)}-${m}${l}${k}${j}${i}`,
                description: `${sensorName} para monitorear ${sensorType.toLowerCase()} en ${measuringPoint.name}`,
                boardId: board.id
              }
            });

            console.log(`Creado sensor: ${sensor.name} (${sensorType})`);
          }
        }
      }
    }
  }

  console.log('¡Base de datos poblada con éxito!');
}

main()
  .catch((e) => {
    console.error('Error durante la población de datos:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 