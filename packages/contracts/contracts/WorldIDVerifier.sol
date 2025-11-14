// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title WorldIDVerifier
 * @author ZeaZDev Meta-Intelligence
 * @dev Placeholder for the World ID ZKP Verifier contract.
 * The full contract would be imported from the World ID SDK.
 */
interface IWorldID {
    function verifyProof(
        uint256 root,
        uint256 signalHash,
        uint256 nullifierHash,
        uint256 externalNullifierHash,
        uint256[8] calldata proof
    ) external view returns (bool);
}

contract WorldIDVerifier {
    IWorldID public worldID;
    uint256 public immutable externalNullifier;
    mapping(uint256 => bool) public nullifierHashes;

    constructor(IWorldID _worldID, uint256 _externalNullifier) {
        worldID = _worldID;
        externalNullifier = _externalNullifier;
    }

    function verifyAndExecute(
        uint256 root,
        uint256 signalHash,
        uint256 nullifierHash,
        uint2Sint256[8] calldata proof
    ) public {
        require(!nullifierHashes[nullifierHash], "Nullifier already used");
        
        worldID.verifyProof(
            root,
            signalHash,
            nullifierHash,
            externalNullifier,
            proof
        );

        nullifierHashes[nullifierHash] = true;
        
        // TODO: Execute ZKP-gated action
    }
}
