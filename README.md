# BcLips

Aplicación BlockChain que crea labios decorados de forma diferente a modo de juego utilizando BlockChain para su conectividad y pagos.

## Proyecto del curso Desarrollo Videojuegos NFT de la A a la Z

Curso impartido por [Joan Amengual](https://www.linkedin.com/in/joanamengual7) en la plataforma [Frogames Formación](https://cursos.frogamesformacion.com/courses/videojuegos-nft).

### Cambios

Existen pequeños cambio con respecto al proyecto del curso. El más significativo es el uso de hooks para el reducer en vez de React Redux.

## Requisitos

- [NodeJs](https://nodejs.org/en)
- Yarn, **_npm i -g yarn_**
- [Ganache](https://trufflesuite.com/ganache/)
- Truffle, **_npm i -g truffle_**
- [Metamask](https://metamask.io/)

## Ejecutar el desarrollo

1. Descargar o clonar el código
2. Instalar dependencias. **_yarn_**
3. Tener Metamask instalado en el navegador.
4. Abrir un workspace en Ganache (y dejarlo abierto)
5. Compilar y migrar los SmartContracts. **_truffle migrate --reset_**
6. Ejecutar la aplicación. **_yarn start_**
