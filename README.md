# MercadoLibreChallenge

Este proyecto detecta si un humano es mutante, basandose en su ADN.

## Instalación:
1. Clonar este repositorio.
2. Abrir el proyecto con el IDE de preferencia.
3. Ejecutar en la terminal el siguiente comando, sobre la raiz del proyecto: `npm install`
4. Para iniciar el servicio, ejecute el siguiente comando: `npm run start`. El servicio está configurado incialmente para ejectutarse en el puerto 3000

Url base: `http://localhost:3000/`
Url base heroku: `https://ismutantchallenge.herokuapp.com/`

## Api Mutant
Esta Api tiene dos endpoints:

1. POST /mutant/: identifica si un humano es mutante o no, basado en su ADN.  El request body es como se muestra a continuación: 

- **Request**:
``` JSON
{
    "dna": ["ATGCGA","CAGTGC","TTATGT","AGAAGG", "TTATGT","TCACTG"]
}
```
- **Response:**

    | Código  |  Explicación |
    | ------------ | ------------ |
    | 200(OK)  |  El humano es mutante  |
    | 400(BADREQUEST) | Se ingresa un JSON no valido, la matriz no es cuadrada o se usa letras diferentes a "A,T,G,C" | 
    | 403(FORBIDDEN) | El humano no es mutante |

2. GET /stats/ : Retorna un JSON con estadísticas de la Base de Datos.

- **Response**

```JSON
{
    "count_mutant_dna": 47,
    "count_human_dna": 27,
    "ratio": 1.7407407407407407
}
```

## Unit tests

- Para realizar las pruebas unitarias, ejecutar el siguiente comando en la terminal:
`npm test`

- Para generar el reporte de **Coverage** ejecutar el siguiente comando en la terminal:
`npm run coverage`

Este último comando generará un reporte HTML en la siguiente ruta: 
`./coverage/index.html`

## Deploy

Esta api ha sido desplegada utilizando [Heroku](https://www.heroku.com/ "Heroku") y puede ser consumida en la siguiente url base:

https://ismutantchallenge.herokuapp.com

## Postman

Se puede encontrar la colección de postman usada para el consumo de la api en la siguiente ruta:
`./postmam/ismutant_collection.json`