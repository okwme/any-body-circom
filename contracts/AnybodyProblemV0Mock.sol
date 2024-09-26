// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './AnybodyProblemV0.sol';

contract AnybodyProblemV0Mock is AnybodyProblemV0 {
    constructor(
        address payable proceedRecipient_,
        address payable speedruns_,
        address externalMetadata_,
        address[] memory verifiers_,
        uint256[] memory verifiersTicks,
        uint256[] memory verifiersBodies
    )
        AnybodyProblemV0(
            proceedRecipient_,
            speedruns_,
            externalMetadata_,
            verifiers_,
            verifiersTicks,
            verifiersBodies
        )
    {}

    Body[6][5] public mockedBodyDataByLevel;

    function setMockedBodyDataByLevel(
        uint256 level,
        Body[6] memory bodyData
    ) public {
        mockedBodyDataByLevel[level - 1] = bodyData;
    }

    function generateLevelData(
        uint256 day,
        uint256 level
    )
        public
        view
        override(AnybodyProblemV0)
        returns (AnybodyProblemV0.Body[6] memory bodyData, uint256 bodyCount)
    {
        if (mockedBodyDataByLevel[level - 1][0].seed == bytes32(0)) {
            return super.generateLevelData(day, level);
        }
        return (mockedBodyDataByLevel[level - 1], level + 1);
    }
}
