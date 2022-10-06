// SPDX-License-Identifier: UNLICENSED

/* Directiva del compilador que le dice al compilador qué versión del compilador de Solidity usar.*/
pragma solidity ^0.8.0;

/* Contrato inteligente que permite almacenar transacciones en la cadena de bloques.*/
contract Transacciones {
    /* Declaración de las variables y la estructura que se utilizará en el contrato.*/
    uint256 contarTranferencia;


    event Transfer(address indexed from, address indexed to, uint value, string concepto, uint256 timestamp, string keyword);

    struct TransferStruct {
        address from;
        address to;
        uint value;
        string concepto;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct [] transfers;

    /* Agrega una nueva transacción a la cadena de bloques.*/
    function addToBlock(address payable addressTo, uint amount, string memory concepto, string memory keyword) public {
        contarTranferencia ++;
        transfers.push(TransferStruct(addressTo, msg.sender, amount, concepto, block.timestamp, keyword));

    emit Transfer(addressTo, msg.sender, amount, concepto, block.timestamp, keyword);
    }

    /* Devuelve la matriz de transferencias.*/
    function getAllTransfer() public view returns (TransferStruct[] memory) {
        return transfers;
    }

    /* Devuelve el número de transacciones que se han realizado.*/
    function getTransferCount() public view returns (uint256) {
        return contarTranferencia;
    }


}