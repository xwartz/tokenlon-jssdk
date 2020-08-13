declare const contractStack: {
    exchangeV2: {
        "abi": ({
            "constant": boolean;
            "inputs": {
                "name": string;
                "type": string;
            }[];
            "name": string;
            "outputs": {
                "name": string;
                "type": string;
            }[];
            "payable": boolean;
            "stateMutability": string;
            "type": string;
            "anonymous"?: undefined;
        } | {
            "constant": boolean;
            "inputs": ({
                "components": {
                    "name": string;
                    "type": string;
                }[];
                "name": string;
                "type": string;
            } | {
                "name": string;
                "type": string;
                "components"?: undefined;
            })[];
            "name": string;
            "outputs": {
                "components": ({
                    "components": {
                        "name": string;
                        "type": string;
                    }[];
                    "name": string;
                    "type": string;
                } | {
                    "name": string;
                    "type": string;
                    "components"?: undefined;
                })[];
                "name": string;
                "type": string;
            }[];
            "payable": boolean;
            "stateMutability": string;
            "type": string;
            "anonymous"?: undefined;
        } | {
            "inputs": any[];
            "payable": boolean;
            "stateMutability": string;
            "type": string;
            "constant"?: undefined;
            "name"?: undefined;
            "outputs"?: undefined;
            "anonymous"?: undefined;
        } | {
            "anonymous": boolean;
            "inputs": {
                "indexed": boolean;
                "name": string;
                "type": string;
            }[];
            "name": string;
            "type": string;
            "constant"?: undefined;
            "outputs"?: undefined;
            "payable"?: undefined;
            "stateMutability"?: undefined;
        })[];
    };
    tokenlonExchange: {
        "abi": ({
            "constant": boolean;
            "inputs": {
                "name": string;
                "type": string;
            }[];
            "name": string;
            "outputs": {
                "name": string;
                "type": string;
            }[];
            "payable": boolean;
            "stateMutability": string;
            "type": string;
            "anonymous"?: undefined;
        } | {
            "inputs": any[];
            "payable": boolean;
            "stateMutability": string;
            "type": string;
            "constant"?: undefined;
            "name"?: undefined;
            "outputs"?: undefined;
            "anonymous"?: undefined;
        } | {
            "anonymous": boolean;
            "inputs": {
                "indexed": boolean;
                "name": string;
                "type": string;
            }[];
            "name": string;
            "type": string;
            "constant"?: undefined;
            "outputs"?: undefined;
            "payable"?: undefined;
            "stateMutability"?: undefined;
        })[];
    };
};
export default contractStack;
